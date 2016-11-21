// ng-native
import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

// ng-firebase
import { AngularFire, FirebaseListObservable } from 'angularfire2';

// rx-operators
import { Observable } from "rxjs/Observable";
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
  private answers$: FirebaseListObservable<any[]> = this.$af.database.list("/answers");

  @LocalStorage()
  private lastAnswer: Answer;

  constructor(
    private $af: AngularFire,
    private $jsonp: Jsonp,
    private $local: LocalStorageService
  ) {

    // Initiate new clients
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

        this.postAnswer();
      }
    })
  }

  newable(): Promise<boolean> {
    return new Promise(( resolve ) => {
      resolve( this.lastAnswer.timestamp <= Date.now() - 86400000 ? true : false );
    });
  };

  returnable(): Promise<boolean> {
    return new Promise(( resolve ) => {
      resolve( !!this.lastAnswer.timestamp );
    });
  };

  // freegeoip Method
  getGeolocation(): Promise<Object> {
    let params = new URLSearchParams();
    params.set("callback", "JSONP_CALLBACK");

    return this.$jsonp.get("https://freegeoip.net/json", { search: params })
      .toPromise()
      .then( res => res.json())
      .catch( err => {
        console.log(err);

        return {
          "country_code": "AN",
          "country_name": "Anonymous"
        }
      });
  };

  // Firebase Methods
  private postAnswer( answer: Answer = this.lastAnswer ): Promise<any> {
    let _ans = this.lastAnswer;

    return this.getGeolocation().then( geo =>
      this.answers$.push({
        "answer": answer.answer,
        "country_code": geo["country_code"],
        "country_name": geo["country_name"],
        "timestamp": answer.timestamp
      })
    )
  };

  public getAnswers( limitToLast: Number = 10 ): FirebaseListObservable<any[]> {
    let answersQuery: Object = {
      query: {
        limitToLast,
        orderByKey: true
      }
    };

    return this.$af.database.list("/answers", answersQuery);
  };
};