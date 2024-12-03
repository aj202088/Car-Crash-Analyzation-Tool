#include "DataAnalysis.h"
#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
#include <string>
#include <vector>


using namespace std;

// Function to load data from a CSV file into a map
void loadCSVIntoMap(const string& filename, map<string, vector<string>>& dataMap) {
    ifstream file(filename);
    if (!file.is_open()) {
        cerr << "Error: Could not open file " << filename << endl;
        return;
    }

    string line;
    // Skip first line header
    getline(file, line);

    while (getline(file, line)) {
        istringstream s(line);
        string modelYear, make, model, numOfOccupants, numOfDeaths;

        // Extract values from the CSV
        getline(s, modelYear, ',');
        getline(s, make, ',');
        getline(s, model, ',');
        getline(s, numOfOccupants, ',');
        getline(s, numOfDeaths, ',');
        string vehicleKey = make + " " + model;

        string record = numOfOccupants + "," + numOfDeaths;
        dataMap[vehicleKey].push_back(record);
    }
    file.close();
}

int main(int argc, char* argv[]) {
    if (argc != 2) {
        cerr << "year is not properly defined" << endl;
        return 1;
    }
    // Get the year from the command-line argument
    int year = stoi(argv[1]);

    // Construct the filename
    string filename = "./AccidentData/Accidents-" + to_string(year) + ".csv";

    // Create a map to store event data
    map<string, vector<string>> eventMap;

    // Load data from the CSV file into the map
    loadCSVIntoMap(filename, eventMap);

    // Create an instance of DataAnalysis
    DataAnalysis analysis;
    // Calculate danger scores
    analysis.calculateDangerScores(eventMap);

    // Get the most dangerous vehicle
    auto vehicleScore = analysis.getMostDangerousVehicle();
    const auto& vehicle = vehicleScore.first;
    const auto& score = vehicleScore.second;

    cout << "Most Dangerous Vehicle: " << vehicle << score << endl;

    // Get top 10 most dangerous vehicles
    vector<DataAnalysis::VehicleScore> topVehicles = analysis.getTop10MostDangerousVehicles();

    cout << "Top 10 Most Dangerous Vehicles:" << endl;
    for (const auto& pair : topVehicles) {
        const auto& vehicle = pair.first;
        const auto& score = pair.second;
        cout << vehicle << " with a danger score of " << score << endl;
    }

    return 0;
}
