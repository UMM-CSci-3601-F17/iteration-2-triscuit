import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../card/card";
import {CardState} from "./CardState";

@Component({
    selector: 'play-card',
    templateUrl: './play.card.component.html',
    styleUrls: ['./play.card.component.css']
})
export class PlayCardComponent implements OnInit {
    isRandomized: boolean;
    syn: boolean;
    ant: boolean;
    gen: boolean;
    ex: boolean;
    hintIndex: number;
    synIndex: number;
    antIndex: number;
    genIndex: number;
    exIndex: number;

    constructor() {
        this.isRandomized = false;
        this.syn = false;
        this.ant = false;
        this.gen = false;
        this.ex = false;
        this.hintIndex = 0;
        this.synIndex = 0;
        this.antIndex = 0;
        this.genIndex = 0;
        this.exIndex = 0;
    }

    @Input() card: Card;

    @Input() selected?: number = 0;

    public getRandom(hints:string[],hint:string):string{
        if(hint=='syn') {
            if (!this.syn) {
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

    ngOnInit() {
    }




}
