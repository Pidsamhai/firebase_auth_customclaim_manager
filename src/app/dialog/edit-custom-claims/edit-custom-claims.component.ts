import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { MyErrorStateMatcher } from 'src/app/login/login.component';
import { ApiService } from 'src/app/services/api/api.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { jsonPretty } from 'src/app/utility/';

@Component({
  selector: 'app-edit-custom-claims',
  templateUrl: './edit-custom-claims.component.html',
  styleUrls: ['./edit-custom-claims.component.scss']
})
export class EditCustomClaimsComponent implements OnInit {
  isLoading: boolean = false;
  customClaimsFormControl = new FormControl('', [MyValidator.jsonFormat],);

  matcher = new MyErrorStateMatcher();
  constructor(
    private logger: LoggerService,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private api: ApiService
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

}

export interface Data {
  templateId: string,
  id: string
}

class MyValidator {
  static jsonFormat(control: AbstractControl): ValidationErrors | null {
    try {
      if (control.value == "") {
        return null;
      }
      JSON.parse(control.value);
      return null;
    } catch (error) {
      return <ValidationErrors>{
        jsonFormat: "Invalid JsonFormat"
      }
    }
  }
}