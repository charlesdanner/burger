const express = require('express');             //dependencies being loaded.
const router = express.Router();
const burger = require('../models/burger.js');



router.get('/', (req, res) => {
    burger.all(function(data){
        const object = {
            burgers: data
        }
        console.log(object)
        res.render('index', object)
    })
    // orm.selectAll('burgers', data => {          //when a get request is made on the root orm.selectAll runs and renders the results through the handlebars template, index
    //     res.render('index', data)
    // })
})

router.post('/api/new-burger', (req, res) => {                   //when a post request is made...
    const newBurger = req.body.newBurger
    orm.checkIfExists('burgers', newBurger, filter => {        //orm.checkIfExists runs to verify if a requested burger already exists within the table
        console.log(filter)
        if (filter.length === 0) {              //if the returned array if empty, the burger does not exist
            orm.insertOne('burgers', 'burger_name', newBurger, () => res.json({ burgerExists: false }))
        } else res.json({ burgerExists: true })              //if burger doesn't exist orm.createNew runs to add a new entry into the table with the client's burger name
    })                                                    //object returned if the burger name isn't already taken
})                                                           //object returned if the burger name is already taken

router.put('/api/devour-burger/:id', (req, res) => {
    const id = req.params.id;
    orm.updateOne('burgers', 'devoured', true, 'id', id, (result) => {
        res.json(result.changedRows)
    })
})

module.exports = router



