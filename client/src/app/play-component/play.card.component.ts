

import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../card/card";
import {CardState} from "./CardState";

@Component({
    selector: 'play-card',
    templateUrl: './play.card.component.html',
    styleUrls: ['./play.card.component.css']
})
export class PlayCardComponent implements OnInit {

    syn: boolean = false;
    ant: boolean = false;
    gen: boolean = false;
    ex: boolean = false;
    hintIndex: number=0;
    synIndex: number=0;
    antIndex: number=0;
    genIndex: number=0;
    exIndex: number=0;

    constructor() {

    }

    @Input() card: Card;

    @Input() selected?: number = 0;

/*
    public getRandom(hints:string[],hint:string):string{
        console.log('synonym status'+this.syn);
        if(hint=='syn') {
            if (!this.syn) {
                console.log('synonym status'+this.syn);
                this.syn = true;
                this.synIndex = Math.floor(Math.random() * (hints.length));
                console.log(this.synIndex);
                return hints[this.synIndex];
            }
            else{
                return hints[this.synIndex];
            }
        }
        if(hint=='ant') {
            if (!this.ant) {
                this.ant = true;
                this.antIndex = Math.floor(Math.random() * (hints.length));
                console.log(this.antIndex);
                return hints[this.antIndex];
            }
            else{
                return hints[this.antIndex]
            }
        }if(hint=='gen') {
            if (!this.gen) {
                this.gen = true;
                this.genIndex = Math.floor(Math.random() * (hints.length));
                console.log(this.genIndex);
                return hints[this.genIndex];
            }
            else{
                return hints[this.genIndex];
            }
        }if(hint=='ex') {
            if (!this.ex) {
                this.ex = true;
                this.exIndex = Math.floor(Math.random() * (hints.length));
                console.log(this.exIndex);
                return hints[this.exIndex];
            }
            else{
                return hints[this.exIndex];
            }
        }
        return hints[this.hintIndex];
    }
    */

    ngOnInit() {
    }




}

