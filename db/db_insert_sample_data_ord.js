const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/


const delete_ord_table_sql = "DELETE FROM ord;"

db.execute(delete_ord_table_sql);


const insert_ord_sql = `
    INSERT INTO ord 
        (teacher, token_id, costume_id, school_id, user_id) 
    VALUES 
        (?, ?, ?, ?, ?);
        `
        
db.execute(insert_ord_sql, ['Ms. Fillebrown', '123', '3', '1', '2']);

db.end();