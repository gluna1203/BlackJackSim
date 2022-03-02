const hitButton = document.getElementById('hit');
const dealButton = document.getElementById('deal');
const playbutton = document.getElementById('play');



function card(value, name, suit) {
    this.value = value;
    this.name = name;
    this.suit = suit;
}

function deck() {
    this.names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
    var cards = [];

    for (var s = 0; s < this.suits.length; s++) {
        for (var n = 0; n < this.names.length; n++) {
            cards.push(new card(n + 1, this.names[n], this.suits[s]));
        }
    }

    return cards;
}

function calculateHandValue(Array){
    var TPV = 0;
    var hasAce = 1;
    for (var i = 0;i<Array.length;i++){
        if(Array[i].name.includes("2")){
            TPV = TPV + 2;
        }
        if(Array[i].name.includes("3")){
            TPV = TPV + 3;
        }
        if(Array[i].name.includes("4")){
            TPV = TPV + 4;
        }
        if(Array[i].name.includes("5")){
            TPV = TPV + 5;
        }
        if(Array[i].name.includes("6")){
            TPV = TPV + 6;
        }
        if(Array[i].name.includes("7")){
            TPV = TPV + 7;
        }
        if(Array[i].name.includes("8")){
            TPV = TPV + 8;
        }
        if(Array[i].name.includes("9")){
            TPV = TPV + 9;
        }
        if(Array[i].name.includes("10")){
            TPV = TPV + 10;
        }
        if(Array[i].name.includes("J")){
            TPV = TPV + 10;
            hasAce++;
        }
        if(Array[i].name.includes("Q")){
            TPV = TPV + 10;
            hasAce++;
        }  
        if(Array[i].name.includes("K")){
            TPV = TPV + 10;
            hasAce++;
        } 
        if(Array[i].name.includes("A")){
            TPV = TPV + 11;
            hasAce++;
        } 
    }
    for(var i = 0; i<hasAce; i++){
        if(TPV > 21){
            TPV -= 10;
        }
    }
    return TPV;
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

//var DealerPoints = calculateHandValue(dealerHand);

//var PlayerPoints = calculateHandValue(playerHand);

const handleClick = evt => {
    //console.log(evt.target.id);
    switch(evt.target.id){
        case 'deal':
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
            console.log("Player: " + calculateHandValue(playerHand))
            console.log("Dealer: " + calculateHandValue(dealerHand))
            break;
        case 'hit':
            var cardPlayed = Math.floor(Math.random() * (deckHand.length + 1));
            playerHand.push(deckHand[cardPlayed])
            deckHand.pop(cardPlayed)
            console.log(calculateHandValue(playerHand))
            console.log(playerHand)
            break;
        case 'play':
            if (calculateHandValue(dealerHand) < 10){
                var cardPlayed = Math.floor(Math.random() * (deckHand.length + 1));
                dealerHand.push(deckHand[cardPlayed])
                deckHand.pop(cardPlayed)
            }

            if(calculateHandValue(playerHand) == 21){
                PlayerWon();
                break;
            } else if(calculateHandValue(playerHand) > 21){
                DealerHand();
                break;
            }

            if(calculateHandValue(dealerHand) == 21){
                DealerWon();
                break;
            }else if(calculateHandValue(dealerHand) > 21){
                PlayerWon();
                break;
            }
            break;
    }
}

hitButton.addEventListener("click", handleClick);

dealButton.addEventListener("click", handleClick);

playbutton.addEventListener("click", handleClick);