import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.styles.css'],
})
export class LoginComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  //Handlers
  public onSubmit() {
    this.router.navigateByUrl('/');
  }
}
