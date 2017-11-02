import { CardState } from "./CardState";

describe('CardState', () => {
   let cardState: CardState;
   let synonym: string[] = ["test synonym", "anotha one", "another one"];
   let antonym: string[] = ["test antonym", "antonym test"];
   let general_sense: string[] ;
   let example_usage: string[];
    beforeEach(() => {
        cardState = new CardState;
        synonym = ["test synonym", "anotha one", "another one"];
        antonym = ["test antonym", "antonym test"];
        general_sense = ["test general_sense"];
        example_usage = ["test example_usage", "a", "b", "c"];
});

it('should create', () => {
    expect(cardState).toBeTruthy();
});

it('should remove hints from array', () => {
    cardState.randomizeSages();
    expect(cardState.cardHints.length).toEqual(3);
    cardState.randomizeSages();
    expect(cardState.cardHints.length).toEqual(2);
    cardState.randomizeSages();
    expect(cardState.cardHints.length).toEqual(1);

});

it('should lower card points when a hint is used', () => {
    cardState.randomizeSages();
    expect(cardState.cardPoints).toEqual(4);
    cardState.randomizeSages();
    expect(cardState.cardPoints).toEqual(3);
    cardState.randomizeSages();
    expect(cardState.cardPoints).toEqual(2);
});

it('should make isComplete true', () => {
    expect(cardState.isComplete).toEqual(false);
    cardState.isDone();
    expect(cardState.isComplete).toEqual(true);
});

    it('should randomly get a hint the first time, and repeatedly retrieve the same hint after the first randomization', () => {
        var synonym:string[] = ["test synonym", "anotha one", "another one"];
        var example_usage = ["test example_usage", "a", "b", "c"];
        cardState.getRandom(synonym,'syn');
        var index1: number = cardState.synIndex;
        cardState.getRandom(synonym,'syn');
        var index2: number = cardState.synIndex;
        expect(index1).toEqual(index2);
        expect(cardState.getRandom(example_usage,'ex')).toEqual(cardState.getRandom(example_usage,'ex'));
    });

    it('should return initial value of hint array if it has already been randomized', () => {
        var examples = ["test example_usage", "a", "b", "c"];
        cardState.ex = true;
        expect(cardState.getRandom(examples, 'ex')).toEqual('test example_usage');
    });

});
