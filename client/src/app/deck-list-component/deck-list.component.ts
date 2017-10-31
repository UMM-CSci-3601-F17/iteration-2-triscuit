import { Component, OnInit } from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {NewDeckDialogComponent} from "../new-deck-dialog/new-deck-dialog.component";
import {MdDialog} from "@angular/material";
import {Deck} from "../deck/deck";
import {PasswordDialogComponent} from "../password-dialog/password-dialog.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {

    id : string;
    deck : Deck;
    // correctPassword: boolean;

  constructor(public deckService: DeckService, public dialog : MdDialog) { }

    openAddDialog() {
        this.dialog.open(NewDeckDialogComponent);
    }
/*
    openPasswordDialog() {
        let dialogRef = this.dialog.open(PasswordDialogComponent, {
            data: { deckId: this.id },
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.correctPassword = result;
            }
        });
    }
    */

    ngOnInit() {
        this.deckService.getDecks();

    }

}
