export interface IHospital {
  _id: string;
  name: string;
  createdBy: IUserCreatedBy;
  img?: string;
}

export interface IUserCreatedBy {
  _id: string;
  name: string;
  img: string;
}
