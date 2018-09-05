//Dependencies
const http = require('http');
const express =require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mailer = require('express-mailer');

//Init App

const PORT = process.env.PORT || 3000;
const app = express();
app.set('port',PORT);
mailer.extend(app, {
    from: 'finance.leasing.app@gmail.com',
    host: 'smtp.gmail.com',
    secureConnection: true,
    port: 465,
    transportMethod: 'SMTP',
    auth: {
      user: 'finance.leasing.app@gmail.com',
      pass: 'leasingapp123'
    }
});

//View engine for express-mailer
app.set('views',path.join(__dirname,'server','views'));
app.set('view engine', 'pug');

//Config - CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

//Public
app.use(express.static(path.join(__dirname,'dist'))); //img,data
app.use(express.static(path.join(__dirname,'dist','finances')));


//Routes

const userRouter = require('./server/routes/user-router');
const emailRouter = require('./server/routes/email-router');


app.use('/api/users', userRouter);
app.use('/api/email', emailRouter);

//Serve index.html

app.get('*',(req,res,next) => {
    res.sendFile(path.join(__dirname,'dist','finances/index.html'));
});

//Error handling

app.use((err,req,res,next) => {
    if(err.status)
        res.status(err.status).send(err.message);
    else
        res.status(500).send();
});



const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})