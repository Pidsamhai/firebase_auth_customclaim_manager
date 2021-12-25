import { NgModule } from '@angular/core';
import { getApp } from '@angular/fire/app';
import { AppCheckModule, provideAppCheck, initializeAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [],
  imports: [
    provideAppCheck(() => {
      const provider = new ReCaptchaV3Provider(environment.recaptcha3SiteKey);
      return initializeAppCheck(getApp(), { provider, isTokenAutoRefreshEnabled: true });
    }),
  ],
  exports: [
    AppCheckModule
  ]
})
export class AppcheckModule { }
