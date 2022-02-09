const express = require('express');
const pug = require('pug');
const path = require('path');
const expressSession = require('express-session');
const routes = require('./routes/routes.js');
const port = process.env.PORT || 3000;


const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + "/views");
app.use(express.static(path.join(__dirname, '/public')));

app.use(expressSession({
    secret: 'wh4t3v3r',
    saveUninitialized: true,
    resave: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
});

const urlencodedParser = express.urlencoded({
    extended: false
})

const checkAuth = (req, res, next) => {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
}

app.get("/", routes.login);
app.post("/", urlencodedParser, routes.loginAuth);

//app.get("/create", routes.create)
app.post("/create", urlencodedParser, routes.create);
app.post("/createUser", urlencodedParser, routes.createUser);

//app.get('/edit/:id',checkAuth, routes.edit);
app.post('/edit/:id',checkAuth, urlencodedParser, routes.edit);

app.post('/editUser/:id', urlencodedParser, routes.editUser)

app.post("/logout", urlencodedParser, routes.logout)

app.get("/home/:id", checkAuth, routes.home);

app.listen(port);