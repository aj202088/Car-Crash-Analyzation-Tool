#include "DataAnalysis.h"
#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
#include <string>
#include <vector>
#include "json.hpp"
#include <direct.h>

using namespace std;
using json = nlohmann::json;

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

    // Read and process each line of the file
    while (getline(file, line)) {
        vector<string> fields;
        string field;
        bool inQuotes = false;

        // Parse the line character by character
        for (char ch : line) {
            if (ch == '"') {
                // Toggle inQuotes when encountering a double-quote as for some the make has "..." which could include a comma
                inQuotes = !inQuotes;
            } 
            else if (ch == ',' && !inQuotes) {
                // If not in quotes, this marks the end of a field
                fields.push_back(field);
                field.clear();
            } 
            else {
                // Add the character to the current field
                field += ch;
            }
        }

        // Add the last field
        if (!field.empty()) {
            fields.push_back(field);
        }

        // Ensure there are enough fields and data is correct
        if (fields.size() < 5) {
            continue;
        }

        // Combine MAKE and MODEL to form vehicle key
        string vehicleKey = fields[1] + " " + fields[2]; // MAKE + MODEL

        // Create a record with NUM_OF_OCCUPANTS and NUM_OF_DEATHS
        string record = fields[3] + "," + fields[4]; // NUM_OF_OCCUPANTS + NUM_OF_DEATHS
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
    string filename = "../../../AccidentData/Accidents-" + to_string(year) + ".csv";

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

    //create json output instance
    json outputJson;

    //add most dangerous vehicle to json
    outputJson["mostDangerousVehicle"] = {
        {"vehicle" , vehicle},
        {"score", score}
    };

    // Get top 10 most dangerous vehicles
    vector<DataAnalysis::VehicleScore> topVehicles = analysis.getTop10MostDangerousVehicles();

    // JSON array entry for vehicles
    outputJson["top10Vehicles"] = json::array();
    // Filling JSON array
    for (const auto& pair : topVehicles) {
        const auto& vehicle = pair.first;
        const auto& score = pair.second;
        outputJson["top10Vehicles"].push_back({
            {"vehicle", vehicle},
            {"score", score}
        });
    }
    cout << outputJson.dump(4) << std::endl;
    return 0;
}
