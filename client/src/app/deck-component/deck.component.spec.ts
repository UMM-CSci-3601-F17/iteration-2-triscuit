import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckComponent } from './deck.component';
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {CardComponent} from "../card-component/card.component";
import {DeckService} from "../deck/deck.service";
import {Observable} from "rxjs";
import {Deck} from "../deck/deck";
import {ActivatedRoute} from "@angular/router";

describe('DeckComponent', () => {
  let component: DeckComponent;
  let fixture: ComponentFixture<DeckComponent>;

    let deckServiceStub: {
        getDeck: (id) => Observable<Deck>
    };

  beforeEach(async(() => {

      deckServiceStub = {
          getDeck: (id) => Observable.of({
              _id : {
                  $oid: "test id"
              },
              name: "test deck",
              cards: [
                  {   _id : "test id",
                      word : "test word",
                      synonym: ["test synonym"],
                      antonym: ["test antonym"],
                      general_sense: ["test general_sense"],
                      example_usage: ["test example_usage"],
                  }
              ],
              password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
          })
      };

    TestBed.configureTestingModule({
        imports: [SharedModule],
        declarations: [ DeckComponent, CardComponent ],
        providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
            {provide: DeckService, useValue: deckServiceStub}, {
                provide: ActivatedRoute,
                useValue: {
                    params: Observable.of({id: "test id"})
                }
            }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load a deck', () => {

      expect(component.deck).toEqual({
          _id : {
              $oid: "test id"
          },
          name: "test deck",
          cards: [
              {   _id : "test id",
                  word : "test word",
                  synonym : ["test synonym"],
                  antonym: ["test antonym"],
                  general_sense: ["test general_sense"],
                  example_usage: ["test example_usage"],
              }
          ],
          password: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
      });
  });

  // NOTE: Tests don't work, don't like SHA function for whatever reason


  it('should check password', () => {
      expect(component.deck.password).toEqual("5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8");
      component.enteredPassword = "password";
      component.checkPassword();
      expect(component.correctPassword).toEqual(true);
  });

    it('should check password and return false', () => {
        expect(component.deck.password).toEqual("5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8");
        component.enteredPassword = "not_password";
        component.checkPassword();
        expect(component.correctPassword).toEqual(false);
    });

});
