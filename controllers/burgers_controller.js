const express = require('express');             //dependencies being loaded.
const router = express.Router();
const burger = require('../models/burger.js');



router.get('/', (req, res) => {
    burger.all(function (data) {

        res.render('index', data)
    })
    // orm.selectAll('burgers', data => {          //when a get request is made on the root orm.selectAll runs and renders the results through the handlebars template, index
    //     res.render('index', data)
    // })
})

router.post('/api/new-burger', (req, res) => {                   //when a post request is made...
    const newBurger = req.body.newBurger

    burger.create('burgers', 'burger_name', newBurger, burgerExists => {
        res.json(burgerExists)
    })
})

router.put('/api/devour-burger/:id', (req, res) => {
    const id = req.params.id;

    burger.update('burgers', 'devoured', true, 'id', id, function(result){
        res.json(result.changedRows)
    })
    // orm.updateOne('burgers', 'devoured', true, 'id', id, (result) => {
    //     res.json(result.changedRows)
    // })
})

module.exports = router



