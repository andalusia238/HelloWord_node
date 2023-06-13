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


//TESTING FOR COOKING WEB
// define a route for the default home page
app.get( "/cookingweb", ( req, res ) => {
    res.render('CW_index.ejs');
});

app.post( "/search", ( req, res) => {
    const ingredients = [];
    for (let i=1; i<=5; i++) {
        const ingredient = req.body[`ingredient${i}`];
        if (ingredient) {
            ingredients.push(ingredient)
        }
    }


// my sql query
// getting the number of items in the array
const ingredientNum = ingredients.length;
const ingredientList = ingredients.map(() => '?').join(',');
const search_database_for_ingredients_sql = `
SELECT recipe.recipe_name
FROM recipe
JOIN recipe_ingredient_xref
    ON recipe.recipe_id = recipe_ingredient_xref.recipe_id
JOIN ingredient
    ON recipe_ingredient_xref.ingredient_id = ingredient.ingredient_id
WHERE ingredient_name IN (${ingredientList})
GROUP BY recipe.recipe_id, recipe.recipe_name
HAVING COUNT(DISTINCT ingredient_name) = ?
LIMIT 20
`
const finalArray = ingredients.concat(ingredientNum);
//const params = [...ingredients, ingredientNum];

db.execute(search_database_for_ingredients_sql, finalArray, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            //let data = {searchresult : results };
            //res.render('CW_results', data);
            res.render('CW_results.ejs', { results });
        }
    });
});

// define a route for the default home page
//app.get( "/cookingweb/results", ( req, res ) => {
//    res.render('CW_results.ejs');
//});