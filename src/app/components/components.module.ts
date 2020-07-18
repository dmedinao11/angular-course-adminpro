import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Forms
import { FormsModule } from '@angular/forms';

//Components
import { IncrementerComponent } from './incrementer/incrementer.component';

@NgModule({
  declarations: [IncrementerComponent],
  imports: [CommonModule, FormsModule],
  exports: [IncrementerComponent],
})
export class ComponentsModule {}
