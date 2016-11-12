import { Injectable } from '@angular/core';

@Injectable()
export class SubtitleService {
  private subs: Array<string> = [
    "Welcome!",
    "Discover your soul.",
    "Yummy Mtn. Dew"
  ];

  getRandom(): string {
    return this.subs[ Math.floor( Math.random() * this.subs.length) ];
  }
}
