const orm = require('../config/orm');

const burger = {
    all: function (cb) {

        orm.selectAll('burgers', function (res) {
            cb(res)
        })
    },
    create: function (table, col, vals, cb) {

        orm.checkIfExists(table, col, vals, function (burgerExists) {
            if (burgerExists) return cb({ burgerExists: true })
            else orm.insertOne(table, col, vals, function (err, result) {
                if (err) throw err
                cb({ burgerExists: false })
            })
        })
    },
    update: function (table, col, newValue, searchKey, key, cb) {

        orm.checkHowMany(table, col, newValue, function (res) {
            if (res.length < 4) {
                orm.updateOne(table, col, newValue, searchKey, key, function (res) {
                    cb(res)
                });
            } else cb({ tooManyBurgers: true })
        })
    },
    delete: function (table, condition, cb) {
        
        orm.deleteOne(table, condition, function (result) {
            cb(result)
        })
    }
};

module.exports = burger

