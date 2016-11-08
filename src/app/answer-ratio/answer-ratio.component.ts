import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'aibt-answer-ratio',
  templateUrl: './answer-ratio.component.html',
  styleUrls: ['./answer-ratio.component.css']
})
export class AnswerRatioComponent implements OnInit {
  @Input() answers: boolean;

  constructor() { }

  ngOnInit() {
  }

}
