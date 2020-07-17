import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Routes
import { RouterModule } from '@angular/router';

//Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graph1Component } from './graph1/graph1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    PagesComponent,
  ],
  exports: [
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    PagesComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class PagesModule {}