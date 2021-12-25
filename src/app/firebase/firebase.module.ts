import { NgModule } from '@angular/core';
import { FirebaseAppModule, provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { DatabaseModule, getDatabase, provideDatabase, connectDatabaseEmulator } from '@angular/fire/database';
import { AuthModule, getAuth, provideAuth, EmulatorConfig, connectAuthEmulator } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AppcheckModule } from './appcheck/appcheck.module';


@NgModule({
  declarations: [],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => {
      const db = getDatabase();
      if (environment.useEmulators) {
        connectDatabaseEmulator(db, "127.0.0.1", 9000);
      }
      return db;
    }),
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(getAuth(), 'http://127.0.0.1:9099', { disableWarnings: true })
      }
      return auth;
    }),
  ],
  exports: [
    FirebaseAppModule,
    AuthModule,
    DatabaseModule,
    AppcheckModule
  ],
  providers: [
  ]
})
export class FirebaseModule { }
