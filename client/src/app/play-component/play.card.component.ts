import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../card/card";

@Component({
    selector: 'play-card',
    templateUrl: './play.card.component.html',
    styleUrls: ['./play.card.component.css']
})
export class PlayCardComponent implements OnInit {

    constructor() {
    }

    @Input() card: Card;

    @Input() selected?: number = 0;

    ngOnInit() {
    }

    public getRandom(hints:string[]){
        
    }

}
