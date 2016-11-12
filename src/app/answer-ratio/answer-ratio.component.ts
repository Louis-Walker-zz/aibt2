import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs/Observable";

import { AnswerService } from '../answer.service';

@Component({
  selector: 'aibt-answer-ratio',
  templateUrl: './answer-ratio.component.html',
  styleUrls: ['./answer-ratio.component.css'],
  providers: [
    AnswerService
  ]
})
export class AnswerRatioComponent implements OnInit {
  private answers: boolean[];
  private truePer: number = 50;

  constructor(
    private $ans: AnswerService
  ) { }

  ngOnInit() {
    this.$ans.getAnswers( 24 )
      .subscribe( ans => {
        this.answers = ans.map( ans => ans["answer"]);

        this.truePer = this.calcAnsPer();
      });
  }

  trueCount(): number {
    return this.answers.filter( ans => ans == true ).length;
  }

  calcAnsPer( isTrue: boolean = true ): number {
    return Math.round(( 100 / this.answers.length ) * this.trueCount());
  }
}
