import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JsonpModule } from '@angular/http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import { LocalStorageService } from "ng2-webstorage";

import { AppComponent } from './app.component';
import { AnswerRatioComponent } from './answer-ratio/answer-ratio.component';

import { firebaseConfig } from "./shared/cfg/firebase.config";

@NgModule({
  declarations: [
    AppComponent,
    AnswerRatioComponent
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    CoreModule,
    SharedModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule.forRoot()
  ],
  providers: [ LocalStorageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
