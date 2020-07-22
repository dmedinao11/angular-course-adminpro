export interface IUser {
  name?: string;
  email: string;
  password?: string;
  role?: string;
  googleAuth?: boolean;
  uid?: string;
  rememberMe?: boolean;
}
