const hitButton = document.getElementById('hit');
const dealButton = document.getElementById('deal');
const playbutton = document.getElementById('play');



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


const shuffleArr = myArr => {
    let a, b;
    for (let i = 0; i < myArr.length - 1; i++){
        rand = Math.floor(Math.random() * myArr.length);
        a = myArr[i];
        b = myArr[rand];
        myArr[i] = b;
        myArr[rand] = a;
    }
    return myArr;
};

var playerHand = [];
var dealerHand = [];
var deckHand = shuffleArr(deck());

const handleClick = evt => {
    //console.log(evt.target.id);
    switch(evt.target.id){
        case 'deal':
            console.log('Someone has clicked Button deal!');
            
            var cardOne= Math.floor(Math.random() * (deckHand.length + 1));
            dealerHand.push(deckHand[cardOne]);
            deckHand.pop(cardOne);

            var cardTwo= Math.floor(Math.random() * (deckHand.length + 1));
            dealerHand.push(deckHand[cardTwo]);
            deckHand.pop(cardTwo);

            var cardThree = Math.floor(Math.random() * (deckHand.length + 1));
            playerHand.push(deckHand[cardThree]);
            deckHand.pop(cardThree);

            var cardFour = Math.floor(Math.random() * (deckHand.length + 1));
            playerHand.push(deckHand[cardFour]);
            deckHand.pop(cardFour);

            console.log(deckHand)
            console.log(playerHand)
            console.log(dealerHand)
            break;
        case 'hit':
            console.log('Someone has clicked Button hit!')
            var cardPlayed = Math.floor(Math.random() * (deckHand.length + 1));
            playerHand.push(deckHand[cardPlayed])
            deckHand.pop(cardPlayed)
            console.log(playerHand)
            break;
        case 'play':
            console.log('Someone has clicked Button play!')
            break;
    }
}

hitButton.addEventListener("click", handleClick);

dealButton.addEventListener("click", handleClick);

playbutton.addEventListener("click", handleClick);