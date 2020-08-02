import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IDoctors } from '../../../../core/interfaces/doctor.interface';
import { DoctorsService } from '../../../../core/services/doctors.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IHospital } from '../../../../core/interfaces/hospital.interface';
import { HospitalService } from '../../../../core/services/hospital.service';
import { UploadService } from '../../../../core/services/upload.service';
import { ImgPipe } from '../../../../core/pipes/img.pipe';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [],
})
export class DoctorComponent implements OnInit {
  private $getDoctor: Subscription;
  private $hospitalChange: Subscription;

  public doctor: IDoctors;

  public hospitalsList: IHospital[];

  public form: FormGroup;

  public loaded: boolean;

  public selectedHospital: IHospital;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorsService,
    private formBuilder: FormBuilder,
    public hospitalService: HospitalService,
    private uploadService: UploadService,
    private imgPipe: ImgPipe
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.$getDoctor.unsubscribe();
    this.$hospitalChange.unsubscribe();
  }

  public getData(): void {
    this.loaded = false;
    this.$getDoctor = this.activatedRoute.params.subscribe(
      (params: { id: string }) => {
        if (!params.id || params.id == '' || params.id.length < 23)
          this.router.navigateByUrl('**');

        Promise.all([this.getHospitalsList(), this.getDoctor(params.id)]).then(
          () => {
            this.onSelectedHospitalChange(this.doctor.hospital._id);
            this.loaded = true;
          }
        );
      }
    );
  }

  public getHospitalsList(): Promise<void> {
    return new Promise((resolve) =>
      this.hospitalService.get().subscribe((resp) => {
        this.hospitalsList = resp;
        resolve();
      })
    );
  }

  public getDoctor(id: string): Promise<void> {
    return new Promise((resolve) =>
      this.doctorService.getByID(id).subscribe((doctor) => {
        this.doctor = doctor;
        this.generateForm();
        resolve();
      })
    );
  }

  private generateForm(): void {
    this.form = this.formBuilder.group({
      name: [this.doctor.name, Validators.required],
      hospital: [this.doctor.hospital._id, Validators.required],
      createdBy: this.doctor.createdBy.name,
    });

    this.$hospitalChange = this.form
      .get('hospital')
      .valueChanges.subscribe((value: string) =>
        this.onSelectedHospitalChange(value)
      );
  }

  //Handlers
  public onSelectedHospitalChange(id: string): void {
    this.selectedHospital = undefined;

    setTimeout(
      () =>
        (this.selectedHospital = this.hospitalsList.find(
          (hospital) => hospital._id == id
        )),
      200
    );
  }

  public onOpenImgModal(): void {
    const img = this.imgPipe.transform(this.doctor.img, 'doctors');
    this.uploadService
      .showModal('doctors', img, this.doctor._id)
      .subscribe((result: string) => {
        this.doctor.img = result;
      });
  }

  public onDoctorUpdate(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((key: string) =>
        this.form.controls[key].markAsTouched()
      );
      return;
    }

    const { name, hospital } = this.form.value;
    this.doctorService
      .update(this.doctor._id, hospital, name)
      .subscribe(() => this.getData());
  }
}
