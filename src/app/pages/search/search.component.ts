import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../core/services/search.service';
import { IUser } from 'src/app/core/interfaces/user.interface';
import { IHospital } from 'src/app/core/interfaces/hospital.interface';
import {
  IGetDoctor,
  IGetHospital,
} from 'src/app/core/interfaces/server-resps.interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  public loaded: boolean;

  public doctors: IGetDoctor[];
  public users: IUser[];
  public hospitals: IGetHospital[];

  constructor(
    private activatedRouter: ActivatedRoute,
    private searchService: SearchService,
    private router: Router
  ) {
    this.activatedRouter.params.subscribe(({ term }) => {
      if (!term || term == '') {
        this.router.navigateByUrl('/');
        return;
      }

      this.getResults(term);
    });
  }

  ngOnInit(): void {}

  public getResults(term: string): void {
    this.loaded = false;
    this.searchService
      .globalSearch(term)
      .subscribe(({ doctors, users, hospitals }) => {
        this.doctors = doctors;
        this.users = users;
        this.hospitals = hospitals;
        this.loaded = true;

        console.warn(doctors, users, hospitals);
      });
  }
}
