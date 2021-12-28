import { AbstractControl, ValidationErrors } from "@angular/forms";

export class MyValidator {
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