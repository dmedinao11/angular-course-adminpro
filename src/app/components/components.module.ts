import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Forms
import { FormsModule } from '@angular/forms';

//Components
import { IncrementerComponent } from './incrementer/incrementer.component';
import { ImgUpdaterComponent } from './img-updater/img-updater.component';

@NgModule({
  declarations: [IncrementerComponent, ImgUpdaterComponent],
  imports: [CommonModule, FormsModule],
  exports: [IncrementerComponent, ImgUpdaterComponent],
})
export class ComponentsModule {}
