const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs');

const url = 'mongodb+srv://ADMIN:Neumont@thehubusers.2xiyk.mongodb.net/Userbase?retryWrites=true&w=majority';

const client = new MongoClient(url);
const dbName = 'BlackJackAccounts';
const db = client.db(dbName);

const users = db.collection('Users');

exports.login = (req, res) => {
    res.render('login')
}

exports.loginAuth = async (req, res) => {

}

exports.create = (req, res) => {
    res.render('create')
}

exports.createUser = async (req, res) => {
    await client.connect();
    let person = {
        userName: req.body.username,
        password: req.body.password
    };

    const insertResult = await collection.insertOne(person);
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