const express = require('express');
const app = express();
const connection = require('./../config/connection');
const orm = require('./../config/orm');


module.exports = app => {

    app.get('/',(req, res) => {
        orm.selectAll('burgers', function(data) {
            res.render('index', data)
        })
    })

    app.post('/', (req, res) => {
        orm.checkIfExists('burgers', `${req.body.newBurger}`, (filter) =>{
            console.log(filter)
            if(filter.length === 0){
                orm.createNew('burgers','burger_name', req.body.newBurger, () =>{
                    res.json({burgerExists: false})
                })
            } else res.json({burgerExists: true})
        })

        


        
    })
}

