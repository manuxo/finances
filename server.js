//Dependencies
const http = require('http');
const express =require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

//Init App

const PORT = process.env.PORT || 3000;
const app = express();
app.set('port',PORT);

//Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

//Public
app.use(express.static(path.join(__dirname,'dist'))); //img,data
app.use(express.static(path.join(__dirname,'dist','finances')));


//Routes

const userRouter = require('./server/routes/user-router');


app.use('/api/users', userRouter);

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