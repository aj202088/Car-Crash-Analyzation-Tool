#include "DataAnalysis.h"
#include <iostream>
#include <sstream>
using namespace std;


void DataAnalysis::calculateDangerScores(const map<string, vector<string>>& dataMap) {
    for (const auto& [vehicle, eventData] : dataMap) {
        double dangerScore = 0.0;

        for (const string& record : eventData) {
            istringstream s(record);
            int deaths = 0;
            // Set to 1 to prevent div by 0
            int passengers = 1;
            s >> deaths >> passengers;
            // Danger score formula (subject to change)
            dangerScore += (deaths / static_cast<double>(passengers)) * 100.0;
        }
        // Push vehicle and danger score into max heap
        maxDanger.push({vehicle, dangerScore});

    }
}

DataAnalysis::VehicleScore DataAnalysis::getMostDangerousVehicle() {
    if (maxDanger.empty()) {
        cerr << "No data for analysis." << endl;
        return {"None", 0.0};
    }
    return maxDanger.top();
}

vector<DataAnalysis::VehicleScore> DataAnalysis::getTop10MostDangerousVehicles() {
    vector <VehicleScore> topVehicles;

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