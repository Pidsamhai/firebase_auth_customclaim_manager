import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, take, throwError } from 'rxjs';
import { MyErrorStateMatcher } from 'src/app/login/login.component';
import { ApiService } from 'src/app/services/api/api.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { jsonPretty, MyValidator } from 'src/app/utility/';

@Component({
  selector: 'app-edit-custom-claims',
  templateUrl: './edit-custom-claims.component.html',
  styleUrls: ['./edit-custom-claims.component.scss']
})
export class EditCustomClaimsComponent implements OnInit {
  isLoading: boolean = false;
  customClaimsFormControl = new FormControl('', [MyValidator.jsonFormat],);
  private get claims(): string {
    return this.customClaimsFormControl.value;
  }

  matcher = new MyErrorStateMatcher();
  constructor(
    private logger: LoggerService,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private api: ApiService,
    private snackBarServices: SnackBarService,
    private dialogRef: MatDialogRef<EditCustomClaimsComponent>,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.customClaimsFormControl.disable();
    this.api.getUserClaims(this.data.templateId, this.data.id)
      .pipe(take(1))
      .subscribe({
        next: res => {
          this.customClaimsFormControl.setValue(jsonPretty(res));
          this.customClaimsFormControl.enable();
        },
        complete: () => this.isLoading = false
      });
  }

  formatJson(): void {
    try {
      const pretty = jsonPretty(JSON.parse(this.customClaimsFormControl.value))
      this.customClaimsFormControl.setValue(pretty);
    } catch (error) {
      return;
    }
  }

  saveChange(): void {
    this.isLoading = true;
    this.api.updateUserClaims(this.data.templateId, this.data.id, this.claims)
      .pipe(
        take(1), 
        finalize(() => this.dialogRef.close())
      )
      .subscribe({
        next: res => this.snackBarServices.success(res.message),
        error: error => {
          this.snackBarServices.error(error.error.message);
        }
      })
  }

}

export interface Data {
  templateId: string,
  id: string
}