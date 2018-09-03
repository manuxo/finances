//Dependencies
const express = require('express');
const userRepo = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Exports router

let userRouter = express.Router();

userRouter.get('/', (req,res) => {
    if(req.query.email) {
        userRepo.findByEmail(req.query.email, user => res.send(user));
    } else {
        userRepo.findAll(users => res.send(users));
    }
});

userRouter.post('/signup', (req,res) => {
    userRepo.findByEmail(req.body.email, rows => {
        if (rows.length >= 1)
            return res.status(409).send({message: 'User already exists!'});
        else {
            bcrypt.hash(req.body.password, 10, (err,hash) => {
                if(err)
                    return res.status(500).send({error: err});
                else {
                    const userData = {
                        email: req.body.email,
                        password: hash,
                        business_name: req.body.business_name,
                        ruc: req.body.ruc,
                        phone_number: req.body.phone_number
                    };
                    userRepo.save(userData, result => {
                        res.status(201).send(result);
                    });
                }
            });
        }
    });
});

userRouter.post('/login', (req,res,next) => {
    userRepo.findByEmail(req.body.email, rows => {
        if(rows.length < 1)
            return res.status(401).send({message: 'User not found.'});
        bcrypt.compare(req.body.password, rows[0].password, (err,result) => {
            if(err)
                return res.status(401).send({message: 'Invalid password'});
            if(result){
                const payload = {
                    uid: rows[0].id,
                    email: rows[0].email,
                    business_name: rows[0].business_name,
                    ruc: rows[0].ruc,
                    phone_number: rows[0].phone_number
                };
                //Create token
                const token = jwt.sign(
                    payload,
                    'UPC2018-Finanzas$$$$',
                    {
                        expiresIn: '1h'
                    }
                );
                return res.status(200).send({
                    message: 'Auth successful',
                    userData: payload,
                    token: token
                });
            }
            return res.status(401).send({message:'Auth failed'});
        });
    })
});

userRouter.get('/:id', (req,res) => {
    userRepo.findById(req.params.id, user => res.send(user));
});

module.exports = userRouter;