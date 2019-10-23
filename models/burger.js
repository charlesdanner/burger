const orm = require('../config/orm');  //OBJECT RELATIONAL MAPPING (what messes with the database on our behalf)

const burger = {

    all: function (cb) {
        orm.selectAll('burgers', function (res) {       //selects all burgers for a get request
            cb(res)             //call back function returns the burgers
        })
    },

    create: function (table, col, vals, cb) {       //creates a new row in the table (new burger)
        orm.checkIfExists(table, col, vals, function (burgerExists) {   //checks to make sure that burger doesn't already exist
            if (burgerExists) return cb({ burgerExists: true }) //if it exists return the object stating it exists
            else orm.insertOne(table, col, vals, function (err, result) {   //if it doesn't exist call the ORM to add the row
                if (err) throw err
                cb({ burgerExists: false })     //send back an object saying the burger did not exist
            })
        })
    },

    update: function (table, col, newValue, searchKey, key, cb) { //function called when a burger is devoured (put request)
        orm.checkHowMany(table, col, newValue, function (res) {     //checks to see how many are staged for throwing away first
            if (res.length < 4) {                                       //if there 3 or less with the devoured column value set to true it calls the function
                orm.updateOne(table, col, newValue, searchKey, key, function (res) {        //updates the burger at the id sent in the req.body to true
                    cb(res)     //sends the result back to the client
                });
            } else cb({ tooManyBurgers: true })     //if too many burgers have been eaten before trash taken out, send this object back to client
        })
    },

    delete: function (table, condition, cb) {  //function called when a user trashes a burger 
        orm.deleteOne(table, condition, function (result) {         //orm is called to delete the row at the index sent in the req.body
            cb(result)
        })
    }
};

module.exports = burger

