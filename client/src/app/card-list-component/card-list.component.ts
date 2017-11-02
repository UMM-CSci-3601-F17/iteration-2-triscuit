import {Component, OnInit} from '@angular/core';
import {CardService} from "../card/card.service";
import {ActivatedRoute} from "@angular/router";
import {CardComponent} from "../card-component/card.component";
import {Deck} from "../deck/deck";
import {NewCardDialogComponent} from "../new-card-dialog/new-card-dialog.component";
import {MdDialog, MatSnackBar} from "@angular/material";
import {Card} from "../card/card";
import {Observable} from "rxjs/Observable";



@Component({
    selector: 'app-cards',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

    id : string;
    cards : Card[];
    correctPassword : boolean;
    enteredPassword : string;


    constructor(public cardService : CardService,
                private route: ActivatedRoute,
                public dialog : MdDialog,
                public snackBar: MatSnackBar) {


    }





    ngOnInit() {
        let cards :Observable<Card[]> = this.cardService.getCards();
        cards.subscribe(
            cards => {
                this.cards = cards;
            }
        );
        /*this.route.params.subscribe(params => {
            this.id = params['id'];

            this.cardService.getCards().subscribe(
                cards => {
                    this.cards = cards;
                }
            );
        });*/
    }


}
