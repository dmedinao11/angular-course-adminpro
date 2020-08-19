export interface IUser {
  name?: string;
  email: string;
  password?: string;
  role?: 'USER_ROLE' | 'ADMIN_ROLE';
  googleAuth?: boolean;
  uid?: string;
  img?: string;
  rememberMe?: boolean;
}
