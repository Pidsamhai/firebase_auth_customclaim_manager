import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CopyMessageComponent, Data } from '../utility/copy-message';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  error(msg: string, duration: number = 1000): void {
    this.snackBar.open(msg, undefined,
      {
        duration: duration,
        panelClass: "!bg-red-500",
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    )
  }

  open(msg: string, duration: number = 1000): void {
    this.snackBar.open(msg, undefined,
      {
        duration: duration,
        panelClass: "bg-red-500",
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    )
  }

  success(msg: string, duration: number = 1000): void {
    this.snackBar.openFromComponent(CopyMessageComponent,
      {
        data: <Data> { message: msg },
        duration: duration,
        panelClass: "bg-red-500",
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    )
  }
}
