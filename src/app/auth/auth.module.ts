import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

//Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, AppRoutingModule, SharedModule],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
