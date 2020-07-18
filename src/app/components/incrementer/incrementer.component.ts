import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [],
})
export class IncrementerComponent {
  @Input('progress') public progressIn = 50;

  @Output('progress') public progressOut: EventEmitter<
    string
  > = new EventEmitter();

  public hasError = false;

  public changePercentage(value: number): void {
    if (this.progressIn + value > 100) {
      this.progressOut.emit('100%');
      return;
    }
    if (this.progressIn + value < 0) {
      this.progressOut.emit('0%');
      return;
    }
    this.progressIn += value;
    this.progressOut.emit(`${this.progressIn}%`);
  }

  public onChange(value: number): void {
    if (value > 100) {
      this.progressIn = 100;
      this.progressOut.emit('100%');
      this.hasError = true;
      return;
    }
    if (value < 0) {
      this.progressIn = 0;
      this.progressOut.emit('0%');
      this.hasError = true;
      return;
    }

    this.progressIn = value;
    this.hasError = false;
    this.progressOut.emit(`${value}%`);
  }
}
