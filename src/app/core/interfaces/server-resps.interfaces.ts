import { IUser } from './user.interface';

export interface IAuthUser {
  msg: string;
  user: IUser;
  token: string;
}

export interface IToken {
  token: string;
}
