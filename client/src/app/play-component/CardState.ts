import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../card/card";



export class CardState {
    public cardPoints:number;
    public cardHints:number[];
    public isComplete: boolean;
    public isRandomized: boolean;
    public selected: number;

    syn: boolean = false;
    ant: boolean = false;
    gen: boolean = false;
    ex: boolean = false;
    hintIndex: number=0;
    synIndex: number=0;
    antIndex: number=0;
    genIndex: number=0;
    exIndex: number=0;


    constructor(){

        this.cardPoints = 5;
        this.cardHints = [1,2,3,4];
        this.isComplete = false;
        this.isRandomized = false;
        this.selected = 0;
    }

    public randomizeSages(): void{
        if(this.cardHints.length > 0 && !this.isComplete) {
            let randnum = Math.floor(Math.random() * this.cardHints.length);
            this.selected = this.cardHints[randnum];

            this.cardHints.splice(randnum, 1);
            this.cardPoints = this.cardPoints - 1;
        }


    }

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


    public isDone(): void {
        this.isComplete = true;
    }



}
