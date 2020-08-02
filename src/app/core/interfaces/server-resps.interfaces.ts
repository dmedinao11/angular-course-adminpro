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

export interface IGetHospitalResp {
  msg: string;
  hospital: IGetHospital;
}

export interface IGetHospital {
  _id: string;
  name: string;
  createdBy: string;
}

export interface IGetDoctors {
  msg: string;
  doctor: IGetDoctor;
}

export interface IGetDoctor {
  _id: string;
  name: string;
  hospital: string;
  createdBy: string;
}
