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

    })
}

