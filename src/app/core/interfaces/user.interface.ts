export interface IUser {
  name?: string;
  email: string;
  password?: string;
  role?: string;
  googleAuth?: boolean;
  uid?: string;
  img?: string;
  rememberMe?: boolean;
}
