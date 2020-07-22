import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

//Services
import { ToastService } from '../../core/services/toast.service';
import { UserService } from '../../core/services/user.service';

//Models
import { IUser } from 'src/app/core/interfaces/user.interface';
import { IAuthUser } from 'src/app/core/interfaces/server-resps.interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.styles.css'],
})
export class RegisterComponent implements OnInit {
  public form = this.fb.group(
    {
      name: ['Daniel', Validators.required],
      email: ['daniel@m.com', [Validators.required, Validators.email]],
      pass1: ['1234', Validators.required],
      pass2: ['1234', Validators.required],
    },
    { validators: this.equalPassValidator() }
  );

  public formSubmmited = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public equalPassValidator() {
    return (formGroup: FormGroup) => {
      const pass2constrol: AbstractControl = formGroup.get('pass2');

      if (pass2constrol.value !== formGroup.get('pass1').value)
        pass2constrol.setErrors({ notMatch: true });
    };
  }

  public showErrorField(field: string): boolean {
    return this.form.get(field).invalid && this.formSubmmited;
  }

  //Handles
  public onSubmit(): void {
    this.formSubmmited = true;

    if (this.form.valid) {
      const password = this.form.get('pass1').value;
      const { name, email } = this.form.value;
      const toRegister: IUser = { name, email, password };

      this.userService.register(toRegister).subscribe(
        (resp: IAuthUser) => {
          this.toastService.showSuccess(resp.msg);
          this.router.navigateByUrl('/');
        },
        (error) => this.toastService.showError(error.error.msg)
      );
    }
  }
}
