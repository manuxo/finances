/*
    Add create statements here
    dbms: PostgreSQL
*/

CREATE TABLE users(
    id serial primary key,
    email varchar(100) not null,
    password varchar(100) not null,
    business_name varchar(100) not null,
    ruc varchar(50) not null,
    phone_number varchar(50) not null,
    created_at_date date default current_date not null,
	created_at_time time default current_time not null
);

CREATE TABLE preferencias(
    id serial primary key,
    prima numeric(3,2) not null default 100.00
    estructuracion numeric(3,2) not null default 100.00
    colocacion numeric(3,2) not null default 100.00
    flotacion numeric(3,2) not null default 100.00
    cavali numeric(3,2) not null default 100.00
    tipo_tasa numeric(3,2) not null default 'NOMINAL'
);

CREATE TABLE bonos(
    id serial primary key,
    created_at date default current_date not null
);

/*FOREIGN KEYS*/

ALTER TABLE preferencias ADD id_user int not null;
ALTER TABLE preferencias ADD CONSTRAINT FK_user
FOREIGN KEY(id_user) REFERENCES users(id);

ALTER TABLE bonos ADD id_emisor int not null;
ALTER TABLE bonos ADD CONSTRAINT FK_emisor
FOREIGN KEY(id_emisor) REFERENCES users(id);

ALTER TABLE bonos ADD id_bonista int;
ALTER TABLE bonos ADD CONSTRAINT FK_bonista
FOREIGN KEY(id_bonista) REFERENCES users(id);
