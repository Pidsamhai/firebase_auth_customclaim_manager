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
import { ProjectComponent } from './widget/project/project.component';
import { TokenComponent } from './token/token.component';
import { CreateTemplateComponent } from './dialog/create-template/create-template.component';
import { DeleteTemplateComponent } from './dialog/delete-template/delete-template.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    AppComponent,
    UserItemComponent,
    LoginComponent,
    ToolBarComponent,
    CardComponent,
    IndexComponent,
    LogoutComponent,
    ProjectComponent,
    TokenComponent,
    CreateTemplateComponent,
    DeleteTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FirebaseModule,
    ClipboardModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
