import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import 'rxjs/add/operator/toPromise';

import { LocalStorage, LocalStorageService } from "ng2-webstorage";

@Injectable()
export class AnswerService {
  private answers$: FirebaseListObservable<any> = this.$af.database.list("/answers");

  @LocalStorage()
  private anstamp: Number;

  constructor(
    private $af: AngularFire,
    private $jsonp: Jsonp,
    private $local: LocalStorageService
  ) { }

  getAnswer(): Boolean {
    return ( Math.random() > .5 ) ? true : false;
  }

  postAnswer( answer: Boolean ): Promise<any> {
    if ( this.anstamp <= ( Date.now() - 86400000 || null ) ) {
      return this.getGeolocation().then( geo =>
        this.answers$.push({
          answer,
          "ip": geo["ip"],
          "country": geo["country_code"]
        }).then( res => {
          this.anstamp = Date.now();
        })
      )
    }
  };


  getGeolocation(): Promise<Object> {
    let params = new URLSearchParams();
    params.set("callback", "JSONP_CALLBACK");

    return this.$jsonp.get("http://freegeoip.net/json", { search: params })
      .toPromise()
      .then( res => res.json())
      .catch( err => {
        console.log(err);

        return {
          "ip": "",
          "country_code": ""
        }
      });
  }

}
