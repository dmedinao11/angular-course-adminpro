import { IUser } from '../interfaces/user.interface';
import { UPLOADS } from '../constants/server-uris.constants';

export class MUser {
  public name: string;
  public email: string;
  public uid?: string;
  public role?: string;
  public img?: string;
  public googleAuth?: boolean;

  constructor(user: IUser) {
    this.name = user.name;
    this.email = user.email;
    this.uid = user.uid;
    this.role = user.role;
    this.googleAuth = user.googleAuth;
    if (this.googleAuth) this.img = user.img;
    else
      this.img = user.img
        ? `${UPLOADS}/users/${user.img}`
        : `${UPLOADS}/users/a`;
  }

  set setImg(img: string) {
    this.img = img ? `${UPLOADS}/users/${img}` : `${UPLOADS}/users/a`;
  }

  get getImageUri(): string {
    return this.img;
  }
}
