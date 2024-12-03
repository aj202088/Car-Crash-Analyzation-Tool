#ifndef DATA_ANALYSIS_H
#define DATA_ANALYSIS_H

#include <string>
#include <map>
#include <vector>
#include <queue>
#include <utility>
using namespace std;

class DataAnalysis {
public:
    // Internal alias for vehicle and danger score pair
    using VehicleScore = pair<string, double>;

    // Calculates danger scores for all vehicles in the provided map
    void calculateDangerScores(const map<string, vector<string>>& dataMap);

    // Get the most dangerous vehicle
    VehicleScore getMostDangerousVehicle();

    // Get top 10 most dangerous vehicles
    vector<VehicleScore> getTop10MostDangerousVehicles();

private:
    // Comparator for the max heap
    struct Compare {
        bool operator()(const VehicleScore& a, const VehicleScore& b) {
            // Larger scores have higher priority
            return a.second < b.second;
        }
    };

    // Max heap to store vehicle based on danger score
    priority_queue<VehicleScore, vector<VehicleScore>, Compare> maxDanger;

    // Helper Func to process danger score aggregation
    void aggregateScores(const map<string, vector<string>>& dataMap, map<string, pair<double, int>>& aggregatedScores);
};

#endif