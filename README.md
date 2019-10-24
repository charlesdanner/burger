# Eat Da Burger

## Description

This is a simple app that allows clients to input the name of a burger into the text area, hit submit and have the burger appear on the left side of the screen inside a box. Under the name of the burger is a button that allows the client to "devour" it. This moves the box from one side of the screen to the other. While this is a simple solution, a lot of work is happening under the hood. This application utilizes Express.js as the server and is REST compliant. REST simply means that there are a number of different constraints put on the application in order to make it more robust, easily scalable, easily amendable and allows for clients to interact, if in a limited manner, to the database that is storing the information necessary for the application to function.

## Prerequisites

In order to use the code for Eat Da Burger, you will need a working database of some sort. I created a MySQL database for storing the different burgers and have different methods calling the MySQL database depending on the different HTTP verbs and URI endpoints being sent to the server. The Node Modules Express and Express-Handlebars are absolutely vital for the functionality of the application. Express is the server that is running and Express-Handlebars is the HTML template engine that is being used to render the HTML onto the page dynamically.

## Under The Hood

Express.js is doing the majority of the heavy lifting in this application. Express is receiving different HTTP requests from the client, going to what is called the 'controller' which determines what action needs to be taken based on the different HTTP request made, the controller then decides which model needs to be used as the response. The model accesses the database using a custom ORM (Object Relational Mapping) that takes the user input and the HTTP request that was given and returns or alters the specific indexes needed that the client is requesting be returned or altered. The ORM then sends the parsed data back to the controller via a javascript callback function, and the view is rendered based on the information the model has been built with and is sent back to the client. The information that is being returned from the server is being plugged into the express-handlebars template engine and is then being sent back to the client as a response to their original request. This chain of logic is what is referred to as the MVC or Model View Controller paradigm. When the client receives the data, front end javascript takes care of the rest of the user's experience.

A basic GET request happens every time a user loads a page, but a POST request is made whenever the client presses the submit button to make a new burger. The client sends a request to the server and inside the body of the request is the name of the burger. The ORM controller will actually parse the table that the burgers are being stored in to see if a burger with that name already exists. If it exists, then the burger will not be able to be made. If it does exist, then the function needed to insert a new row in the table will fire off. Whether a row in the table is made or not, the client will receive a response. The response will be an object with only one property. That property will tell the client if the name they input is valid or not. If it is not, an error message will appear on the DOM telling the user that the name they submitted has already been used. If the burger was successfully made, then the client will know that the page needs to be reloaded. When the page reloads another GET request is made to the server, the entire aparatus fires off, and the DOM is populated with the model that is constructed by the controller for the view to show.

When a user presses the 'Devour It' button a PUT request is made to the server. This request is similar in nature to a POST request, but instead of creating an entirely new row in the table, it is used to specifically alter the contents of one index in a specific row of the table. For example, if the client has a burger called Cheeseburger and presses the 'Devour It' button, the client will fire the HTTP request to the server, the server will populate the ORM request to the database, and the database will change the boolean value in the column called 'devoured' from false to true. It will then send to the browser the number of affected rows that the request altered. If the request is more than one, as it always should be, the page will be reloaded. The reason that this request should always work is because the ID given to the button is the value of that specific burger's primary key value in the table. Every row in the has a unique id, and that is what is being referred to and sent inside the request body of the PUT request.

### Built With

* Node
* Express.js
* Express-Handlebars
* Axios
* JavaScript
* CSS
* HTML

### Authors

Charles Danner - https://github.com/charlesdanner

### Link

https://stark-chamber-78584.herokuapp.com/
