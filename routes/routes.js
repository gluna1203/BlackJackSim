const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs');
const { system } = require('nodemon/lib/config');

const url = 'mongodb+srv://ADMIN:Neumont@thehubusers.2xiyk.mongodb.net/Userbase?retryWrites=true&w=majority';

const client = new MongoClient(url);
const dbName = 'BlackJackAccounts';
const db = client.db(dbName);

const users = db.collection('Users');

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
            console.log("Username: " + filteredDocs[0]._id)
            res.redirect('/home/'+ filteredDocs[0]._id)
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
        password: hash,
        wins: 0
    };

    const insertResult = await users.insertOne(person);
    client.close();
    res.redirect('/');
}

exports.edit = async (req, res) => {
    await client.connect();
    const filteredDocs = await users.find(ObjectId(req.params.id)).toArray();
    
    res.render('edit', {
        person: filteredDocs[0]
    });
    client.close();
};

exports.editUser = async (req, res) => {
    await client.connect();
    console.log("made it");
    if (req.body.password == '') {
        const findResult = await users.find({ username: req.body.username }).toArray();
        const updateResult = await users.updateOne(
            { _id: ObjectId(req.params.id) },
            {
                $set: {
                    username: req.body.username,
                    password: findResult[0].password,
                }
            }
        );
    } else {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        const updateResult = await users.updateOne(
            { _id: ObjectId(req.params.id) },
            {
                $set: {
                    username: req.body.username,
                    password: hash,
                }
            }
        );
    }
    const findResult = await users.find({ username: req.body.username }).toArray();
    res.redirect('/home/'+findResult[0]._id);
    client.close();
};

exports.home = async (req, res) => {
    await client.connect();
    const findResult = await users.find({ username: req.session.user.username }).toArray();
    res.render(`home`, { 
        person: findResult[0]
    })
    client.close();
}

exports.game = async (req, res) =>{
    await client.connect();
    const findResult = await users.find({ username: req.session.user.username }).toArray();
    res.render("game", {
        person: findResult[0]
    });
    client.close();
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

