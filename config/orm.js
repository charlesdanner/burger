const connection = require('./connection.js');

const orm = {
    selectAll: (tableInput) => {
        let queryString = "Select * FROM ??";
        let data;
        connection.query(queryString, [tableInput], (err, result) => {
            if(err) throw err;
            return (result);
        })
    }
};

module.exports = orm;