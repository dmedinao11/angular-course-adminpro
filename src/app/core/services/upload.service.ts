import { Injectable } from '@angular/core';

//Constants
import { UPLOADS } from '../constants/server-uris.constants';
import { LOCAL_STORAGE } from '../constants/main.constants';
import { StmtModifier } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor() {}

  public async updateImg(
    file: File,
    type: 'doctors' | 'users' | 'hospitals',
    uid: string
  ): Promise<{ msg: string; img: string }> {
    const formData = new FormData();
    formData.append('img', file);

    const token = localStorage.getItem(LOCAL_STORAGE.token);
    const uri = `${UPLOADS}/${type}/${uid}`;

    const resp = await fetch(uri, {
      method: 'PUT',
      headers: { token },
      body: formData,
    });

    const respBody: {
      msg: string;
      entity: { img: string };
    } = await resp.json();

    return { msg: respBody.msg, img: respBody.entity.img };
  }
}
