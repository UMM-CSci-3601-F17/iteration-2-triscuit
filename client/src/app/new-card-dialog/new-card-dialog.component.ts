import {Component, Inject, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-new-card-dialog',
  templateUrl: './new-card-dialog.component.html',
  styleUrls: ['./new-card-dialog.component.css']
})
export class NewCardDialogComponent implements OnInit {

  constructor(public deckService : DeckService,
              public matDialogRef : MatDialogRef<NewCardDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { deckId : string },
              public snackBar: MatSnackBar) { }

    newCardWord: string;
    newCardSynonym: string;
    newCardAntonym: string;
    newCardGeneral: string;
    newCardExample: string;
    newCardSynonyms: string[] = [];
    newCardAntonyms: string[] = [];
    newCardGenerals: string[] = [];
    newCardExamples: string[] = [];

  ngOnInit() {
  }

    public addNewCard(): void {
        this.newCardSynonyms.push(this.newCardSynonym);
        this.newCardAntonyms.push(this.newCardAntonym);
        this.newCardGenerals.push(this.newCardGeneral);
        this.newCardExamples.push(this.newCardExample);
        this.deckService.addNewCard(this.data.deckId,
            this.newCardWord,
            this.newCardSynonyms,
            this.newCardAntonyms,
            this.newCardGenerals,
            this.newCardExamples).subscribe(
            succeeded => {
                //this.cardAddSuccess = true;
                this.matDialogRef.close(succeeded);
                this.snackBar.open("Added card", null, {
                    duration: 2000,
                });
                //this.refreshDeck();
            },
            err => {
                console.log(err);
                this.snackBar.open("Error adding card", null, {
                    duration: 2000,
                });
            });

        /*this.newCardSynonyms = [];
        this.newCardAntonyms = [];
        this.newCardGenerals = [];
        this.newCardExamples = [];asfasasdf*/
    }

}
