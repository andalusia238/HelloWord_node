const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_recipe_ingredient_xref_table_sql = "DELETE FROM recipe_ingredient_xref;"

db.execute(delete_recipe_ingredient_xref_table_sql);


const insert_recipe_ingredient_xref_sql = `
    INSERT INTO recipe_ingredient_xref 
        (recipe_id, ingredient_id) 
    VALUES 
        (?, ?);
        `
        
db.execute(insert_recipe_ingredient_xref_sql, ['1', '1']);
db.execute(insert_recipe_ingredient_xref_sql, ['1', '2']);
db.execute(insert_recipe_ingredient_xref_sql, ['1', '3']);
db.execute(insert_recipe_ingredient_xref_sql, ['1', '4']);
db.execute(insert_recipe_ingredient_xref_sql, ['1', '5']);
db.execute(insert_recipe_ingredient_xref_sql, ['1', '6']);
db.execute(insert_recipe_ingredient_xref_sql, ['1', '7']);
db.execute(insert_recipe_ingredient_xref_sql, ['2', '1']);
db.execute(insert_recipe_ingredient_xref_sql, ['2', '2']);
db.execute(insert_recipe_ingredient_xref_sql, ['2', '3']);
db.execute(insert_recipe_ingredient_xref_sql, ['2', '6']);
db.execute(insert_recipe_ingredient_xref_sql, ['2', '7']);
db.execute(insert_recipe_ingredient_xref_sql, ['2', '8']);
db.execute(insert_recipe_ingredient_xref_sql, ['2', '9']);
db.execute(insert_recipe_ingredient_xref_sql, ['2', '10']);
db.execute(insert_recipe_ingredient_xref_sql, ['2', '11']);
db.execute(insert_recipe_ingredient_xref_sql, ['3', '3']);
db.execute(insert_recipe_ingredient_xref_sql, ['3', '15']);
db.execute(insert_recipe_ingredient_xref_sql, ['3', '16']);
db.execute(insert_recipe_ingredient_xref_sql, ['3', '17']);
db.execute(insert_recipe_ingredient_xref_sql, ['4', '1']);
db.execute(insert_recipe_ingredient_xref_sql, ['4', '4']);

db.end();