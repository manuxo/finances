/*
    Add create statements here
    dbms: PostgreSQL
*/

CREATE TABLE users(
    id serial primary key,
    email varchar(100) not null,
    password varchar(50) not null,
    business_name varchar(100) not null,
    ruc varchar(50) not null,
    phone_number varchar(50) not null,
    created_at timestamp not null
);