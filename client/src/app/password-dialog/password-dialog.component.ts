import {Component, Inject, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {MatDialogRef,  MatSnackBar, MAT_DIALOG_DATA} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";

@Component({
    selector: 'app-password-dialog',
    templateUrl: './password-dialog.component.html',
    styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {

    constructor(public deckService: DeckService,
                public matDialogRef: MatDialogRef<PasswordDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { deckId : string },
                public snackBar: MatSnackBar,
                private route: ActivatedRoute) {
    }

    correctPassword: boolean;
    enteredPassword: string;
    id: string;
    deck: Deck;

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];

            this.deckService.getDeck(this.data.deckId).subscribe(
                deck => {
                    this.deck = deck;
                }
            );
        });
    }




    public checkDeckPassword() : boolean {
        this.correctPassword = (this.enteredPassword === this.deck.password);
        if(this.correctPassword === true) {
            this.matDialogRef.close();
            return this.correctPassword;
        } else {
            this.snackBar.open("Incorrect Password", null, {
                duration: 2000,
            });
            return this.correctPassword;
}
    }

}
