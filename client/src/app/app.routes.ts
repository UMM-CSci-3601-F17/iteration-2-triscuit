// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DeckListComponent} from "./deck-list-component/deck-list.component";
import {DeckComponent} from "./deck-component/deck.component";
import {PlayComponent} from "./play-component/play.component";
import {CardListComponent} from "./card-list-component/card-list.component";

// Route Configuration
export const routes: Routes = [
    {path: 'play/:deck', component: PlayComponent},
    {path: 'decks/:id', component: DeckComponent},
    {path: 'decks', component: DeckListComponent},
    {path: 'cards', component: CardListComponent},
    {path: '', component: HomeComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
