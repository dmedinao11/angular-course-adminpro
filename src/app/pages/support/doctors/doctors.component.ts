import { Component, OnInit } from '@angular/core';

import { DoctorsService } from '../../../core/services/doctors.service';
import Swal from 'sweetalert2';

import { UploadService } from '../../../core/services/upload.service';
import { SearchService } from '../../../core/services/search.service';
import { IDoctors } from '../../../core/interfaces/doctor.interface';
import { IGetDoctor } from '../../../core/interfaces/server-resps.interfaces';
import { IHospital } from '../../../core/interfaces/hospital.interface';
import { HospitalService } from '../../../core/services/hospital.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [],
})
export class DoctorsComponent implements OnInit {
  public loaded = false;

  public doctors: IDoctors[];

  public doctorFormDisplayed = false;
  public hospitalsList: IHospital[];

  public doctorForm: FormGroup;
  private $hospitalChange: Subscription;

  public selectedHospital: IHospital;

  constructor(
    public doctorsService: DoctorsService,
    public hospitalService: HospitalService,
    private fb: FormBuilder,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this.doctorsService.get().subscribe((resp) => {
      this.doctors = resp;
      this.loaded = true;
    });
  }

  public getHospitalsList(): Promise<void> {
    return new Promise((resolve) =>
      this.hospitalService.get().subscribe((resp) => {
        this.hospitalsList = resp;
        resolve();
      })
    );
  }

  public doctorFormGenerator(): void {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.$hospitalChange = this.doctorForm
      .get('hospital')
      .valueChanges.subscribe((value: string) =>
        this.onSelectedHospitalChange(value)
      );
  }

  //Handlers

  public async onOpenDoctorForm(): Promise<void> {
    if (!this.hospitalsList) await this.getHospitalsList();
    this.doctorFormGenerator();
    this.doctorFormDisplayed = true;
  }

  public onSearch(term: string): void {
    if (!term || term == '') this.getData();
    this.loaded = false;
    this.searchService
      .searchByCollection('doctors', term)
      .subscribe((resp: IDoctors[]) => {
        this.doctors = resp;
        this.loaded = true;
      });
  }

  public onCreate(): void {
    if (this.doctorForm.invalid) {
      Object.keys(this.doctorForm.controls).forEach((key: string) =>
        this.doctorForm.controls[key].markAsTouched()
      );
      return;
    }

    const { name, hospital } = this.doctorForm.value;

    this.doctorsService.create(name, hospital).subscribe(() => {
      this.getData();
      this.onFormClose();
    });
  }

  public onDelete(doctor: IDoctors): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar por completo al doctor ${doctor.name}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        this.doctorsService
          .delete(doctor._id)
          .subscribe((resp: IGetDoctor) => this.getData());
      }
    });
  }

  public onFormClose(): void {
    this.doctorFormDisplayed = false;
    this.$hospitalChange.unsubscribe();
  }

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
}
