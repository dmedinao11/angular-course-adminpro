import { IEntity } from './doctor.interface';

export interface IHospital {
  _id: string;
  name: string;
  createdBy: IEntity;
  img?: string;
}
