import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {PlayCardComponent} from "./play.card.component";
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {Component} from "@angular/core";
import {Card} from "../card/card";
import {browser} from "protractor";

describe('CardComponent', () => {
    let component: PlayCardComponent;
    let methodComponent: PlayCardComponent;
    let fixture: ComponentFixture<TestComponentWrapper>;
    let debugElement: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [ TestComponentWrapper, PlayCardComponent ],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentWrapper);
        component = fixture.debugElement.children[0].componentInstance;
        methodComponent = new PlayCardComponent();
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should check that card is added correctly', () => {

        expect(component.card.synonym).toContain("test synonym");
        expect(component.card.antonym).toContain("test antonym");
        expect(component.card.general_sense).toContain("test general_sense");
        expect(component.card.example_usage).toContain("test example_usage");


    });

    it('synonym should be highlighted', () => {
        let synonym: HTMLElement = debugElement.query(By.css('.card-synonym')).nativeElement;
        expect(synonym.classList).toContain("hint-selected");
    });

    it('should randomly get a hint the first time, and repeatedly retrieve the same hint after the first randomization', () => {
        var synonym: string[] = component.card.synonym;
        methodComponent.getRandom(synonym,'syn');
        var index1: number = methodComponent.synIndex;
        methodComponent.getRandom(synonym,'syn');
        var index2: number = methodComponent.synIndex;
        expect(index1).toEqual(index2);
        expect(methodComponent.getRandom(component.card.example_usage,'ex')).toEqual(methodComponent.getRandom(component.card.example_usage,'ex'));
    });

    it('should return initial value of hint array if it has already been randomized', () => {
        methodComponent.ex = true;
        expect(methodComponent.getRandom(component.card.example_usage, 'ex')).toEqual('test example_usage');
    });

});



@Component({
    selector: 'test-component-wrapper',
    template: '<play-card [card]="card" [selected]="1"></play-card>'
})
class TestComponentWrapper {
    card : Card = {
        _id : "test id",
        word : "test word",
        synonym : ["test synonym", "anotha one", "another one"],
        antonym: ["test antonym", "antonym test"],
        general_sense: ["test general_sense"],
        example_usage: ["test example_usage", "a", "b", "c"],
    };


}
