const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_ingredient_table_sql = "DELETE FROM ingredient;"

db.execute(delete_ingredient_table_sql);


const insert_ingredient_sql = `
    INSERT INTO ingredient 
        (ingredient_name) 
    VALUES 
        (?);
        `
        
db.execute(insert_ingredient_sql, ['butter']);
db.execute(insert_ingredient_sql, ['sugar']);
db.execute(insert_ingredient_sql, ['flour']);
db.execute(insert_ingredient_sql, ['eggs']);
db.execute(insert_ingredient_sql, ['chocolate chips']);
db.execute(insert_ingredient_sql, ['vanilla extract']);
db.execute(insert_ingredient_sql, ['baking soda']);
db.execute(insert_ingredient_sql, ['apples']);
db.execute(insert_ingredient_sql, ['cinnamon']);
db.execute(insert_ingredient_sql, ['baking powder']);
db.execute(insert_ingredient_sql, ['nutmeg']);
db.execute(insert_ingredient_sql, ['pie crust']);
db.execute(insert_ingredient_sql, ['milk']);
db.execute(insert_ingredient_sql, ['heavy cream']);
db.execute(insert_ingredient_sql, ['mozzarella cheese']);
db.execute(insert_ingredient_sql, ['tomato sauce']);
db.execute(insert_ingredient_sql, ['yeast']);

db.end();