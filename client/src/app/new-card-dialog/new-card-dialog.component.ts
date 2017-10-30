import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from "@angular/material";
import {TdPulseAnimation} from "@covalent/core";
import {getComponent} from "@angular/core/src/linker/component_factory_resolver";

@Component({
  selector: 'app-new-card-dialog',
  templateUrl: './new-card-dialog.component.html',
  styleUrls: ['./new-card-dialog.component.css'],
    animations: [
        TdPulseAnimation()
    ]
})


export class NewCardDialogComponent implements OnInit {

  constructor(public deckService : DeckService,
              public matDialogRef : MatDialogRef<NewCardDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { deckId : string, passwordState: boolean },
              public snackBar: MatSnackBar) { }



    pulseState: boolean = false;
    newCardWord: string;
    newCardSynonym: string = "";
    newCardAntonym: string = "";
    newCardGeneral: string = "";
    newCardExample: string = "";
    newCardSynonyms: string[] = [];
    newCardAntonyms: string[] = [];
    newCardGenerals: string[] = [];
    newCardExamples: string[] = [];

  ngOnInit() {
  }



    public pushNewCard(hintType:string,hint:string,hints:string[]): void{
        hints.push(hint);
        this.snackBar.open("Added "+hintType+": "+hint, null, {
            duration: 2000,
        });

    }

    public addNewCard(): void {
      if(this.newCardSynonym!='')
        this.newCardSynonyms.push(this.newCardSynonym);
      if(this.newCardAntonym!='')
        this.newCardAntonyms.push(this.newCardAntonym);
      if(this.newCardGeneral)
        this.newCardGenerals.push(this.newCardGeneral);
      if(this.newCardExample!='')
        this.newCardExamples.push(this.newCardExample);
        // We pass the passwordState as a way to keep people from adding cards
        // to the DB if they got pass the password protection incorrectly
        this.deckService.addNewCard(this.data.passwordState,
            this.data.deckId,
            this.newCardWord,
            this.newCardSynonyms,
            this.newCardAntonyms,
            this.newCardGenerals,
            this.newCardExamples,).subscribe(
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
