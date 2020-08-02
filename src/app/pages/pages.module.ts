import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modules
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../core/pipes/pipes.module';

//Routes
import { RouterModule, RouterLink } from '@angular/router';

//Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graph1Component } from './graph1/graph1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { ObserversComponent } from './observers/observers.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './support/users/users.component';
import { HospitalsComponent } from './support/hospitals/hospitals.component';
import { DoctorsComponent } from './support/doctors/doctors.component';
import { DoctorComponent } from './support/doctors/doctor/doctor.component';

@NgModule({
  declarations: [
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    ObserversComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent,
  ],
  exports: [
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule,
  ],

  providers: [RouterLink],
})
export class PagesModule {}
