import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { IContextMenuHandler } from './models/context-menu-handler.interface';
import { IEntityHandler } from './models/entity-handler.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UxService implements ErrorHandler,
  IContextMenuHandler,
  IEntityHandler {

  private _errors = new Subject<string>();
  errors = this._errors.asObservable();

  constructor(
    private snackBar: MatSnackBar,
  ) {
  }

  handleError(error: any): void {
    const err = error instanceof Error ? error.message : error;
    this._errors.next(err);
    this.snackBar.open(this.getError(err), null, {
      duration: 3000,
      panelClass: ['red-snackbar']
    });
  }

  showInfo(message: string, title?: string): void {
    this.snackBar.open(message, null, {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }

  getError(err): string {
    if (environment.error[err]) {
      return environment.error[err]
    }
    return err
  }
}
