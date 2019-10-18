const express = require('express')
const app = express()                               //server dependencies
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;              //PORT 3000 for development, process.env.PORT for when deployed to a website like heroku

app.use(express.urlencoded({extended: true}));
app.use(express.json());                        //express parsing the req.body
app.use(express.static('public'));              //setting the context route to the public folder, so the client has access to its contents

app.engine('handlebars', exphbs({defaultLayout: 'main'}));      //setting 'main' as the default layout for handlebars
app.set('view engine', 'handlebars');                           //setting handlebars as the view engine for the site

require('./controllers/burgers_controller')(app);       //requiring the routing information from burgers_controller.js


app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)           //port listening 
});