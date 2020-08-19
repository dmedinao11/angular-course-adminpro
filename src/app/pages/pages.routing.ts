//Core
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//Guards
import { AuthGuard } from '../core/guards/auth.guard';
import { AdminGuard } from '../core/guards/admin.guard';

//Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { ObserversComponent } from './observers/observers.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './support/users/users.component';
import { HospitalsComponent } from './support/hospitals/hospitals.component';
import { DoctorsComponent } from './support/doctors/doctors.component';
import { DoctorComponent } from './support/doctors/doctor/doctor.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'Progress' },
      },
      { path: 'graph1', component: Graph1Component },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Configuración de cuenta' },
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: { title: 'Promises' },
      },
      {
        path: 'observers',
        component: ObserversComponent,
        data: { title: 'Observers' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Mi perfil' },
      },
      {
        path: 'users',
        component: UsersComponent,
        data: { title: 'Configurar Usuarios' },
        canActivate: [AdminGuard],
      },
      {
        path: 'hospitals',
        component: HospitalsComponent,
        data: { title: 'Configurar Hospitales' },
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
        data: { title: 'Configurar Doctores' },
      },
      {
        path: 'doctor/:id',
        component: DoctorComponent,
        data: { title: 'Editar Doctor' },
      },
      {
        path: 'search/:term',
        component: SearchComponent,
        data: { title: 'Resultados de la búsqueda' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
