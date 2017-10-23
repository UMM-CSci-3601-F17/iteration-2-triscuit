import {Component, Inject, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {MatDialogRef,  MatSnackBar, MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: 'app-password-dialog',
    templateUrl: './password-dialog.component.html',
    styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {

    constructor(public deckService: DeckService,
                public matDialogRef: MatDialogRef<PasswordDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { deckId : string },
                public snackBar: MatSnackBar) {
    }

    ngOnInit() {
    }

    deckPassword: string;


    public checkDeckPassword() : boolean {
        correctPassword: boolean;
        correctPassword = this.deckService.checkPassword(this.deckPassword, this.data.deckId);
        if(correctPassword == true) {
            this.matDialogRef.close();
            return correctPassword;
        } else {
            this.snackBar.open("Incorrect Password", null, {
                duration: 2000;
            });
            return correctPassword;
}
    }

}
