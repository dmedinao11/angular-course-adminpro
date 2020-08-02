import { Pipe, PipeTransform } from '@angular/core';

import { UPLOADS } from '../constants/server-uris.constants';

@Pipe({
  name: 'img',
})
export class ImgPipe implements PipeTransform {
  transform(value: string, type: 'hospitals' | 'users' | 'doctors'): string {
    return value ? `${UPLOADS}/${type}/${value}` : `${UPLOADS}/${type}/a`;
  }
}
