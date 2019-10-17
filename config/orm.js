const connection = require('./connection.js');

const orm = {
    selectAll: (tableInput, callback) => {
        let queryString = "Select * FROM ??";
        connection.query(queryString, [tableInput], (err, result) => {
            if (err) throw err;
            const data = { notDevoured: [], devoured: [] }
            result.filter(element => {
                element.devoured ? data.devoured.push(element) : data.notDevoured.push(element);
            });
            callback(data);
        })
    },
    createNew: (table, column, item, cb) => {
        let queryString = "INSERT INTO ?? (??) VALUES (?)"
        connection.query(queryString, [table, column, item], (err, result) => {
            if(err) throw err;
            cb()


        })
    },
    checkIfExists: (table, item, cb) => {
        let queryString = 'Select * FROM ??';
        connection.query(queryString, [table], (err, result) => {
            if(err) throw err;
            const filter = result.filter(burgers => burgers.burger_name === item);
            cb(filter);
        })
    }
};
module.exports = orm;