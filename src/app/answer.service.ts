import { Injectable } from '@angular/core';

@Injectable()
export class AnswerService {

  constructor() { }

  getAnswer(): Boolean {
    return ( Math.random() > .5 ) ? true : false;
  }

  postAnswer( ans: Boolean ) {
    
  }

}
