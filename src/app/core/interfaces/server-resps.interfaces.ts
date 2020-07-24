import { IUser } from './user.interface';
import { MUser } from '../models/user.model';

export interface IAuthUser {
  msg?: string;
  user: IUser;
  token: string;
}

export interface IGetUsers {
  users: MUser[];
  reqUserUid: string;
  total: number;
}
