//Dependencies
const express =require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const expressSession = require('express-session');

//Init App

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || 'localhost';
const app = express();

//Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

//Public
app.use(express.static(path.join(__dirname,'dist'))); //img,data
app.use(express.static(path.join(__dirname,'dist','finances')));

app.use(expressSession({
    secret: "Alpha3000$1997m12a25e",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 }
}));

app.get('/session', (req,res) => {
    res.send(req.session);
});

//Routes

//Serve index.html

app.get('*',(req,res,next) => {
    res.sendFile(path.join(__dirname,'dist','clothes-app/index.html'));
});

//Error handling

app.use((err,req,res,next) => {
    if(err.status)
        res.status(err.status).send(err.message);
    else
        res.status(500).send();
});

const server = app.listen(PORT, IP, () => {
    console.log(`Server is running on http://${IP}:${PORT}`);
});