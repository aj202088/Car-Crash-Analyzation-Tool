# Car-Crash-Analyzation-Tool
## Team Name: AJA Carrssss
## Team Members: Ajay Sommi, Josue Johnson, Ashton Penalacia

## Problem:
The problem we are trying to solve is understanding which vehicle makes/models have the highest crash rates/fatality counts with respect to total occupants inside the vehicle relative to those crashes.

## Motivation:
The primary issue is that vehicle crash/safety data is often misrepresented by manufacturers/insurance companies. For example, a certain car may have a high safety rating from the IIHS, but has the most deaths relative to accidents. Thus, we wanted to get an accurate representation for these statistics and visualize them in one place.

## Features:
Our data is found on the Fatality Reporting Analysis System (FARS) from NHTSA (https://www.nhtsa.gov/file-downloads?p=nhtsa/downloads/FARS/). Within this directory are many different calendar years for accidents ranging from 1975 to 2022, each containing over 500k data points for all accident metrics, including details about the vehicle(s) involved, occupants, and other information about the accident. For our project, we only need the model year, make, model, number of occupants, and deaths to calculate a danger score ((deaths + base_score)/ occupants). A small problem we faced was that some of the data that we needed was not in a single dataset, but rather scattered across two different csv files, where the vehicle details such as the year, make, and model were in one file (vpicdecode.csv) and the information about the occupants and deaths were in a different file (vehicle.csv). To combat this problem, our team decided to use SQL queries to combine the necessary columns from these two files using the VIN (Vehicle Identification Number) as the connecting key. Through this, we were able to create a new csv file with only the necessary information and uploaded these files (for each model year) to our GitHub repository, allowing our team to access those files from our backend. Another small problem we had faced with data retrieval was how we would be calculating the danger score as there were many routes we could have taken to get this information. However, we came up with the previously stated danger score formula which we thought would properly identify an accurate danger score rating.

## Data:
Data is retrieved from the National Highway Traffic Safety Administration (NHTSA): 

https://www.nhtsa.gov/file-downloads?p=nhtsa/downloads/FARS/. 

This dataset contains columns for vehicle type, make, model, vehicle year, number of occupants in the vehicle, and number of fatalities reported for that vehicle.

## Tools:
This project has three main facets that needed to be addressed: data, backend, and frontend. 
Data: As previously mentioned, our team had to use SQL to combine different csv files into a new csv file with only the important data variables that will be used in parsing later. We used left join to combine the vehicle and vpicdecode csv files, each containing necessary information about vehicle details and occupant/death information, with the VIN being the common connecting key.
Backend: For the main calculations and processing, our team used C++ to handle taking in data, and sending a score to the frontend, which will then display that info to the user. In order to do this, we used an api call constructed in JavaScript with creating a backend server also done in JavaScript using node.js that helped handle the connection from our front end to our back end environments.In order to create the JSON file easily in C++ we utilized nlohmann’s json library. This header only library allows you to create map/array style data structures that formats the JSON correctly automatically. This made the process much easier as instead of manually creating the JSON output, you can either create a key-value pair like a map or pushback the element pairs to an array json object like a vector.

Frontend: Our team decided to use React to create a user-friendly UI and display information. We used TypeScript which made developing the react code easier as errors came up during compile time as opposed to run time. For the data visualization we utilized chart.js to render dynamic charts and we used bootstrap to aid in styling of some components. The workflow is as follows: The input page takes in a user input (year) and sends it to the backend using a POST request. The backend then uses the year to execute the C++ program and sends back a JSON output. This output is processed by the input page (handleAnalyze function) and sent to the analysis page as state variables. When at the analysis page, this data is rendered into charts which allows the user to easily interpret the data.

## Data Structures Implemented:
### Max Heap
For this project, the main data structure implemented in the backend is a max heap (priority queue). This max heap stores the most dangerous vehicles and their scores in a queue ordered by highest priority which in this case would be the highest danger score. From there we are able to get a list of the most dangerous vehicles for that respective year through the top of the queue and so on.
### Map
An additional data structure that we used includes hashmaps (map in C++) to store the danger score and count for each vehicle, as well as to store the make and model of each vehicle with their associated report data (number of occupants, number of deaths). A vector was also used to store the top 10 most dangerous cars, as make/models can easily be added to it without having to resize or modify the structure in a severe manner.



## Distribution of Responsibility and Roles:
Front end menu: Josue Johnson, some from Ashton Penalacia 

Back end: Ashton Penalacia, some from Josue Johnson 

Data retrieval and configuration: Ajay Sommi

## Prerequisites
1. Install Node.js (v16 or higher): Download and Install (comes with npm)
3. Install React.js: run: npm install react in a terminal for the project directory
4. Install C++ Compiler:
 - Windows: Use Visual Studio Code.
 - macOS: Install Xcode.
 - Linux: Install g++ via package manager (sudo apt install g++).
4. Libraries:
 - C++: Ensure json.hpp is included for JSON processing.
 - React.js: Ensure dependencies like react-chartjs-2, vite, and chart.js are installed (npm install). IMPORTANT: for cross referencing ports, need to make sure that vite is installed using: npm install vite and check if its a devDependency by running: npm list vite
5. Dataset: Download and place the dataset in the AccidentData folder (Already done if you use this teplate).

## Setup Instructions
### Frontend
1. Navigate to the frontend directory:
 -     cd src/FrontEnd/src
2. Install dependencies:
 -     npm install
3. Start the React development server (currently set for dev):
 -     npm run dev
4. Open the app in your browser:
 -     http://localhost:5173

### Backend
1. Navigate to the frontend directory again (server.js located here) in a separate terminal while making sure that the first terminal is left open:
 -     cd src/FrontEnd/src
2. Install Node.js dependencies:
 -     npm install
3. Start the backend server:
 -     node server.js
4. Ensure the server is running at:
 -     http://localhost:5000

### C++ Executable
1. Navigate to the root directory of the project (Car-Crash-Analyzation-Tool).
2. Compile the C++ executable code:
 -     g++ -std=c++14 -o car_analysis ./src/BackEnd/main.cpp ./src/BackEnd/DataAnalysis.cpp -I./src/BackEnd
3. Run the executable directly to test:
 -     ./car_analysis <year>
 - Example:
  -     ./car_analysis 2022

### Run Instructions
1. Start the Backend:
 -     cd src/FrontEnd/src
 -     node server.js
2. Start the Frontend:
 -     cd src/FrontEnd/src
 -     npm run dev
3. Navigate to the web app (http://localhost:5173), input a year, and analyze the results.

## Important Notes:
1. Dataset Placement:
Ensure the dataset files (e.g., Accidents-2022.csv) are placed in the AccidentData folder in the project root.

2. Relative Paths:
The project relies on relative paths. If issues occur, adjust the working directory for ./AccidentData.

3. C++ JSON Output:
Ensure the json.hpp library is included in the project for JSON configuration in the C++ backend.

4. Port Conflicts:
If ports 5000 (backend) or 5173 (frontend) are in use, change them in server.js and package.json and make sure that you have the vite dependency. Also make sure that you are consistently recompiling the executable file with:
-     g++ -std=c++14 -o car_analysis ./src/BackEnd/main.cpp ./src/BackEnd/DataAnalysis.cpp -I./src/BackEnd

## References:
https://www.iihs.org/ratings 
https://www.nhtsa.gov/file-downloads?p=nhtsa/downloads/FARS/
https://www.figma.com
