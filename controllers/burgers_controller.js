const express = require('express');             //dependencies being loaded.
const app = express();
const orm = require('./../config/orm');


module.exports = app => {

    app.get('/', (req, res) => {
        orm.selectAll('burgers', data => {          //when a get request is made on the root orm.selectAll runs and renders the results through the handlebars template, index
            res.render('index', data)
        })
    })

    app.post('/', (req, res) => {                   //when a post request is made...
        orm.checkIfExists('burgers', `${req.body.newBurger}`, filter => {        //orm.checkIfExists runs to verify if a requested burger already exists within the table
            console.log(filter)
            if (filter.length === 0) {              //if the returned array if empty, the burger does not exist
                orm.createNew('burgers', 'burger_name', req.body.newBurger, () => {     //if burger doesn't exist orm.createNew runs to add a new entry into the table with the client's burger name
                    res.json({ burgerExists: false })       //object returned if the burger name isn't already taken
                })
            } else res.json({ burgerExists: true })         //object returned if the burger name is already taken
        })





    })
}

