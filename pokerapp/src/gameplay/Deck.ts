import { Card, Value, Suit } from '@/models/interfaces';

export const cards = [
  { ace: require('../assets/cards/Ace_of_clubs.svg.png') },
  { clubs10: require('../assets/cards/10_of_clubs.svg.png') },
];
// init class card deck with functions
export class Deck {
  public deck: Card[]
  // To constructor with jokers?
  constructor() {
    this.deck = this.constructDeck();
  }

  public takeCardFromDeck(): Card {
    const min = 0;
    const max = this.deck.length;
    const randomIndex = Math.floor(Math.random() * (+max - +min)) + +min;
    return this.deck.splice(randomIndex, 1)[0];
  }

  public take5CardsFromDeck(): Card[] {
    const cardsArr: Card[] = [];
    for (let i = 0; i < 5; i++) {
      cardsArr.push(this.takeCardFromDeck());
    }
    return cardsArr;
  }

  private constructDeck(): Card[] {
    const deck: Card[] = [];
    for (let i = 1; i < 5; i++) {
      for (let j = 1; j < 14; j++) {
        deck.push({ suit: i, value: j, name: `${Value[j]} of ${Suit[i]}` });
        // Change all card picture names to match for loops
        const a = {a: require(`../assets/cards/10_of_clubs.svg.png`)}
        console.log(a);
      }
    }
    // Add jokers if needed
    return deck;
  }
}
// remove one random card from deck

// when new game make new deck instanse




