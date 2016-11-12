import { Injectable } from '@angular/core';

@Injectable()
export class SubtitleService {
  private subs: Array<String> = [
    "Welcome!",
    "Discover your soul.",
    "Yummy Mtn. Dew"
  ];

  getRandom() {
    return this.subs[ Math.floor( Math.random() * this.subs.length) ];
  }
}
