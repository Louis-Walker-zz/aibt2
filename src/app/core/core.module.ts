import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerService } from './answer.service';
import { SubtitleService } from './subtitle.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AnswerService,
    SubtitleService
  ]
})
export class CoreModule { }