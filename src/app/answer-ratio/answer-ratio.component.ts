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
    this.$ans.getAnswers()
      .subscribe( ans => {
        this.answers = ans.map( ans => ans["answer"]);

        this.truePer = this.calcAnsPer();
      });
  }

  answerCount( isTrue?: boolean ): number {
    let ans = this.answers;

    return isTrue === undefined ? 
      ans.length
      :
      ans.filter( ans => ans == isTrue ).length
  }

  calcAnsPer( isTrue: boolean = true ): number {
    return ( 100 / this.answerCount() ) * this.answerCount( isTrue );
  }
}
