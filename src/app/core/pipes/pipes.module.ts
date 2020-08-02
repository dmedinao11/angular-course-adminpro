import { NgModule } from '@angular/core';
import { ImgPipe } from './img.pipe';

@NgModule({
  declarations: [ImgPipe],
  exports: [ImgPipe],
  providers: [ImgPipe],
})
export class PipesModule {}
