import { Component, OnInit } from '@angular/core';

//Services
import { UserService } from '../core/services/user.service';

//Constants
import { SettingsService } from '../core/services/settings.service';
import { MenuService } from '../core/services/menu.service';

declare function initAll();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent {
  public themeStyleLink = document.querySelector('#theme');

  constructor(
    public settingsService: SettingsService,
    public userService: UserService,
    public menuService: MenuService
  ) {
    initAll();
    menuService.loadMenu();
  }
}
