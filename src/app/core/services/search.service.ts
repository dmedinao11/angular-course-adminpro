//Core
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Utilities
import { Observable, of } from 'rxjs';
import { take, map, tap, catchError } from 'rxjs/operators';

//Constants
import {
  SEARCH_BY_COLLECTION,
  SEARCH,
} from '../constants/server-uris.constants';
import { LOCAL_STORAGE } from '../constants/main.constants';

//Models
import { IUser } from '../interfaces/user.interface';
import { MUser } from '../models/user.model';
import { IDoctors } from '../interfaces/doctor.interface';
import { IHospital } from '../interfaces/hospital.interface';
import {
  IGetDoctor,
  IGetHospital,
} from '../interfaces/server-resps.interfaces';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  public get token() {
    return localStorage.getItem(LOCAL_STORAGE.token) || '';
  }

  public searchByCollection(
    collection: 'users' | 'doctors' | 'hospitals',
    term: string
  ): Observable<any[]> {
    return this.http
      .get(`${SEARCH_BY_COLLECTION}/${collection}/${term}`, {
        headers: { token: this.token },
      })
      .pipe(
        map((coincidences: any[]) => {
          switch (collection) {
            case 'users':
              return coincidences.map((user: IUser) => new MUser(user));
            case 'hospitals':
              return coincidences;
            case 'doctors':
              return coincidences;
          }
        })
      );
  }

  public globalSearch(
    term: string
  ): Observable<{
    users: IUser[];
    doctors: IGetDoctor[];
    hospitals: IGetHospital[];
  }> {
    return this.http.get<{
      users: IUser[];
      doctors: IGetDoctor[];
      hospitals: IGetHospital[];
    }>(`${SEARCH}/${term}`, { headers: { token: this.token } });
  }
}
