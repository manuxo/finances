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
                res.status(400).send({error:'Error al enviar correo.'})
                return;
            }
            res.status(200).send({success:'Correo enviado.'});
        });
    }
});
