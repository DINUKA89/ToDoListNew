import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TasksComponent } from "../modules/tasks/tasks.component";
import { TaskDialogComponent } from "../modules/tasks/task-dialog/task-dialog.component";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { HttpClientModule } from '@angular/common/http';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from 'src/modules/login/login.component';

import {SocialLoginModule, SocialAuthServiceConfig} from '@abacritt/angularx-social-login';
import {GoogleLoginProvider} from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatAutocompleteModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('378590442026-8ietf5kngofr9ncm9ms9241ceovkpted.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
