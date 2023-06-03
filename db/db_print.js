const db = require("./db_connection");

/**** Read the assignments table, joined with subjects table ****/


const select_costume_sql = `
SELECT *
FROM costume
`;

db.execute(select_costume_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'costume' contents:")
        console.log(results);
    }
);

db.end();