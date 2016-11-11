import { Component, OnInit } from '@angular/core';

import { SubtitleService } from './subtitle.service';
import { AnswerService } from './answer.service';

import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    SubtitleService,
    AnswerService
  ]
})
export class AppComponent implements OnInit {
  private ver: String = "1.0.0";

  private subtitle: String;

  private answer: Boolean;
  private answers$: Observable<Boolean>;

  constructor(
    private $sub: SubtitleService,
    private $ans: AnswerService,
  ) {

  }

  ngOnInit() {
    this.$ans.generateAnswer();

    this.subtitle = this.$sub.getRandom();
  }
}
