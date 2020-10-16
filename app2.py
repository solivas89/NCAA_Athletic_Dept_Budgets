from flask import Flask, render_template, redirect, jsonify
from bson.json_util import dumps
from flask_pymongo import PyMongo
import dataImport

# Create an instance of Flask
app = Flask(__name__, template_folder="")

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri='mongodb://localhost:27017/NCAA_app')

# Route to render index.html template using data from Mongo
@app.route('/')
def home():

    NCAA_data = mongo.db.NCAA_data.find_one()

    return render_template("index.html", NCAA_data=NCAA_data)

# Route that will trigger the scrape function
@app.route('/gatherData')
def gatherData():

    # Running the scrape function
    tax_Data, budget_Data = dataImport.gatherData()
    print(tax_Data)
    # Update the Mongo database using updated and upsert=True
    # mongo.db.Tax_Data.update({}, tax_Data, upsert=True)
    for i in tax_Data:
        mongo.db.Tax_Data.insert_one(i)
    # mongo.db.Budget_Data.update({}, budget_Data, upsert=True)
    # Redirect back to home page
    return redirect('/', code=302)

@app.route('/outputData')
def outputData():
    Tax_data = mongo.db.Tax_Data.find()
    Tax_list = dumps([i for i in Tax_data])       
    # print(Tax_data)
    return Tax_list

if __name__ == "__main__":
    app.run(debug=True)
    
