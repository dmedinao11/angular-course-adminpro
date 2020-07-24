import { Component, OnInit } from '@angular/core';

//Services
import { UploadService } from 'src/app/core/services/upload.service';

@Component({
  selector: 'app-img-updater',
  templateUrl: './img-updater.component.html',
  styles: [],
})
export class ImgUpdaterComponent implements OnInit {
  public imgToUpload: File;
  public tempImg: any;

  constructor(public uploadService: UploadService) {}

  ngOnInit(): void {}

  //Handlers
  public onClose(): void {
    this.tempImg = null;
    this.imgToUpload = null;
    this.uploadService.hideModal();
  }

  public onImgChange(file: File): void {
    this.imgToUpload = file;

    if (!file) this.tempImg = null;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.tempImg = reader.result;
    };
  }

  public onSaveImg(): void {
    this.uploadService
      .updateImg(
        this.imgToUpload,
        this.uploadService.MType,
        this.uploadService.MUser.uid
      )
      .then((resp) => {
        this.uploadService.MUser.setImg = resp.img;
        this.onClose();
      });
  }
}
