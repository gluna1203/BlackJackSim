const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs');

const url = 'mongodb+srv://ADMIN:Neumont@thehubusers.2xiyk.mongodb.net/Userbase?retryWrites=true&w=majority';

const client = new MongoClient(url);
const dbName = 'BlackJackAccounts';
const db = client.db(dbName);

const users = db.collection('Users');

const hashComplete = (password, the_hash) => {
    bcrypt.compare(password, the_hash, (err, res) => {
        console.log('async: ' + res);
    })
}

var suits = ["spades", "clubs", "hearts", "diamonds"];
var values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
var Deck = new Array();


class Card {
    constructor(name) {
      this.name = name;
    }
  }



function createDeck() {
    for (var i = 0; i < values.length; i++){
        for (var j = 0; j < suits.length; j++) {
            Deck.push(new Card(values[i] + " of " + suits[j]))
        }
    }
}

function suffleDeck() {
    for (var i = 0; i < 1000; i++){
        var locus1 = Math.floor(Math.random * Deck.length);
        var locus2 = Math.floor(Math.random * Deck.length);
        var tmp = Deck[locus1];

        Deck[locus1] = Deck[locus2];
        Deck[locus2] = tmp;
    }
}

function playBlackjack() {
    createDeck;
    suffleDeck;
    var PlayerHand = new Array;
    var DealerHand = new Array;

    DealerHand.push(Deck.pop);
    PlayerHand.push(Deck.pop);
    DealerHand.push(Deck.pop);
    PlayerHand.push(Deck.pop);

    //show player their hand and ask if they want another
}

function calculateHandValue(Array){
    var TPV = 0;
    for (var i = 0;i<Array.length;i++){
        if(Array[i].startwWith("2")){
            TPV = TPV + 2;
        }
        if(Array[i].startsWith("3")){
            TPV = TPV + 3;
        }
        if(Array[i].startsWith("4")){
            TPV = TPV + 4;
        }
        if(Array[i].startsWith("5")){
            TPV = TPV + 5;
        }
        if(Array[i].startsWith("6")){
            TPV = TPV + 6;
        }
        if(Array[i].startsWith("7")){
            TPV = TPV + 7;
        }
        if(Array[i].startsWith("8")){
            TPV = TPV + 8;
        }
        if(Array[i].startsWith("9")){
            TPV = TPV + 9;
        }
        if(Array[i].startsWith("10, Jack, Queen, King")){
            TPV = TPV + 10;
        }
        if(Array[i].startsWith("A")){
            TPV = TPV + 11;

        }
        if(TPV < 21){
            while(PlayerHand.Array["A"] == true){
                TPV = TPV - 10;
            }
            
        }

       
    }
}



exports.login = (req, res) => {
    res.render('login')
}

exports.loginAuth = async (req, res) => {
    await client.connect();

    if (req.body.username == '' || req.body.password == '') {
        res.redirect('/');
    } else {
        const filteredDocs = await users.find({ username: req.body.username }).toArray()
        if (bcrypt.compareSync(req.body.password, filteredDocs[0].password)) {
            req.session.user = {
                isAuthenticated: true,
                username: filteredDocs[0].username
            }
            console.log("Username: " + req.body.username)
            res.redirect('/home')
        } else {
            res.redirect('/')
        }
    }
    client.close();
}

exports.create = (req, res) => {
    res.render('create')
}

exports.createUser = async (req, res) => {
    await client.connect();
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    let person = {
        username: req.body.username,
        password: hash
    };

    const insertResult = await users.insertOne(person);
    client.close();
    res.redirect('/');
}

exports.home = async (req, res) => {
    res.render('home')
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/');
        }
    })
}

