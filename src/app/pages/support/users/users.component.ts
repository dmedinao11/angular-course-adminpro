import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

//Services
import { UserService } from 'src/app/core/services/user.service';
import { SearchService } from 'src/app/core/services/search.service';
import { UploadService } from 'src/app/core/services/upload.service';

//Models
import { IUser } from 'src/app/core/interfaces/user.interface';
import { IGetUsers } from 'src/app/core/interfaces/server-resps.interfaces';
import { MUser } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent {
  public usersList: IUser[];
  public totalUsers = 0;
  public pageFrom = 0;
  public loaded: boolean;

  constructor(
    public userService: UserService,
    private searchService: SearchService,
    private uploadService: UploadService
  ) {
    this.getPage();
  }

  public getPage(): void {
    this.loaded = false;
    this.userService.getPage(this.pageFrom).subscribe((resp: IGetUsers) => {
      this.usersList = resp.users;
      this.totalUsers = resp.total;
      this.loaded = true;
    });
  }

  public search(term: string): void {
    if (!term || term == '') this.getPage();
    this.loaded = false;
    this.searchService
      .searchByCollection('users', term)
      .subscribe((resp: MUser[]) => {
        this.usersList = resp;
        this.totalUsers = this.usersList.length;
        this.loaded = true;
      });
  }

  //Handlers
  public changePage(newResults: number): void {
    this.pageFrom += newResults;

    if (this.pageFrom >= this.totalUsers) this.pageFrom -= newResults;
    else if (this.pageFrom < 0) this.pageFrom = 0;

    this.getPage();
  }

  public onDeleteUser(user: MUser): void {
    swal({
      title: '¿Estás seguro?',
      text: `Vas a eliminar por completo a ${user.name}`,
      icon: 'warning',
      buttons: ['Cancelar', 'Eliminar'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.userService.delete(user.uid).subscribe((resp: IUser) => {
          this.getPage();
          swal(`El usuario ${resp.name} ha sido eliminado`, {
            icon: 'success',
          });
        });
      }
    });
    //
  }

  public onRoleChange(user: MUser): void {
    this.userService.saveUser(user).subscribe();
  }

  public onOpenImgModal(user: MUser): void {
    console.log(user);
    this.uploadService.showModal('users', user);
  }
}
