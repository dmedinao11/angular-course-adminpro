//Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Utilities
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Constants
import { DOCTORS_URI } from '../constants/server-uris.constants';
import { LOCAL_STORAGE } from '../constants/main.constants';

//Models
import { IDoctors, IEntity } from '../interfaces/doctor.interface';
import { IGetDoctor, IGetDoctors } from '../interfaces/server-resps.interfaces';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private http: HttpClient, private toast: ToastService) {}

  public get(): Observable<IDoctors[]> {
    return this.http.get<IDoctors[]>(DOCTORS_URI, this.headers).pipe(
      catchError((error) => {
        this.toast.showError(error.error[0].msg);
        return of(null);
      })
    );
  }

  public getByID(id: string): Observable<IDoctors> {
    return this.http.get<IDoctors>(`${DOCTORS_URI}/${id}`, this.headers).pipe(
      catchError((error) => {
        this.toast.showError(error.error[0].msg);
        return of(null);
      })
    );
  }

  public create(name: string, hospital: string): Observable<IGetDoctor> {
    console.warn(name, hospital);
    return this.http
      .post<IGetDoctors>(DOCTORS_URI, { name, hospital }, this.headers)
      .pipe(
        catchError((error) => {
          this.toast.showError(error.error[0].msg);
          return of(null);
        }),
        map((resp: IGetDoctors) => {
          this.toast.showSuccess(resp.msg);
          return resp.doctor;
        })
      );
  }

  public update(
    id: string,
    hospital: string,
    name: string
  ): Observable<IGetDoctor> {
    return this.http
      .put<IGetDoctors>(
        `${DOCTORS_URI}/${id}`,
        { name, hospital },
        this.headers
      )
      .pipe(
        catchError((error) => {
          this.toast.showError(error.error[0].msg);
          return of(null);
        }),
        map((resp: IGetDoctors) => {
          this.toast.showSuccess(resp.msg);
          return resp.doctor;
        })
      );
  }

  public delete(id: string): Observable<IGetDoctor> {
    return this.http
      .delete<IGetDoctors>(`${DOCTORS_URI}/${id}`, this.headers)
      .pipe(
        catchError((error) => {
          this.toast.showError(error.error[0].msg);
          return of(null);
        }),
        map((resp: IGetDoctors) => {
          this.toast.showSuccess(resp.msg);
          return resp.doctor;
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
