import {DeckListPage} from "./deck-list.po";
import {browser, by} from 'protractor';


describe('deck-list-page', () => {
   let page: DeckListPage;

   beforeEach(() => {
       page = new DeckListPage();
       page.navigateTo();
   });


   it('should highlight title header', () => {
       expect(page.getPageTitle()).toEqual('Decks');
   });

    it("should have a play button, a deck name link, and a lock icon for every deck", () => {
        page.getAllDecks().each(e => {
            expect(e.element(by.className('lock')).getTagName()).toEqual("mat-icon");
            expect(e.element(by.className('play-button')).getTagName()).toEqual("button");
            expect(e.element(by.className('play-button')).getText()).toEqual("Play");
            expect(e.element(by.className('deck-name')).getTagName()).toEqual("a");
        });
    });

    it('should add one deck', () => {
       page.getAllDecks().count().then( beforecount => {
           page.addDeck("Test Deck", null);
           browser.sleep(500); // wait for stuff
           expect(page.getAllDecks().count()).toEqual(beforecount + 1);
           expect(page.getAllDecks().last().element(by.id('unlocked')).getTagName()).toEqual("mat-icon");
       });
    });

    it('should add one deck with a password', () => {
        page.getAllDecks().count().then( beforecount => {
            page.addDeck("Test Deck v2", "really_good_password");
            browser.sleep(500); // wait for stuff
            expect(page.getAllDecks().count()).toEqual(beforecount + 1);
            expect(page.getAllDecks().last().element(by.id('locked')).getTagName()).toEqual("mat-icon");
        });
    });

    it('should add three decks', () => {
        page.getAllDecks().count().then( beforecount => {
            page.addDeck("Test Deck 1", null);
            browser.sleep(500); // wait for stuff
            page.addDeck("Test Deck 2", null);
            browser.sleep(500); // wait for stuff
            page.addDeck("Test Deck 3", null);
            browser.sleep(500); // wait for stuff
            expect(page.getAllDecks().count()).toEqual(beforecount + 3);
        });
    });

    it('should add one deck and check that its still there', () => {
        page.getAllDecks().count().then( beforecount => {
            page.addDeck("Test Deck", null);
            page.navigateTo();
            expect(page.getAllDecks().count()).toEqual(beforecount + 1);
        });
    });

    it('should add a random deck and check that its there', () => {
        var name = page.randomText(10);

        page.addDeck(name, null);
        //browser.sleep(500); // wait for card to be added to list

        let e = page.getAllDecks().last();
        expect(e.element(by.className("deck-name")).getText()).toEqual("lock_open " + name);

    });




});
