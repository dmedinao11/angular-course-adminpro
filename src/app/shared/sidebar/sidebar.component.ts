import { Component, OnInit } from '@angular/core';

//Services
import { UserService } from 'src/app/core/services/user.service';
import { MenuService } from 'src/app/core/services/menu.service';

//Models
import { MUser } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  public user: MUser;

  constructor(
    private userService: UserService,
    public menuService: MenuService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {}
}
