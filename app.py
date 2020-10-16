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

    Tax_Data = mongo.db.Tax_Data.find()

    return render_template("index.html", Tax_Data=Tax_Data)

# Route that will trigger the scrape function
@app.route('/gatherData')
def gatherData():

    Tax_Data = dataImport.gatherData()
    # print(tax_Data)

    # Update the Mongo database using updated and upsert=True
    # mongo.db.Tax_Data.update({}, tax_Data, upsert=True)
    for i in Tax_Data:
        mongo.db.Tax_Data.insert_one(i)
    # mongo.db.Budget_Data.update({}, budget_Data, upsert=True)
    # Redirect back to home page
    return redirect('/TaxData', code=302)

@app.route('/TaxData')
def TaxData():
    Tax_Data = mongo.db.Tax_Data.find()
    Tax_Dump = dumps(Tax_Data)       
    # print(Tax_list)
    return Tax_Dump

# @app.route('/RadialData')
# def RadialData():
#     Radial_Data = mongo.db.Tax_Data.find()
#     Radial_Dump = dumps(Radial_Data)       
#     # print(Tax_list)
#     return Radial_Dump

if __name__ == "__main__":
    app.run(debug=True)
    
