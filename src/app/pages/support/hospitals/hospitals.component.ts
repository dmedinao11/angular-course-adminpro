import { Component, OnInit } from '@angular/core';

//Services
import { HospitalService } from '../../../core/services/hospital.service';
import Swal from 'sweetalert2';

import { IHospital } from '../../../core/interfaces/hospital.interface';
import { IGetHospital } from '../../../core/interfaces/server-resps.interfaces';
import { UploadService } from '../../../core/services/upload.service';

import { ImgPipe } from '../../../core/pipes/img.pipe';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit {
  public loaded = false;
  public hospitals: IHospital[];

  constructor(
    public hospitalService: HospitalService,
    private uploadService: UploadService,
    private imgPipe: ImgPipe,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this.hospitalService.get().subscribe((resp) => {
      this.hospitals = resp;
      this.loaded = true;
    });
  }

  //Handlers
  public onUpdate(hospital: IHospital): void {
    const { name, _id } = hospital;
    this.hospitalService.update(_id, name).subscribe(() => this.getData());
  }

  public onDelete(hospital: IHospital): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar por completo ${hospital.name}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        this.hospitalService
          .delete(hospital._id)
          .subscribe((resp: IGetHospital) => {
            this.getData();
            Swal.fire(`El hospital ${resp.name} ha sido eliminado`);
          });
      }
    });
  }

  public async onCreate(): Promise<void> {
    const { value } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingresa el nombre del hospital',
      input: 'text',
      showCancelButton: true,
    });

    if (value && value.length > 0)
      this.hospitalService.create(value).subscribe(() => this.getData());
  }

  public onOpenImgModal(hospital: IHospital): void {
    let { img, _id } = hospital;
    img = this.imgPipe.transform(img, 'hospitals');
    this.uploadService
      .showModal('hospitals', img, _id)
      .subscribe((result: string) => {
        hospital.img = result;
      });
  }

  public onSearch(term: string): void {
    if (!term || term == '') this.getData();
    this.loaded = false;
    this.searchService
      .searchByCollection('hospitals', term)
      .subscribe((resp: IHospital[]) => {
        this.hospitals = resp;
        this.loaded = true;
      });
  }
}
