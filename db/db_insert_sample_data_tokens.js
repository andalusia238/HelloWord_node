const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

 const delete_tokens_table_sql = "DELETE FROM tokens;"

db.execute(delete_tokens_table_sql);

const insert_tokens_sql = `
    INSERT INTO tokens 
        (token_id, user_id) 
    VALUES 
        (?, ?);
        `
        
db.execute(insert_tokens_sql, ['123', '1']);
db.execute(insert_tokens_sql, ['456', '2']);
db.execute(insert_tokens_sql, ['789', '3']);
db.execute(insert_tokens_sql, ['101', '4']);


db.end();