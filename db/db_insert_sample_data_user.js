const db = require("./db_connection");

const delete_user_table_sql = "DELETE FROM user;"

db.execute(delete_user_table_sql);

const insert_user_sql = `
    INSERT INTO user 
        (f_name, l_name, email, phone, password, admin, role, school_id) 
    VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?);
        `

db.execute(insert_user_sql, ['Anya', 'Gupta', 'anygup26@bergen.org', '201-338-4444', 'letmein', '0', ' ', '1']);
db.execute(insert_user_sql, ['Ivy', 'Wang', 'ivywan@bergen.org', '551-777-8989', 'password', '1', 'teacher', '2']);
db.execute(insert_user_sql, ['Bob', 'Smith', 'bobie23@gmail.com', '201-768-9003', 'costumes11', '0', ' ', '3']);
db.execute(insert_user_sql, ['Sally', 'Anderson', 'sallyanderson@gmail.com', '551-651-9984', 'halloween!!', '1', 'principal', '4']);

db.end();