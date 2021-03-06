import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';

import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit {
  public title: string;
  public routeData: Subscription;

  constructor(public router: Router) {
    this.routeData = this.getTitle().subscribe(
      ({ title }) => (this.title = title)
    );
  }

  public getTitle() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild == null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.routeData.unsubscribe();
  }
}
