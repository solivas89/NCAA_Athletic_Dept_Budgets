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
    Budget_Data = df2.to_dict('records')
    Nfl_Raw = df3.to_dict('records')
    Nfl_Coord = df4.to_dict('records')
    Nba_Raw = df5.to_dict('records')
    Nba_Coord = df6.to_dict('records')
    Merged_St_Ct = df7.to_dict('records')
    Lat_Lng = df8.to_dict('records')
    FBall_St_Ct = df9.to_dict('records')
    BBall_St_Ct = df10.to_dict('records')

    DataSet = {}
    DataSet['Tax_Data'] = Tax_Data
    DataSet['Budget_Data'] = Budget_Data
    DataSet['Nfl_Raw'] = Nfl_Raw
    DataSet['Nfl_Coord'] = Nfl_Coord
    DataSet['Nba_Raw'] = Nba_Raw
    DataSet['Nba_Coord'] = Nba_Coord
    DataSet['Merged_St_Ct'] = Merged_St_Ct
    DataSet['Lat_Lng'] = Lat_Lng
    DataSet['FBall_St_Ct'] = FBall_St_Ct
    DataSet['BBall_St_Ct'] = BBall_St_Ct

    return Tax_Data
    



