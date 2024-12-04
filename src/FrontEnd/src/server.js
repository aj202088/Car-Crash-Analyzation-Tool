// Help configuring POST request from https://stackoverflow.com/questions/11625519/how-to-access-the-request-body-when-posting-using-node-js-and-express
// And from https://forum.freecodecamp.org/t/basic-node-and-express-use-body-parser-to-parse-post-requests/663474
//Help creating path https://stackoverflow.com/questions/20619488/how-to-convert-local-file-path-to-a-file-url-safely-in-node-js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["POST", "OPTIONS"],
  })
);

// Endpoint to run the c++ program
app.post("/run-cpp", (req, res) => {
  const { year } = req.body;

  if (!year || isNaN(Number(year)) || year.length != 4) {
    return res.status(400).json({ error: "Invalid year" });
  }

  // Get the current file path and directory
  const fileName = fileURLToPath(import.meta.url);
  const dirName = path.dirname(fileName);
  // Dynamically construct the path to the executable
  const executablePath = path.resolve(dirName, "../../../car_analysis");
  const cmd = `${executablePath} ${year}`;
  console.log(`Executing: ${cmd}`);

  exec(cmd, (error, stdout, stderr) => {
    //debugging to see what errors are being thrown
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);

    if (error) {
      console.error("Error executing C++ program:", error.message);
      return res.status(500).json({ error: "C++ program execution failed." });
    }

    if (!stdout.trim()) {
      console.error("No output received from C++ program.");
      return res
        .status(500)
        .json({ error: "No data received from C++ program." });
    }
    // Process the output
    try {
      console.log("Raw stdout received from C++ program:", stdout);
      console.log("Length of stdout:", stdout.length);

      const topVehicles = JSON.parse(stdout);
      res.json(topVehicles);
    } catch (err) {
      console.error("Failed to parse C++ output:", err.message);
      res.status(500).json({ error: "Invalid output from C++ program." });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
