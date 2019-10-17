const connection = require('./connection.js');

const orm = {
    selectAll: (tableInput, callback) => {
        let queryString = "Select * FROM ??";
        connection.query(queryString, [tableInput], (err, result) => {
            if(err) throw err;
            const data = {notDevoured: [], devoured: []}
            result.filter(element => {
                element.devoured ? data.devoured.push(element) : data.notDevoured.push(element);
            });
            callback(data);
        })
    }
};
module.exports = orm;