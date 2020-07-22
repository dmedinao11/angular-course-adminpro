import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  //Handlers
  public onLogout(): void {
    this.userService.logout();
  }
}
