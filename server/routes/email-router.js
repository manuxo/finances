//Dependencies
const express = require('express');
let emailRouter = express.Router();

module.exports = emailRouter;

emailRouter.post('/contact',(req,res) => {
    if(req.body.name && req.body.email && req.body.phone_number && req.body.message){
        res.mailer.send('email-contact',{
            to: "finance.leasing.app@gmail.com",
            subject: `Mensaje de ${req.body.name}`,
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            message: req.body.message
        },(err) => {
            if (err) {
                console.log(err);
                res.send('There was an error sending the email');
                return;
            }
            res.send('Email Sent');
        });
    }
});
