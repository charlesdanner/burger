const connection = require('./connection.js');          //requiring the mysql connection

const orm = {           //orm object containing functions to interact with the database
    selectAll: (tableInput, cb) => {        //function used to select all the files within a table
        const queryString = "Select * FROM ??";
        connection.query(queryString, [tableInput], (err, result) => {
            if (err) throw err;
            const data = { notDevoured: [], devoured: [] }      //object containing arrays with table entries sorted depending on their boolean values in the devoured column that will be acted on inside the callback function
            result.filter(element => element.devoured ? data.devoured.push(element) : data.notDevoured.push(element));  //filter function that sorts the table entries
            cb(data);       //declaring callback function using the sorted tablee entries
        })
    },
    insertOne: (table, column, item, cb) => {   //function used to create a new entry in the table
        const queryString = "INSERT INTO ?? (??) VALUES (?)"
        connection.query(queryString, [table, column, item], (err, result) => {
            if (err) throw err; 
            cb()
        })
    },
    checkIfExists: (table, column, item, cb) => {   //function used to check to see if an incoming post request for a new burger entry already exists within the table
        const queryString = 'Select * FROM ??';
        connection.query(queryString, [table], (err, result) => {
            if (err) throw err;
            let burgerExists;
            const filter = result.filter(burgers => burgers.burger_name === item);      //sorting the table to see if any entries are the same name as the incoming argument (req.params.newBurger in practice)
            filter.length > 0 ? burgerExists = true : burgerExists = false
            cb(burgerExists);     //declared call back function acting on the filter that was populated above
        })
    },
    updateOne: (table, columnToChange, newValue, searchKey, key, cb) => {  //function called during put requests. changes one row's values
        const queryString = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
        connection.query(queryString, [table, columnToChange, newValue, searchKey, key], (err, result) => {
            if(err) throw err;
            cb(result)
        })
    },
    deleteOne: (table, condition, cb ) => {             //function called during a delete request. 
    const queryString  = 'DELETE FROM ?? WHERE id = ?'
    connection.query(queryString, [table, condition], (err, result) => {
        if(err) throw err;
        cb(result)
    })
    },
    checkHowMany: (table, column, value, cb) =>{            //function used to find how many of a row contain a certain value
        const queryString = 'SELECT * FROM ?? WHERE ?? = ?';
        connection.query(queryString, [table, column, value], (err, result) => {
            if(err) throw err
            cb(result)
        })
    }
};
module.exports = orm;