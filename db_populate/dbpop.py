import mysql.connector
import re

def parse_file(file_path):
    data = []
    with open(file_path, 'r') as file:
        line = file.readline().strip()  # Skip the first line (header)

        while line:
            if line == '=======================================':
                print("got here")
                recipe_name = file.readline().strip().replace('-', ' ')
                file.readline()  # Skip the next line

                ingredients = []
                line = file.readline().strip()
                while not line.startswith('['):
                    line = file.readline().strip()

                line = file.readline().strip()
                while not line.endswith(']'):
                    # Ignore numbers, specific units, and certain words
                    ingredient = re.sub(r'\b(\d+(/\d+)?)?\s?(cups?|tsp|tbsp|teaspoons?|tablespoons?|oz|ounce(s)?|pints?)?\b(?!$)', '', line, flags=re.IGNORECASE)
                    # ingredient = line
                    ingredient = ingredient.strip()
                    if ingredient:
                        ingredients.append(ingredient)
                    line = file.readline().strip()

                data.append((recipe_name, ingredients))

            line = file.readline().strip()

    return data

def insert_data(data):
    # Connect to the MySQL database
    cnx = mysql.connector.connect(
        host='sqlclassdb-instance-1.cqjxl5z5vyvr.us-east-2.rds.amazonaws.com',
        user='anygup26',
        password='JsczDvZdWAzh',
        database='webapp_9MF_anygup26'
    )

    cursor = cnx.cursor()

    # Insert each recipe and its ingredients into the database
    for recipe in data:
        recipe_name, ingredients = recipe

        # Insert recipe into the database
        query = "INSERT INTO recipe (recipe_name) VALUES (%s)"
        cursor.execute(query, (recipe_name,))
        cnx.commit()  # Commit the transaction to generate the auto-incremented recipe_id
        recipe_id = cursor.lastrowid

        # Insert ingredients into the database and create recipe-ingredient mappings
        for ingredient_name in ingredients:
            # Check if the ingredient already exists
            query = "SELECT ingredient_id FROM ingredient WHERE ingredient_name = %s"
            cursor.execute(query, (ingredient_name,))
            result = cursor.fetchone()

            if result:
                ingredient_id = result[0]
            else:
                # Insert new ingredient into the database
                query = "INSERT INTO ingredient (ingredient_name) VALUES (%s)"
                cursor.execute(query, (ingredient_name,))
                ingredient_id = cursor.lastrowid

            # Create recipe-ingredient mapping in the recipe_ingredient_xref table
            query = "INSERT INTO recipe_ingredient_xref (recipe_id, ingredient_id) VALUES (%s, %s)"
            cursor.execute(query, (recipe_id, ingredient_id))

    # Commit the changes and close the connection
    cnx.commit()
    cursor.close()
    cnx.close()

if __name__ == '__main__':
    file_path = 'db_populate/sample_data_small_file.txt'
    data = parse_file(file_path)
    insert_data(data)