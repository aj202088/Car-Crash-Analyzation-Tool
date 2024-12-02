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
        cerr << "Error: Could not open file!" << endl;
        return;
    }

    string line;
    while (getline(file, line)) {
        istringstream s(line);
        string event;
        getline(s, event, ',');

        vector<string> eventData;
        string field;
        while (getline(s, field, ',')) {
            eventData.push_back(field);
        }
        dataMap[event] = eventData;
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
    string filename = "Accidents-" + to_string(year) + ".csv";

    // Create a map to store event data
    map<string, vector<string>> eventMap;

    // Load data from the CSV file into the map
    loadCSVIntoMap(filename, eventMap);
    return 0;
}
