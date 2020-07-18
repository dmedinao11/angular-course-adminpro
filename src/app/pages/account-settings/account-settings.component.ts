import { Component, OnInit } from '@angular/core';

//Services
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [],
})
export class AccountSettingsComponent implements OnInit {
  constructor(public settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.checkSelectedTheme();
  }

  public changeTheme = (value: string) =>
    this.settingsService.changeTheme(value);
}
