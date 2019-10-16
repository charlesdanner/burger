const express = require('express');
const connection = require('./../config/connection');
const orm = require('./../config/orm');

module.exports = app => {
    const parseDB = () => {
        return orm.selectAll('burgers')
    }

    app.get('/', (req, res) => {

        

        //let result = orm.selectAll("burgers");
        //res.render('index', orm.selectAll("burgers"));




    })

    app.post('/', (req, res) => {

    })
}

