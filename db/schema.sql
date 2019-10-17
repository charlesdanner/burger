DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers(
    id INT NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(50) NOT NULL,
    devoured BOOLEAN default false,
    PRIMARY KEY (id)
)

INSERT INTO burgers(burger_name, devoured)
            VALUES('bacon burger', false),
                  ('pimento burger', true),
                  ('cheddar cheese burger', false);