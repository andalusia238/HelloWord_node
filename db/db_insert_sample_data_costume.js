const db = require("./db_connection");

const delete_costume_table_sql = "DELETE FROM costume;"

db.execute(delete_costume_table_sql);

const insert_costume_sql = `
    INSERT INTO costume 
        (name, description, size, image, user_id) 
    VALUES 
        (?, ?, ?, ?, ?);
        `

db.execute(insert_costume_sql, ['batman', 'amazing batman costume, in perfect condition', 'S', 'batman.jpg', '1']);
db.execute(insert_costume_sql, ['pikachu', ' ', 'L', ' ', '2']);
db.execute(insert_costume_sql, ['witch', 'good condition, witch costume, worn by my daughter last year', 'XL', 'witch.jpg', '3']);
db.execute(insert_costume_sql, ['bunny', 'nice bunny costume, good condition, only used once a couple years ago', 'M', ' ', '4']);


db.end();