const orm = require('../config/orm');

const burger = {
    all: function(cb){
        orm.selectAll('burgers', function(res) {
            cb(res)
        })
    },
    create: function(table, col, vals, cb) {
        orm.checkIfExists(table, col, vals, function(burgerExists){
            console.log(burgerExists)
             if(burgerExists) return cb({ burgerExists: true })
             else orm.insertOne(table, col, vals, function(err, result){
                if(err) console.log(err)
                cb({ burgerExists: false })
             })
        })
        
        // orm.insertOne('burgers', col, vals, function(res){
        //     res ? cb({burgerExists : true}) : cb(res)
        //     cb(res)
        // })
    },
    update: function(objColVals, condition, cb) {
        orm.updateOne('burgers', objColVals, condition, function(res){
            cb(res)
        });
    }
};

module.exports = burger

