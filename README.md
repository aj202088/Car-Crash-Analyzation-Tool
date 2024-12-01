# Car-Crash-Analyzation-Tool
## Team Name: AJA Carrssss
## Team Members: Ajay Sommi, Josue Johnson, Ashton Penalacia

## Problem:
The problem we are trying to solve is understanding which vehicle makes/models have the highest crash rates, and fatality count relative to those crashes. 

## Motivation:
The primary issue is that vehicle crash/safety data is often misrepresented by manufacturers/insurance companies. For example, a certain car may have a high safety rating from the IIHS, but has the most deaths relative to accidents.

## Features:
We know that the problem has been solved when our statistics show some sort of discrepancy between the publicly provided statistics that are handed out by manufacturers/insurance companies. It may also be the case that there are little to no discrepancies and we are able to confirm what is being informed to the public as being factual. In any case, we are able to get a better picture of which cars people should have a higher emphasis on when making their car purchase.

## Data:
https://www.nhtsa.gov/file-downloads?p=nhtsa/downloads/FARS/. Will have columns for vehicle type, make, model, vehicle year,  date, as well as fatalities reported for that vehicle.

## Tools:
Our primary language will be in C++, however to create the front end aspect of our website we might use a React.JS (JavaScript) framework as well as possibly utilizing SQL to further clean and ingest our data. We will be using CLion or Visual Studio as our primary IDE running C++ 14.

## Visuals: 
Wireframes


## Strategy:
We will use hashmaps and priority queues to easily store and retrieve the data. The hashmaps will hold the vehicle's make/model as the key and the crash data as the value. We will develop algorithms that will aid in pattern analysis in crash frequency/fatalities and provide comparisons based on publicly found data and the computed findings. Our priority queue will hold a crash-safety metric for each vehicle make and model where for each key-value pair in the map we create a priority key based on its “safety rating.” A higher priority has a higher safety rating which means that the vehicle type has less accidents with less fatalities and a lower safety rating being a vehicle with more accidents and and more fatalities. We would then be able to identify the safest cars from the top of the priority queue and sequentially go down the list.

## Distribution of Responsibility and Roles:
Front end menu: Ajay Sommi, Josue Johnson Back end: Ashton Penalacia, Josue Johnson Data retrieval: Ashton Penalacia, Ajay Sommi

## References:
https://www.iihs.org/ratings 
https://www.nhtsa.gov/file-downloads?p=nhtsa/downloads/FARS/
https://www.figma.com
