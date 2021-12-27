import { Directive, HostListener, Input } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CopyMessageComponent, Data } from './copy-message.component';

@Directive({
  selector: '[appCopyMessage]'
})
export class CopyMessageDirective {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @Input()
  message: string = "Copy text to clipboard";
  @Input()
  duration: number = 1000;

  constructor(
    private snackBar: MatSnackBar
  ) { }

  @HostListener('click', ['$event.target'])
  onClick(btn: HTMLElement) {
    this.snackBar.openFromComponent(
      CopyMessageComponent,
      {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.duration,
        data: <Data> {
          message: this.message
        }
      }
    )
  }

}
