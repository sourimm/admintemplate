import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import {Injectable} from '@angular/core';

@Injectable()
export class NotifyService {
  constructor(private toastServices: ToastyService) {}

  success(message: string, title: string = '') {
    this.ToastMessage('success', title, message);
  }
  error(message: string, title: string = '') {
    this.ToastMessage('error', title, message);
  }
  info(message: string, title: string = '') {
    this.ToastMessage('info', title, message);
  }
  wait(message: string, title: string = '') {
    this.ToastMessage('wait', title, message);
  }
  warning(message: string, title: string = '') {
    this.ToastMessage('warning', title, message);
  }
  primary(message: string, title: string = '') {
    this.ToastMessage('default', title, message);
  }

  private ToastMessage(type, title, msg) {
    const options = {
      type: type,
      title: title,
      msg: msg,
    };
    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: false,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        /* added */
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };

    switch (options.type) {
      case 'default': this.toastServices.default(toastOptions); break;
      case 'info': this.toastServices.info(toastOptions); break;
      case 'success': this.toastServices.success(toastOptions); break;
      case 'wait': this.toastServices.wait(toastOptions); break;
      case 'error': this.toastServices.error(toastOptions); break;
      case 'warning': this.toastServices.warning(toastOptions); break;
    }
  }
}
