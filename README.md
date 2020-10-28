# NCAA Athletic Department Budgets for Basketball

#### -- Project Status: [Active]

## Project Objective
This past year has been a rough year. Everyone is trying to figure out how the COVID-19 pandemic will affect them.
The purpose of this project is to explore how college athletics would be affected by COVID-19 and the current economic landscape.
To do this we looked at:
* Financial data for NCAA programs that feed pro sports leagues (the NFL and NBA).  
* Current NFL and NBA Rosters ( to identify the top school that feed these pro sports leagues.
* Average college athletic budget breakdowns
* Year-over-year quarterly tax revenue to highlight the financial impacts many of these schools will face in the future. 
* Leading down this path, our intent is to predict how these leagues and schools will be affected by Covid-19 (Project 3)

### Methods Used
* Data Visualization

### Technologies
* Python
* Pandas, Jupyter
* JavaScript
* D3 JS
* Leaflet JS
* Canvas JS
* HTML, CSS
* PostGreSQL, MongoDB
* Flask App

## Getting Started
* Clone the repository on local drive
* Run app.py on terminal
* Navigate to route "/gatherData"
* Navigate back to home after viewing the data output

## Process
* Gather data
* Read in data
* Data
   * Parse (multiple data files)
   * Map data files (implementing key relationships)
   * GeoCode Data (using Google Maps API)
* Load cleaned data into MongoDB
* Build a Flask app that calls data from MongoDB and renders our webpage
* Add JS libraries for visuals

## Charts
* Combination chart shows player count and financial data for top 20 schools
* FBS Averages on where college athletic revenue comes from
* Lollipop chart showing Quarterly (Year-over-Year) tax data
* Radial chart showing NFL and NBA players by State
* Leaflet map with layers

## Challenges
* Figuring out the new js library Canvas js. It took longer than expected to learn and work with.
* Having multiple data sets made it difficult and we spent too much time cleaning/organizing
* Extracting latitude and longitude for each school based on the address in the college data set using the Google API. The problem was the format of some of the addresses, which were not recognized by the API.

## Next Step
* Clean up the website aesthetically
* Ultimately, forecast how school budgets will be affected by COVID-19 and which schools will continue producing professional athletes.

## Data Sources
* NFL Rosters: ESPN.com
* NBA Rosters: Wikipedia.com
* School Budget Data: EADA (Equity in Athletics Data Analysis)
* FBS Averages: Knight Commission on Intercollegiate Athletics

## Contributing Members

**Team Lead: Nabeel Sheikh (https://github.com/nsheikh23)**

#### Other Members:

|Name     |  Github   | 
|---------|-----------------|
|Salvador Olivas | https://github.com/solivas89 |
|Dale Romero | https://github.com/chippen-dale |
|Dominique Dunning | https://github.com/ddunning |
