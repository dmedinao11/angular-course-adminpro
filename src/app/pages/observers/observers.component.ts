import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-observers',
  templateUrl: './observers.component.html',
  styles: [],
})
export class ObserversComponent implements OnInit {
  constructor() {
    this.intervalRetorner().subscribe(console.log);
  }

  ngOnInit(): void {
    const myObserver = new Observable((observer) => {
      let i = -1;
      const interval = setInterval(() => {
        i += 1;
        observer.next(i);
        if (i == 4) {
          observer.complete();
          clearInterval(interval);
        }
        if (i == 2) {
          i = 0;
          observer.error('Hubo un error');
        }
      }, 1000);
    });

    myObserver.pipe(retry(2)).subscribe(
      (resp) => console.log(resp),
      (error) => console.log(error),
      () => console.log('Observador terminado')
    );
  }

  intervalRetorner(): Observable<number> {
    const $interval = interval(1000);
    return $interval.pipe(
      take(4),
      map((val) => val + 1)
    );
  }
}
