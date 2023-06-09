// set up the server
const DEBUG = true;
const db = require('./db/db_connection');
const express = require("express" );
const app = express()
const logger = require("morgan");
const port = 3000;

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

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
    res.render('index');
});

// define a route for the costume list page
const read_costume_list_all_sql = `
    SELECT 
        costume_id, name, size, image 
    FROM costume
    ORDER BY name
`
app.get( "/costume_list", ( req, res ) => {
    db.execute(read_costume_list_all_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = {costumeList : results };
            res.render('costume_list', data);
        }
    });
});

//route to send back static html page
// app.get( "/costume_list", ( req, res ) => {
//     res.sendFile( __dirname + "/views/costume_list.html" );
// } );


// define a route for the costume detail page
const read_costume_detail_sql = `
    SELECT
        costume_id, name, size, image, description
    FROM costume
    WHERE costume_id = ?
`
app.get( "/:id", ( req, res ) => {
    db.execute(read_costume_detail_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.status(404).send(`No costume id found with id = "${req.params.id}"` ); // NOT FOUND
        else {
            let data = {costume: results[0]};
            res.render('detail', data); 
        }
            
    });
});


//define a route for the costume detail page -> OLDD!!!
// app.get( "/detail", ( req, res ) => {
//     res.sendFile( __dirname + "/views/detail.html" );
// } );

// define a route for the assignment detail page
// app.get("/assignments/details", (req, res) => {
//     res.send("<h1>This is the assignment detail page.</h1>");
// })