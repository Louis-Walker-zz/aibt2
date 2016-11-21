import { Component, OnInit } from '@angular/core';

import { SubtitleService } from './core/subtitle.service';
import { AnswerService } from './core/answer.service';

import { Observable } from "rxjs/Observable";

import { LocalStorage } from "ng2-webstorage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private ver: string = "1.0.0";

  private subtitle: string;

  @LocalStorage()
  private lastAnswer: any;

  private answers: any[];

  constructor(
    private $sub: SubtitleService,
    private $ans: AnswerService
  ) {

  }

  ngOnInit() {
    this.$ans.generateAnswer();

    this.$sub.getRandom()
      .then( sub => this.subtitle = sub );

    this.$ans.getAnswers( 8 )
      .subscribe( ans => this.answers = ans );
  }
}
