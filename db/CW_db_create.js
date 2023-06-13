const db = require("./db_connection");

/**** Drop existing tables, if any ****/

const drop_recipe_ingredient_xref_table_sql = "DROP TABLE IF EXISTS recipe_ingredient_xref;"

db.execute(drop_recipe_ingredient_xref_table_sql);

const drop_recipe_table_sql = "DROP TABLE IF EXISTS recipe;"

db.execute(drop_recipe_table_sql);

const drop_ingredient_table_sql = "DROP TABLE IF EXISTS ingredient;"

db.execute(drop_ingredient_table_sql);


/**** Create COOKING WEB tables ****/

//creating recipe table
const create_recipe_table_sql = `

CREATE TABLE recipe (
  recipe_id INT NOT NULL AUTO_INCREMENT,
  recipe_name VARCHAR(150) NOT NULL,
  PRIMARY KEY (recipe_id),
  UNIQUE INDEX recipe_id_UNIQUE (recipe_id ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

`
db.execute(create_recipe_table_sql);

const create_ingredient_table_sql = `

CREATE TABLE ingredient (
  ingredient_id INT NOT NULL AUTO_INCREMENT,
  ingredient_name VARCHAR(150) NOT NULL,
  PRIMARY KEY (ingredient_id),
  UNIQUE INDEX ingredient_id_UNIQUE (ingredient_id ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

`
db.execute(create_ingredient_table_sql);

const create_recipe_ingredient_xref_table_sql = `

CREATE TABLE recipe_ingredient_xref (
  recipe_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  INDEX recipe_id_fk_idx (recipe_id ASC),
  INDEX ingredient_id_fk_idx (ingredient_id ASC),
  CONSTRAINT recipe_id_fk
    FOREIGN KEY (recipe_id)
    REFERENCES recipe (recipe_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT ingredient_id_fk
    FOREIGN KEY (ingredient_id)
    REFERENCES ingredient (ingredient_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

`
db.execute(create_recipe_ingredient_xref_table_sql);

/**** Create COSTUME PROJECT tables ****/

// //creating school table
//   const create_school_table_sql = `
//   CREATE TABLE school (
//     school_id INT NOT NULL AUTO_INCREMENT,
//     name VARCHAR(45) NOT NULL,
//     address_1 VARCHAR(45) NOT NULL,
//     address_2 VARCHAR(45) NULL,
//     city VARCHAR(45) NOT NULL,
//     state VARCHAR(45) NOT NULL,
//     zip CHAR(5) NOT NULL,
//     phone VARCHAR(45) NOT NULL,
//     PRIMARY KEY (school_id),
//     UNIQUE INDEX school_id_UNIQUE (school_id ASC))
//   ENGINE = InnoDB
//   DEFAULT CHARACTER SET = latin1
//   COLLATE = latin1_bin;
// `
//   db.execute(create_school_table_sql);

// //creating user table
//     const create_user_table_sql = `
//     CREATE TABLE user (
//         user_id INT NOT NULL AUTO_INCREMENT,
//         f_name VARCHAR(45) NOT NULL,
//         l_name VARCHAR(45) NOT NULL,
//         email VARCHAR(45) NOT NULL,
//         phone VARCHAR(45) NOT NULL,
//         password VARCHAR(45) NOT NULL,
//         admin TINYINT(1) NOT NULL,
//         role VARCHAR(45) NULL,
//         school_id INT NOT NULL,
//         PRIMARY KEY (user_id),
//         UNIQUE INDEX user_id_UNIQUE (user_id ASC),
//         INDEX school_id_fk_idx (school_id ASC),
//         CONSTRAINT school_id_fk
//           FOREIGN KEY (school_id)
//           REFERENCES school (school_id)
//           ON DELETE NO ACTION
//           ON UPDATE NO ACTION)
//       ENGINE = InnoDB
//       DEFAULT CHARACTER SET = latin1
//       COLLATE = latin1_bin;
    
//     `
//     db.execute(create_user_table_sql)

// // create costume table
//     const create_costume_table_sql = `
//     CREATE TABLE costume (
//         costume_id INT NOT NULL AUTO_INCREMENT,
//         name VARCHAR(45) NOT NULL,
//         description LONGTEXT NULL,
//         size VARCHAR(45) NOT NULL,
//         image VARCHAR(45) NULL,
//         user_id INT NOT NULL,
//         PRIMARY KEY (costume_id),
//         UNIQUE INDEX costume_id_UNIQUE (costume_id ASC),
//         INDEX user_id_fk_idx (user_id ASC),
//         CONSTRAINT user_id_fk
//           FOREIGN KEY (user_id)
//           REFERENCES user (user_id)
//           ON DELETE NO ACTION
//           ON UPDATE NO ACTION)
//       ENGINE = InnoDB
//       DEFAULT CHARACTER SET = latin1
//       COLLATE = latin1_bin;
      
//     `
//     db.execute(create_costume_table_sql)

// // create tokens table
//     const create_tokens_table_sql = `
//     CREATE TABLE tokens (
//         token_id INT(10) NOT NULL,
//         user_id INT NOT NULL,
//         PRIMARY KEY (token_id),
//         UNIQUE INDEX token_id_UNIQUE (token_id ASC),
//         INDEX user_id_fk_tokens_idx (user_id ASC),
//         CONSTRAINT user_id_fk_tokens
//           FOREIGN KEY (user_id)
//           REFERENCES user (user_id)
//           ON DELETE NO ACTION
//           ON UPDATE NO ACTION)
//       ENGINE = InnoDB
//       DEFAULT CHARACTER SET = latin1
//       COLLATE = latin1_bin;
      
//     `
//     db.execute(create_tokens_table_sql)

//     //CREATE THE REALLL ORDER TABLE
//     const create_order_table_sql = `
//     CREATE TABLE ord (
//         order_id INT NOT NULL AUTO_INCREMENT,
//         teacher VARCHAR(45) NOT NULL,
//         token_id INT(10) NOT NULL,
//         costume_id INT NOT NULL,
//         school_id INT NOT NULL,
//         user_id INT NOT NULL,
//         PRIMARY KEY (order_id),
//         UNIQUE INDEX order_id_UNIQUE (order_id ASC),
//         INDEX token_id_fk_idx (token_id ASC),
//         INDEX costume_id_fk_idx (costume_id ASC),
//         INDEX user_id_fk_order_idx (user_id ASC),
//         INDEX school_id_fk_order_idx (school_id ASC),
//         CONSTRAINT token_id_fk
//           FOREIGN KEY (token_id)
//           REFERENCES tokens (token_id)
//           ON DELETE NO ACTION
//           ON UPDATE NO ACTION,
//         CONSTRAINT costume_id_fk
//           FOREIGN KEY (costume_id)
//           REFERENCES costume (costume_id)
//           ON DELETE NO ACTION
//           ON UPDATE NO ACTION,
//         CONSTRAINT user_id_fk_order
//           FOREIGN KEY (user_id)
//           REFERENCES user (user_id)
//           ON DELETE NO ACTION
//           ON UPDATE NO ACTION,
//         CONSTRAINT school_id_fk_order
//           FOREIGN KEY (school_id)
//           REFERENCES school (school_id)
//           ON DELETE NO ACTION
//           ON UPDATE NO ACTION)
//       ENGINE = InnoDB
//       DEFAULT CHARACTER SET = latin1
//       COLLATE = latin1_bin;
      
//     `
//     db.execute(create_order_table_sql)
    
db.end();