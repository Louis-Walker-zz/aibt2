// ng-native
import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

// ng-firebase
import { AngularFire, FirebaseListObservable } from 'angularfire2';

// rx-operators
import 'rxjs/add/operator/toPromise';

// ng-plugins
import { LocalStorage, LocalStorageService } from "ng2-webstorage";

// Move to import
interface Answer {
  answer: Boolean;
  timestamp: Number;
}

@Injectable()
export class AnswerService {
  private answers$: FirebaseListObservable<any> = this.$af.database.list("/answers");

  @LocalStorage()
  private lastAnswer: Answer;

  constructor(
    private $af: AngularFire,
    private $jsonp: Jsonp,
    private $local: LocalStorageService
  ) {
    
    if ( !( this.lastAnswer)) {
      this.lastAnswer = {
        "answer": null,
        "timestamp": null
      }
    }
  }

  // Utitlity Methods
  generateAnswer(): Promise<any> {
    return this.newable().then( newable => {
      if ( newable ) {
        this.$local.store("lastAnswer", {
          "answer": Math.random() > .5 ? true : false,
          "timestamp": Date.now()
        });

        this.postAnswer( this.lastAnswer.answer );
      }
    })
  }

  getAnswer(): Boolean {
    return this.lastAnswer.answer;
  }

  newable() {
    return new Promise(( resolve, reject ) => {
      resolve( this.lastAnswer.timestamp <= ( Date.now() - 86400000 || null ) ? true : false );
    });
  };

  // freegeoip Method
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
  };

  // Firebase Methods
  postAnswer( answer: Boolean ): Promise<any> {
    let _ans = this.lastAnswer;

    return this.newable().then( newable => 
      newable ?
        this.getGeolocation().then( geo =>
          this.answers$.push({
            answer,
            "ip": geo["ip"],
            "country": geo["country_code"]
          })
        ): null
    );
  };
};