import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//Modules
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

//Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
  ],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
