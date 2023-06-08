// set up the server
const DEBUG = true;
const express = require("express" );
const app = express()
const logger = require("morgan");
const port = 3000;

//start the server
app.listen(port, () => {
    console.log("App server listening on ${port}");
});

// use morgan module for logging
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index.html" );
} );

// define a route for the costume list page
app.get( "/costume_list", ( req, res ) => {
    res.sendFile( __dirname + "/views/costume_list.html" );
} );

//define a route for the costume detail page
app.get( "/detail", ( req, res ) => {
    res.sendFile( __dirname + "/views/detail.html" );
} );

// define a route for the assignment detail page
// app.get("/assignments/details", (req, res) => {
//     res.send("<h1>This is the assignment detail page.</h1>");
// })