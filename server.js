const express = require('express')
const app = express()
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

require('./controllers/burgers_controller')(app);


app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)
});