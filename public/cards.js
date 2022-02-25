var hitButton = document.getElementById("hit");
var dealButton = document.getElementById("deal");
var playbutton = document.getElementById("play");



function card(value, name, suit) {
    this.value = value;
    this.name = name;
    this.suit = suit;
}

function deck() {
    this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
    var cards = [];

    for (var s = 0; s < this.suits.length; s++) {
        for (var n = 0; n < this.names.length; n++) {
            cards.push(new card(n + 1, this.names[n], this.suits[s]));
        }
    }

    return cards;
}

