export interface IDoctors {
  _id: string;
  name: string;
  hospital: IEntity;
  createdBy: IEntity;
  img?: string;
}

export interface IEntity {
  _id: string;
  name: string;
}
