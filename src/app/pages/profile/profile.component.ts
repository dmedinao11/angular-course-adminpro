//Core
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Services
import { UserService } from 'src/app/core/services/user.service';

//Models
import { MUser } from 'src/app/core/models/user.model';
import { ToastService } from 'src/app/core/services/toast.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  public userUpdtForm: FormGroup;
  public user: MUser;
  public imgToUpload: File;
  public tempImg: any;

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    private toastService: ToastService,
    private uploadService: UploadService
  ) {
    this.user = userService.user;
    console.log(this.user);

    this.userUpdtForm = fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  //Handlers
  public onUserUpdt(): void {
    if (this.userUpdtForm.valid)
      this.userService.update(this.userUpdtForm.value).subscribe(
        (resp) => {
          const { name, email } = resp;
          this.user.name = name;
          this.user.email = email;
          this.toastService.showSuccess('Usuario actualizado correctamente');
        },
        (error: HttpErrorResponse) =>
          this.toastService.showError(error.error['msg'])
      );
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

  public onImgUpload(): void {
    this.uploadService
      .updateImg(this.imgToUpload, 'users', this.user.uid)
      .then((resp) => {
        this.user.setImg = resp.img;
        this.toastService.showSuccess(resp.msg);
      });
  }
}
