import { Injectable, EventEmitter } from '@angular/core';

//Constants
import { UPLOADS } from '../constants/server-uris.constants';
import { LOCAL_STORAGE } from '../constants/main.constants';
import { MUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor() {}

  private _modalHidden: boolean = true;

  public MType: string;

  public UID: string;
  public IMG: string;

  private eventEmitter: EventEmitter<string>;

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
    img?: string,
    uid?: string
  ): EventEmitter<string> {
    console.warn('IMAGEN AL ENTRAR: ', img);
    this._modalHidden = false;
    this.MType = type;
    this.UID = uid;
    this.IMG = img;

    this.eventEmitter = new EventEmitter<string>();
    return this.eventEmitter;
  }

  public hideModal(): void {
    console.warn('IMAGEN AL SALIR', this.IMG);
    this.eventEmitter.emit(this.IMG);
    this.eventEmitter.complete();
    this._modalHidden = true;
  }
}
