const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs');

//coust url =

exports.login = (req, res) => {
    res.render('login')
}