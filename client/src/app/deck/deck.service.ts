import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Deck} from "./deck";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class DeckService {

  constructor(private http: Http) {  }

  public decks: Deck[] ;

  private deckUrl: string = environment.API_URL + "decks";

  private cardUrl: string = environment.API_URL + "cards";

  public getDecks(): void {
      this.http.request(this.deckUrl).map(res => res.json()).subscribe(
          decksres => {
              this.decks = decksres;
          }, err => {
              console.log(err);
          }
      );
  }

  public getDeck(id:string) : Observable<Deck> {
      let newDeck : Observable<Deck> = this.http.request(this.deckUrl + "/" + id).map(res => res.json());
      return newDeck;
  }

  // We pass the passwordState to the server to allow the process to be stopped if
  // the person trying to addCards has not entered in the password

  public addNewCard(passwordState: boolean, deckID: string, word: string, synonym: string[], antonym: string[], general: string[], example: string[]) {

      const body = {passwordState:passwordState, deckID:deckID, word:word, synonym:synonym, antonym:antonym, general_sense:general, example_usage:example};
      console.log(body);

      return this.http.post(this.cardUrl + "/add", body).map(res => res.json());
  }

  public addNewDeck(name: string, password: string) {
      let response = this.http.post(this.deckUrl + "/add", {name: name, password: password}).map(res => res.json());
      return response;
  }




}
