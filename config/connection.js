module.exports = mysql => {
    const connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root1",
        database: "burgers_db"
    });
    connection.connect((err) => {
        if (err) return console.error("error connecting: " + err.stack);

        console.log("connected as id " + connection.threadId);
    });
}
