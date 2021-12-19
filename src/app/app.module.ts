import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserItemComponent } from './user-item/user-item.component';
import { LoginComponent } from './login/login.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { LogoutComponent } from './logout/logout.component';
import { FirebaseModule } from './firebase/firebase.module';
import { SignoutComponent } from './dialog/signout/signout.component';

@NgModule({
  declarations: [
    AppComponent,
    UserItemComponent,
    LoginComponent,
    ToolBarComponent,
    CardComponent,
    IndexComponent,
    LogoutComponent,
    SignoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FirebaseModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
