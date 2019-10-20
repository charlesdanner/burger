const orm = require('../config/orm');

const burger = {
    all: function(cb){
        orm.selectAll('burgers', function(res) {
            cb(res)
        })
    },
    create: function(col, vals, cb) {
        orm.insertOne('burgers', col, vals, function(res){
            cb(res)
        })
    },
    update: function(objColVals, condition, cb) {
        orm.updateOne('burgers', objColVals, condition, function(res){
            cb(res)
        });
    }
};

module.exports = burger

