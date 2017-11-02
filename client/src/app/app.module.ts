import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import {
    MATERIAL_COMPATIBILITY_MODE, MD_DIALOG_SCROLL_STRATEGY_PROVIDER, MdDialogContainer,
    MdSnackBar
} from '@angular/material';


import {HttpModule, JsonpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {Routing} from './app.routes';
import {APP_BASE_HREF} from "@angular/common";

import {SharedModule} from "./shared.module";
import {CardComponent} from "./card-component/card.component";
import {DeckListComponent} from "./deck-list-component/deck-list.component";
import {DeckComponent} from "./deck-component/deck.component";
import {DeckService} from "./deck/deck.service";
import {CardService} from "./card/card.service";
import {PlayComponent} from "./play-component/play.component";
import {PlayCardComponent} from "./play-component/play.card.component";
import {MdDialog} from "@angular/material";
import {NewCardDialogComponent} from "./new-card-dialog/new-card-dialog.component";
import {NewDeckDialogComponent} from "./new-deck-dialog/new-deck-dialog.component";
import {PasswordDialogComponent} from "./password-dialog/password-dialog.component";
import {CardListComponent} from "./card-list-component/card-list.component";

@NgModule({

    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        Routing,
        SharedModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        CardComponent,
        CardListComponent,
        DeckComponent,
        DeckListComponent,
        NewCardDialogComponent,
        NewDeckDialogComponent,
        PlayComponent,
        PlayCardComponent,
        PasswordDialogComponent,
        PlayComponent,
    ],
    entryComponents: [
        NewCardDialogComponent,
        NewDeckDialogComponent,
        PasswordDialogComponent
    ],
    providers: [
        DeckService,
        CardService,
        MdDialog,
        MdSnackBar,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
