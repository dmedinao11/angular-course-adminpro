import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { MUser } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public user: MUser;

  constructor(public userService: UserService, public router: Router) {
    this.user = userService.user;
  }

  ngOnInit(): void {}

  //Handlers
  public onLogout(): void {
    this.userService.logout();
  }

  public onSearch(term: string): void {
    this.router.navigateByUrl(`/dashboard/search/${term}`);
  }
}
