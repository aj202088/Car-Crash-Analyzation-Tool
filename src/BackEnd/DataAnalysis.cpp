#include "DataAnalysis.h"
#include <iostream>
#include <sstream>
using namespace std;

void DataAnalysis::aggregateScores(const map<string, vector<string>>& dataMap, map<string, pair<double, int>>& aggregatedScores) {
    // Baseline for accidents without deaths
    const double Baseline_weight = 0.1;
    for (const auto& pair : dataMap) {
        const auto& vehicle = pair.first;
        const auto& eventData = pair.second;
        double totalDangerScore = 0.0;
        int recordCount = 0;

        // Process each event for the vehicle
        for (const string& record : eventData) {
            istringstream s(record);
            string numOfOccupantsStr, numOfDeathsStr;

            // Extract the two fields separated by a comma, skipping invalid data
            if (!getline(s, numOfOccupantsStr, ',') || !getline(s, numOfDeathsStr, ',')) {
                continue;
            }

            // Convert strings to integers
            int numOfOccupants = stoi(numOfOccupantsStr);
            int numOfDeaths = stoi(numOfDeathsStr);

            // Danger score formula (subject to change)
            if (numOfOccupants > 0) {
                double dangerScore = ((numOfDeaths + Baseline_weight) / static_cast<double>(numOfOccupants));
                totalDangerScore += dangerScore;
            } 
            recordCount++;
        }
        // Update cumulative danger score and count for the vehicle
        if (recordCount > 0) {
            aggregatedScores[vehicle].first += totalDangerScore;
            aggregatedScores[vehicle].second += recordCount;
        }
    }
}

void DataAnalysis::calculateDangerScores(const map<string, vector<string>>& dataMap) {
    // Map to store total danger score and count for each vehicle
    map<string, pair<double, int>> aggregatedScores;
    
    // Aggregate danger scores
    aggregateScores(dataMap, aggregatedScores);

    // Calculate averages and insert into maxDanger
    for (const auto& pair : aggregatedScores) {
        const auto& vehicle = pair.first;
        const auto& scoreCount = pair.second;
        maxDanger.push({vehicle, scoreCount.first});
    }
}

// Get the most dangerous vehicle based on danger score
DataAnalysis::VehicleScore DataAnalysis::getMostDangerousVehicle() {
    // If no vehicles in maxHeap
    if (maxDanger.empty()) {
        cerr << "No data for analysis." << endl;
        return {"None", 0.0};
    }
    // Return most dangerout vehicle at top of maxHeap
    return maxDanger.top();
}

// Get the top 10 most dangerous vehicles withinthe maxHeap based on danger score
vector<DataAnalysis::VehicleScore> DataAnalysis::getTop10MostDangerousVehicles() {
    vector <VehicleScore> topVehicles;

    // Get top ten most dangerous vehicles within the maxHeap
    for (int i = 0; i < 10 && !maxDanger.empty(); i++) {
        topVehicles.push_back(maxDanger.top());
        maxDanger.pop();
    }

    // Rebuild heap for next use
    for (const auto& vehicle : topVehicles) {
        maxDanger.push(vehicle);
    }
    return topVehicles;
}
