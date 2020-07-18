import { Injectable } from '@angular/core';

//Constants
import { LOCAL_STORAGE, CSS_REFS } from '../constants/main.constants';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public themeStyleLink = document.querySelector('#theme');
  public selectedTheme: string;

  constructor() {
    //Setting user theme
    const storedTheme = localStorage.getItem(LOCAL_STORAGE.user_theme);
    const theme = storedTheme ? storedTheme : CSS_REFS.user_theme_default;
    this.changeTheme(theme);
  }

  public changeTheme(value: string): void {
    this.selectedTheme = value;
    const cssLink = `${CSS_REFS.user_theme_link}/${value}.css`;
    localStorage.setItem(LOCAL_STORAGE.user_theme, value);
    this.themeStyleLink.setAttribute('href', cssLink);
    this.checkSelectedTheme();
  }

  public checkSelectedTheme(): void {
    const themeSelectors = document.querySelectorAll('.selector-theme');

    themeSelectors.forEach((elem: Element) => {
      elem.classList.remove('working');
      if (elem.getAttribute('data-theme') == this.selectedTheme)
        elem.classList.add('working');
    });
  }
}
