import { Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '../constants/main.constants';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public userMenu: Object[];

  public loadMenu(): void {
    this.userMenu = JSON.parse(localStorage.getItem(LOCAL_STORAGE.menu));
    console.log(this.userMenu);
  }
}
