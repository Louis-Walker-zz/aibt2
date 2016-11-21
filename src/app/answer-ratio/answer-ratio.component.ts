import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs/Observable";

import { AnswerService } from '../core/answer.service';

@Component({
  selector: 'aibt-answer-ratio',
  templateUrl: './answer-ratio.component.html',
  styleUrls: ['./answer-ratio.component.css']
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

  private calcAnsPer( isTrue: boolean = true ): number {
    return Math.round(( 100 / this.answers.length ) * this.trueCount());
  }

  public trueCount(): number {
    return this.answers.filter( ans => ans == true ).length;
  }
}
