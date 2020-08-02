//Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Utilities
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Constants
import { HOSPITALS_URI } from '../constants/server-uris.constants';
import { LOCAL_STORAGE } from '../constants/main.constants';

//Models
import { IHospital } from '../interfaces/hospital.interface';
import {
  IGetHospitalResp,
  IGetHospital,
} from '../interfaces/server-resps.interfaces';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient, private toast: ToastService) {}

  public get(): Observable<IHospital[]> {
    return this.http.get<IHospital[]>(HOSPITALS_URI, this.headers).pipe(
      catchError((error) => {
        this.toast.showError(error.error[0].msg);
        return of(null);
      })
    );
  }

  public create(name: string): Observable<IGetHospital> {
    return this.http
      .post<IGetHospitalResp>(HOSPITALS_URI, { name }, this.headers)
      .pipe(
        catchError((error) => {
          this.toast.showError(error.error[0].msg);
          return of(null);
        }),
        map((resp) => {
          this.toast.showSuccess(resp.msg);
          return resp.hospital;
        })
      );
  }

  public update(id: string, name: string): Observable<IGetHospital> {
    return this.http
      .put<IGetHospitalResp>(`${HOSPITALS_URI}/${id}`, { name }, this.headers)
      .pipe(
        catchError((error) => {
          this.toast.showError(error.error[0].msg);
          return of(null);
        }),
        map((resp) => {
          this.toast.showSuccess(resp.msg);
          return resp.hospital;
        })
      );
  }

  public delete(id: string): Observable<IGetHospital> {
    return this.http
      .delete<IGetHospitalResp>(`${HOSPITALS_URI}/${id}`, this.headers)
      .pipe(
        catchError((error) => {
          this.toast.showError(error.error[0].msg);
          return of(null);
        }),
        map((resp) => {
          this.toast.showSuccess(resp.msg);
          return resp.hospital;
        })
      );
  }

  public get token() {
    return localStorage.getItem(LOCAL_STORAGE.token) || '';
  }
  public get headers() {
    return { headers: { token: this.token } };
  }
}
