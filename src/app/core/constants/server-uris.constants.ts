import { environment } from '../../../environments/environment';

export const USERS_URI = `${environment.SERVER_URI}/users`;
export const HOSPITALS_URI = `${environment.SERVER_URI}/hospitals`;
export const DOCTORS_URI = `${environment.SERVER_URI}/doctors`;
export const LOGIN_URI = `${environment.SERVER_URI}/login`;
export const GOOGLE_LOGIN_URI = `${environment.SERVER_URI}/login/google`;
export const RENEW_TOKEN = `${environment.SERVER_URI}/login/renew`;
export const UPLOADS = `${environment.SERVER_URI}/upload`;
export const SEARCH_BY_COLLECTION = `${environment.SERVER_URI}/search-by-collection`;
