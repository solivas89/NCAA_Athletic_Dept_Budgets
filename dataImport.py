import pandas as pd
import numpy as np
from pprint import pprint

def gatherData():

    # Declaring file path for each of the data set
    file1 = "static/data/Tax Data - Re-formatted.csv"
    file2 = "static/data/College Budget File Flattened.csv"
    file3 = "static/data/NFL_Combined.csv"
    file4 = "static/data/nfl_cleaned.csv"
    file5 = "static/data/NBA_Combined.csv"
    file6 = "static/data/nba_cleaned.csv"
    file7 = "static/data/mergedstatecount.csv"
    file8 = "static/data/latlongbook.csv"
    file9 = "static/data/fballstatecount.csv"
    file10 = "static/data/bballstatecount.csv"

    # Reading in each of the csv files into pandas
    df1 = pd.read_csv(file1)
    df2 = pd.read_csv(file2)
    df3 = pd.read_csv(file3)
    df4 = pd.read_csv(file4)
    df5 = pd.read_csv(file5)
    df6 = pd.read_csv(file6)
    df7 = pd.read_csv(file7)
    df8 = pd.read_csv(file8)
    df9 = pd.read_csv(file9)
    df10 = pd.read_csv(file10)

    Tax_Data = df1.to_dict('records')
    # Budget_Data = df2.to_dict('records')
    # NFL_Raw = df3.to_dict('records')
    

    # Converting to dictionaries
    # NCAA_Data["Tax_Data"] = df1
    # NCAA_Data["College_Budget"] = df2
    # NCAA_Data["NFL_Raw"] = df3
    # NCAA_Data["NFL_Coord"] = df4
    # NCAA_Data["NBA_Raw"] = df5
    # NCAA_Data["NBA_Coord"] = df6
    # # NCAA_Data["Merged_St_Ct"] = df7
    # NCAA_Data["Lat_Lng"] = df8
    # NCAA_Data["FBall_St_Ct"] = df9
    # NCAA_Data["BBall_St_Ct"] = df10

    return Tax_Data
    



