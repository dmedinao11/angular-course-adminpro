//Core
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//Guards
import { AuthGuard } from '../core/guards/auth.guard';

//Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { ObserversComponent } from './observers/observers.component';
import { ProfileComponent } from './profile/profile.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
