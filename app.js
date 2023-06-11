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
// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use( express.urlencoded({ extended: false }) );

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


// define a route for costume DELETE
// YOU CAN ONLY DELETE COSTUME ID's 1,2,&4.  COSTUME ID 3 WHICH IS THE WITCH IS CONNECTED TO A SAMPLE ORDER
// CAN I RUN 2 QUERIES INSIDE HERE?  FIRST TO DELETE ANY ORDER ATTACHED TO A COSTUME AND THEN SECOND TO DELETE THE COSTUME RECORD?
const delete_costume_sql = `
    DELETE 
    FROM
        costume
    WHERE
        costume_id = ?

`

app.get("/:id/delete", ( req, res ) => {
    db.execute(delete_costume_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/costume_list");
        }
    });
});

// define a route for costume CREATE
// NOTE HAD TO PRESET USER ID = 1 BECAUSE COSTUMES WILL NORMALLY BE CONNECTED TO A USER, BUT I HAVE NOT COMPLETE THAT PART OF THE WEB APP YET
// HOW TO UPLOAD AN IMAGE - I AM ABLE TO STORE THE FILE NAME IN THE DB, BUT HOW TO GET THE IMAGE UPLOADED
const create_costume_sql = `
    INSERT INTO costume 
        (name, size, description, image, user_id) 
    VALUES 
        (?, ?, ?, ?, 1);
`
app.post("/costume_list", ( req, res ) => {
    db.execute(create_costume_sql, [req.body.name, req.body.size, req.body.description, req.body.image], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/costume_list`);
        }
    });
});

// define a route for assignment UPDATE
const update_costume_sql = `
    UPDATE
        costume
    SET
        name = ?,
        size = ?,
        description = ?,
        image = ?
    WHERE
        costume_id = ?
`
app.post("/:id", ( req, res ) => {
    db.execute(update_costume_sql, [req.body.name, req.body.size, req.body.description, req.body.image, req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/${req.params.id}`);
        }
    });
});
