import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseError } from 'firebase/app';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { finalize, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggerService } from '../services/logger/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  control: FormGroup;
  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl(environment.production ? '' : 'user@user.com', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl(environment.production ? '' : '123456', [Validators.required, Validators.minLength(6)]);

  private get password(): string { return this.passwordFormControl.value }
  private get email(): string { return this.emailFormControl.value }

  isProgress: boolean = false;
  errorMessage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private titleServces: Title
  ) {
    this.titleServces.setTitle("Login");
    this.control = this.fb.group({
      email: this.emailFormControl,
      password: this.passwordFormControl
    })
  }

  ngOnInit(): void {
  }

  login(): void {
    if (!this.control.valid) {
      return;
    }
    this.isProgress = true;
    this.errorMessage = null;
    from(signInWithEmailAndPassword(this.auth, this.email, this.password))
      .pipe(
        finalize(() => this.isProgress = false)
      )
      .subscribe({
        error: (error) => {
          if (error instanceof FirebaseError) {
            this.errorMessage = error.code.split('/')[1].replace('-', ' ');
          }
        },
        complete: () => this.router.navigate(['']),
      })
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
