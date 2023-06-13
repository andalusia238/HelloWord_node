const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_recipe_table_sql = "DELETE FROM recipe;"

db.execute(delete_recipe_table_sql);


const insert_recipe_sql = `
    INSERT INTO recipe 
        (recipe_name) 
    VALUES 
        (?);
        `
        
db.execute(insert_recipe_sql, ['chocolate chip cookies']);
db.execute(insert_recipe_sql, ['apple pie']);
db.execute(insert_recipe_sql, ['pizza']);
db.execute(insert_recipe_sql, ['scrambled eggs']);


db.end();