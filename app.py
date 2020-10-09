from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_mars

# Create connection variable
app = Flask(__name__)


mongo = PyMongo(app, uri="mongodb://localhost:27017/space_db.mars")


@app.route('/')
def home():
    
    data_scrape = mongo.db.mars_scrape.find_one()

    return render_template('index.html', mars_scrape=mars_scrape)


if __name__ == "__main__":
    app.run(debug=True)