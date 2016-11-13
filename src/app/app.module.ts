import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JsonpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import { LocalStorageService } from "ng2-webstorage";

import { AppComponent } from './app.component';
import { AnswerRatioComponent } from './answer-ratio/answer-ratio.component';

import { AnswerPipe } from './answer.pipe';
import { UnixPassedPipe } from './unix-passed.pipe';
import { ToCasePipe } from './to-case.pipe';

import { firebaseConfig } from "./firebase.config";

@NgModule({
  declarations: [
    AppComponent,
    AnswerRatioComponent,
    AnswerPipe,
    UnixPassedPipe,
    ToCasePipe
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule.forRoot()
  ],
  providers: [ LocalStorageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
