import { Injectable } from '@angular/core';

//Constants
import { UPLOADS } from '../constants/server-uris.constants';
import { LOCAL_STORAGE } from '../constants/main.constants';
import { StmtModifier } from '@angular/compiler';
import { MUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor() {}

  private _modalHidden: boolean = true;

  public MType: string;
  public MUser: MUser;

  public async updateImg(
    file: File,
    type: 'doctors' | 'users' | 'hospitals' | string,
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

  //Modal Control
  get modalHidden(): boolean {
    return this._modalHidden;
  }

  public showModal(
    type: 'users' | 'doctors' | 'hospitals',
    user: MUser,
    img?: string
  ): void {
    this._modalHidden = false;
    this.MType = type;
    this.MUser = user;
  }

  public hideModal(): void {
    //this.MUser = null;
    //this.MUser = null;
    this._modalHidden = true;
  }
}
