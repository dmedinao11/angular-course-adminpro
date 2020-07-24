import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  public getMenu(): Object[] {
    return [
      {
        title: 'Dashboard',
        icon: 'mdi mdi-gauge',
        link: '',
        submenu: [{ title: 'Grafica', link: 'progress' }],
      },
      {
        title: 'Mantenimientos',
        icon: 'mdi mdi-folder-lock-open',
        link: 'users',
        submenu: [
          { title: 'Usuarios', link: 'users' },
          { title: 'Médicos', link: 'doctors' },
          { title: 'Hospitales', link: 'hospitals' },
        ],
      },
    ];
  }
}
