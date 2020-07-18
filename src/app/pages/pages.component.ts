import { Component, OnInit } from '@angular/core';

//Constants
import { LOCAL_STORAGE, CSS_REFS } from '../core/constants/main.constants';
import { SettingsService } from '../core/services/settings.service';

declare function initAll();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  public themeStyleLink = document.querySelector('#theme');

  constructor(public settingsService: SettingsService) {
    initAll();
  }

  ngOnInit(): void {}
}
