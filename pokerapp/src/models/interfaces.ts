export interface Card {
    suit?: Suit;
    value: Value;
    name?: string;
    img?: any;
}

export enum Suit {
    Spades = 1,
    Clubs = 2,
    Diamonds = 3,
    Hearts = 4,
}

export enum Value {
    Ace = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Jack = 11,
    Queen = 12,
    King = 13,
}
