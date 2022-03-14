import { Injectable } from "@angular/core";
declare let alertify: any;

@Injectable({
  providedIn: "root"
})
export class AlertifyService {

  success(message: string): void {
    alertify.set('notifier', 'position', 'top-right');
    alertify.success(message);
  }
  error(message: string): void {
    alertify.set('notifier', 'position', 'top-right');
    alertify.error(message);
  }
  warning(message: string): void {
    alertify.set('notifier', 'position', 'top-right');
    alertify.warning(message);
  }
}