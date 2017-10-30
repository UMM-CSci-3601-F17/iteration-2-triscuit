import {Component, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import {NewCardDialogComponent} from "../new-card-dialog/new-card-dialog.component";
import {MdDialog, MatSnackBar} from "@angular/material";
// This import can be found at https://www.npmjs.com/package/sha256-es
// Allows us to create a SHA256 hash that matches those found in our DB
import SHA256 from "sha256-es";

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

    id : string;
    deck : Deck;
    correctPassword : boolean;
    enteredPassword : string;


  constructor(public deckService : DeckService,
              private route: ActivatedRoute,
              public dialog : MdDialog,
              public snackBar: MatSnackBar) {


  }

  checkPassword() {
      this.enteredPassword = SHA256.hash(this.enteredPassword);
      this.correctPassword = (this.enteredPassword === this.deck.password);
      if(this.correctPassword === true) {
          this.snackBar.open("Correct Password!", null, {
              duration: 2000,
          });
      } else {
          this.snackBar.open("Incorrect Password", null, {
              duration: 2000,
          });
      }
  }

  openAddDialog() {
      let dialogRef = this.dialog.open(NewCardDialogComponent, {
          data: { deckId: this.id, passwordState: this.correctPassword },

      });
      dialogRef.afterClosed().subscribe(result => {
          if(result) {
              this.deck.cards.push(result);
          }
      });
  }


  ngOnInit() {
      this.route.params.subscribe(params => {
          this.id = params['id'];

          this.deckService.getDeck(this.id).subscribe(
              deck => {
                  this.deck = deck;
                  this.correctPassword = (this.deck.password === null);
              }
          );
      });
  }


}
