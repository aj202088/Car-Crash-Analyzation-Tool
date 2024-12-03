#ifndef DATA_ANALYSIS_H
#define DATA_ANALYSIS_H

#include <string>
#include <map>
#include <vector>
#include <queue>
#include <utility>
using namespace std;

class DataAnalysis {
    // Max heap to store vehicle based on danger score
    priority_queue<pair<string, double>> maxDanger;

public:
    // Internal alias for vehicle and danger score pair
    using VehicleScore = pair<string, double>;

    // Calculates danger scores for all vehicles in the provided map
    void calculateDangerScores(const map<string, vector<string>>& dataMap);

    // Get the most dangerous vehicle
    VehicleScore getMostDangerousVehicle();

    // Get top 10 most dangerous vehicles
    vector<VehicleScore> getTop10MostDangerousVehicles();
};

#endif