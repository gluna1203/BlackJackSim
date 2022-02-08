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

exports.edit = async (req, res) => {
    await client.connect();
    const filteredDocs = await users.find(ObjectId(req.params.id)).toArray();
    client.close();
    res.render('edit', {
        person: filteredDocs[0]
    });
};

exports.editUser = async (req, res) => {
    await client.connect();

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
    client.close();
    res.redirect('/');
};

exports.home = (req, res) => {
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