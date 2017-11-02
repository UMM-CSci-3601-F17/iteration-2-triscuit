import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Card} from "./card";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class CardService {

    constructor(private http: Http) {  }

    public cards: Card[] ;

    private cardUrl: string = environment.API_URL + "cards";



    public getCards(): Observable<Card[]> {
        /*this.http.request(this.cardUrl).map(res => res.json()).subscribe(
            cardsres => {
                this.cards = cardsres;
            }, err => {
                console.log(err);
            }
        );*/
        let observable: Observable<any> = this.http.request(this.cardUrl);
        return observable.map(res => res.json());

    }


    // We pass the passwordState to the server to allow the process to be stopped if
    // the person trying to addCards has not entered in the password

}
