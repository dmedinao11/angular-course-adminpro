import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private configurations = {
    closeButton: true,
    timeOut: 2000,
    positionClass: 'toast-top-center',
  };

  constructor(private toastr: ToastrService) {}

  public showSuccess(msg: string): void {
    this.toastr.success(msg, 'Proceso exitoso', this.configurations);
  }
  public showError(msg: string): void {
    this.toastr.error(msg, 'Oh oh', this.configurations);
  }
}
