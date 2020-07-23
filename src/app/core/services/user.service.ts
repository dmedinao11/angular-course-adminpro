//Core
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

//Utilities
import { Observable, of } from 'rxjs';
import { take, map, tap, catchError } from 'rxjs/operators';

//Constants
import {
  USERS_URI,
  LOGIN_URI,
  GOOGLE_LOGIN_URI,
  RENEW_TOKEN,
} from '../constants/server-uris.constants';
import { LOCAL_STORAGE } from '../constants/main.constants';

//Models
import { IAuthUser } from '../interfaces/server-resps.interfaces';
import { IUser } from '../interfaces/user.interface';
import { MUser } from '../models/user.model';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;
  public user: MUser;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.initGoogleSignin();
  }

  public get token() {
    return localStorage.getItem(LOCAL_STORAGE.token) || '';
  }

  public get uid() {
    return this.user.uid;
  }

  public async initGoogleSignin(): Promise<void> {
    return new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '313741796206-7ru4sfjlp7evn6nvh3invnjjlago1cip.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  public register(toRegister: IUser): Observable<IAuthUser> {
    return this.http.post(USERS_URI, toRegister).pipe(
      take(1),
      tap((resp: IAuthUser) => {
        localStorage.setItem(LOCAL_STORAGE.token, resp.token);
        localStorage.setItem(
          LOCAL_STORAGE.user_logged,
          JSON.stringify(resp.user)
        );
      })
    ) as Observable<IAuthUser>;
  }

  public update(toUpdate: { name: string; email: string }): Observable<IUser> {
    return this.http
      .put(
        `${USERS_URI}`,
        { ...toUpdate, uid: this.uid },
        { headers: { token: this.token } }
      )
      .pipe(
        map((resp: { ok: boolean; updatedUser: IUser }) => resp.updatedUser)
      );
  }

  public login(toLogin: IUser): Observable<string> {
    return this.http.post(LOGIN_URI, toLogin).pipe(
      take(1),
      map((resp: IAuthUser) => {
        //Recording or deleting remember me
        if (toLogin.rememberMe)
          localStorage.setItem(LOCAL_STORAGE.remember_me, toLogin.email);
        else localStorage.removeItem(LOCAL_STORAGE.remember_me);

        //Recording token and scerialzable user
        localStorage.setItem(LOCAL_STORAGE.token, resp.token);
        localStorage.setItem(
          LOCAL_STORAGE.user_logged,
          JSON.stringify(resp.user)
        );

        return resp.msg;
      })
    );
  }

  public loginWithGoogle(token: string): Observable<string> {
    return this.http.post(GOOGLE_LOGIN_URI, { token }).pipe(
      take(1),
      map((resp: IAuthUser) => {
        //Recording token and scerialzable user
        localStorage.setItem(LOCAL_STORAGE.token, resp.token);
        localStorage.setItem(
          LOCAL_STORAGE.user_logged,
          JSON.stringify(resp.user)
        );

        return resp.msg;
      })
    );
  }

  public tokenValidator(): Observable<boolean> {
    const storagedToken = localStorage.getItem(LOCAL_STORAGE.token);

    if (!storagedToken || storagedToken.length == 0) return of(false);

    return this.http
      .get(RENEW_TOKEN, { headers: { token: storagedToken } })
      .pipe(
        tap((resp: IAuthUser) => {
          localStorage.setItem(LOCAL_STORAGE.token, resp.token);
          this.user = new MUser(resp.user);
        }),
        map((resp: IAuthUser) => true),
        catchError((error) => of(false))
      );
  }

  public logout() {
    localStorage.removeItem(LOCAL_STORAGE.token);
    localStorage.removeItem(LOCAL_STORAGE.remember_me);
    localStorage.removeItem(LOCAL_STORAGE.user_logged);

    this.auth2
      .signOut()
      .then(() => this.ngZone.run(() => this.router.navigateByUrl('/login')));
  }
}
