import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerPipe } from './pipes/answer.pipe';
import { UnixPastPipe } from './pipes/unix-past.pipe';
import { ToCasePipe } from './pipes/to-case.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AnswerPipe,
    UnixPastPipe,
    ToCasePipe
  ],
  exports: [
    AnswerPipe,
    UnixPastPipe,
    ToCasePipe
  ]
})
export class SharedModule { }