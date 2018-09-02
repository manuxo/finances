//Dependencies

const { Pool } = require('pg');

const connectionString = 'postgres://nluklwkgrxtslb:6737c6355a2dbf58dcc9bafc87dc46a0739067648bf4e261002405c8710a5f5c@ec2-107-22-221-60.compute-1.amazonaws.com:5432/drfrnk607urq5';

const pool = new Pool({
    connectionString: connectionString,
    ssl: true
});

module.exports = {
    findAll: callback => {
        if(pool){
            const text = 'SELECT * FROM users';
            pool.query(text)
            .then(res =>{
                callback(res.rows);
            })
            .catch(e => {
                throw e;
            });
        }
    },
    findById: (id,callback) => {
        if(pool){
            const query = {
                text: 'SELECT * FROM users WHERE id=$1',
                values: [toString(id)] 
            };
            pool.query(query)
            .then(res => {
                callback(res.rows[0]);
            })
            .catch(e => {
                throw e;
            });
        }
    },
    findByEmail: (email, callback) => {
        if(pool){
            const query = {
                text: 'SELECT * FROM users WHERE email=$1',
                values: [email]
            };
            pool.query(query)
            .then(res => {
                callback(res.rows);
            })
            .catch(e => {
                throw e;
            });
        }
    },
    save: (userData, callback) => {
        if(pool){
            const {email,password,business_name,ruc,phone_number} = userData;
            const query = {
                text: 'INSERT INTO users(email,password,business_name,ruc,phone_number) VALUES($1,$2,$3,$4,$5)',
                values: [email,password,business_name,ruc,phone_number]
            };
            pool.query(query)
            .then(res => {
                callback(res);
            })
            .catch(e => {
                throw e;
            });
        }
    }
}

