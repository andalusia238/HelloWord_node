const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

// const delete_order_table_sql = "DELETE FROM order;"

// db.execute(delete_order_table_sql);

// const delete_tokens_table_sql = "DELETE FROM tokens;"

// db.execute(delete_tokens_table_sql);

// const delete_costume_table_sql = "DELETE FROM costume;"

// db.execute(delete_costume_table_sql);

// const delete_user_table_sql = "DELETE FROM user;"

// db.execute(delete_user_table_sql);

const delete_school_table_sql = "DELETE FROM school;"

db.execute(delete_school_table_sql);


const insert_school_sql = `
    INSERT INTO school 
        (name, address_1, address_2, city, state, zip, phone) 
    VALUES 
        (?, ?, ?, ?, ?, ?, ?);
        `
        
db.execute(insert_school_sql, ['BCA', '200 Hackensack Ave', ' ', 'Hackensack', 'New Jersey', '07601', '201-343-6000']);
db.execute(insert_school_sql, ['Fairmount', '67 Grand Ave', ' ', 'Hackensack', 'New Jersey', '07601', '201-352-6237']);
db.execute(insert_school_sql, ['Our Lady of Mount Carmel', '10 Pine Road', ' ', 'Tenafly', 'New Jersey', '07601', '201-233-7100']);
db.execute(insert_school_sql, ['Jackson Avenue Elementary', '133 Tulip Drive', ' ', 'Hackensack', 'New Jersey', '07601', '551-447-6588']);


db.end();