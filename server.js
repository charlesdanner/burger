const express = require('express')
const app = express()                               //server dependencies

const PORT = process.env.PORT || 3000;              //PORT 3000 for development, process.env.PORT for when deployed to a website like heroku

app.use(express.urlencoded({extended: true}));
app.use(express.json());                        //express parsing the req.body
app.use(express.static('public'));              //setting the context route to the public folder, so the client has access to its contents

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));      //setting 'main' as the default layout for handlebars
app.set('view engine', 'handlebars');                           //setting handlebars as the view engine for the site

const routes = require('./controllers/burgers_controller');       //requiring the routing information from burgers_controller.js

app.use(routes)

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)           //port listening 
});