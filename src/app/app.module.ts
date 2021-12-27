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
import { LOGGER_OPTIONS, LogLevel, Options } from './services/logger/logger.service';
import { environment } from 'src/environments/environment';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './services/api';
import { BASE_URL } from './services/api/api.service';
import { CopyMessageDirective, CopyMessageComponent } from './utility/copy-message';
import { CustomPaginatorComponent } from './widget/custom-paginator/custom-paginator.component';
import { EditCustomClaimsComponent } from './dialog/edit-custom-claims/edit-custom-claims.component';

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
    UsersComponent,
    CopyMessageDirective,
    CopyMessageComponent,
    CustomPaginatorComponent,
    EditCustomClaimsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FirebaseModule,
    ClipboardModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: LOGGER_OPTIONS,
      useValue: <Options>{ 
        level: LogLevel.all, 
        enable: !environment.production 
      }
    },
    authInterceptorProviders,
    { provide: BASE_URL, useValue: environment.baseApiEndpoint }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
