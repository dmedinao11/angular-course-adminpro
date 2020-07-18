import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [],
})
export class PromisesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    fetch('https://reqres.in/api/users?')
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));
  }
}
