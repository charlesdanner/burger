const express = require('express');             //dependencies being loaded.
const router = express.Router();
const burger = require('../models/burger.js');

router.get('/', (req, res) => {     //get request made whenever the home page is loaded
    burger.all(data => {    //model is formed via the burger method 
        res.render('index', data)           //handlebars renders model in the index page
    })
})

router.post('/api/new-burger', (req, res) => {               //post request made whenever a new burger is submitted
    const newBurger = req.body.newBurger
    burger.create('burgers', 'burger_name', newBurger, burgerExists => {
        res.json(burgerExists)              //sends information stating whether the burger exists or not in the database
    })
})

router.put('/api/devour-burger/:id', (req, res) => {        //put request made whenever a burger is being devoured
    const id = req.params.id;
    burger.update('burgers', 'devoured', true, 'id', id, result =>{
        res.json(result)                                    //sends whether the update was successful or not. This is because only so many can be up at a time
    })
})

router.delete('/api/delete-burger/:id', (req, res) =>{      //delete request made whenever a client tries to throw a burger in the trash
    const id = req.params.id;
    burger.delete('burgers', id, result =>{
        res.json(result)                        //responds with the result of the query
    })
})

module.exports = router



