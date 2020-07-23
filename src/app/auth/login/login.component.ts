import { Component, OnInit, NgZone } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';

declare const gapi: any;

//Services
import { ToastService } from '../../core/services/toast.service';
import { UserService } from '../../core/services/user.service';
import { IUser } from 'src/app/core/interfaces/user.interface';
import { IAuthUser } from 'src/app/core/interfaces/server-resps.interfaces';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.styles.css'],
})
export class LoginComponent implements OnInit {
  public form = this.fb.group({
    email: ['Test2@h.com', [Validators.required, Validators.email]],
    password: ['123', Validators.required],
    rememberMe: false,
  });

  public formSubmmited = false;

  public auth2: any;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.renderGoogleButton();
  }

  public showErrorField(field: string): boolean {
    return this.form.get(field).invalid && this.formSubmmited;
  }

  //Google Signin functions

  public renderGoogleButton() {
    gapi.signin2.render('my-signin2', {
      width: 200,
      height: 50,
      longtitle: false,
      theme: 'dark',
    });

    this.googleSignIn();
  }

  public async googleSignIn() {
    await this.userService.initGoogleSignin();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  public attachSignin(element: Element) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const token = googleUser.getAuthResponse().id_token;
        this.userService
          .loginWithGoogle(token)
          .subscribe((msg) =>
            this.ngZone.run(() => this.router.navigateByUrl('/'))
          );
      },
      (error) => {
        this.toastService.showError(JSON.stringify(error));
      }
    );
  }

  //Handlers
  public onSubmit(): void {
    this.formSubmmited = true;

    if (this.form.valid) {
      this.userService.login(this.form.value).subscribe(
        (msg: string) => {
          this.toastService.showSuccess(msg);
          this.router.navigateByUrl('/');
        },
        (error) => this.toastService.showError(error.error.msg)
      );
    }
  }
}
