// // Help configuring POST request from https://stackoverflow.com/questions/11625519/how-to-access-the-request-body-when-posting-using-node-js-and-express
// // And from https://forum.freecodecamp.org/t/basic-node-and-express-use-body-parser-to-parse-post-requests/663474

// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import { exec } from "child_process";

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// // Endpoint to run the c++ program
// app.post("/run-cpp", (req, res) => {
//   const { year } = req.body;

//   if (!year || isNaN(Number(year)) || year.length != 4) {
//     return res.status(400).json({ error: "Invalid year" });
//   }

//   // Construct cmd to run c++ program
//   const cmd = "./carDataRetrieval ${year}";

//   exec(cmd, (error, stdout, stderr) => {
//     if (error) {
//       console.error("Error executing C++ program: ", error.message);
//       return res.status(500).json({ error: "C++ program execution failed" });
//     }
//     if (stderr) {
//       console.error("C++ program stderr: ", stderr);
//       return res.status(500).json({ error: stderr });
//     }
//     // Send programs output back to frontend
//     res.json({ output: stdout });
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log("Server is running on http://localhost:3000");
// });

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import { exec } from "child_process"; // Not needed temporarily

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Endpoint to run the C++ program (mocked for development)
app.post("/run-cpp", (req, res) => {
  const { year } = req.body;

  if (!year || isNaN(Number(year)) || year.length != 4) {
    return res.status(400).json({ error: "Invalid year" });
  }

  // Mocked response instead of executing C++ code
  res.json({
    output: `This is a mock output for the analysis of year ${year}.`,
    analysisData: [
      { category: "Vehicle A", fatalityCount: 10 },
      { category: "Vehicle B", fatalityCount: 15 },
      { category: "Vehicle C", fatalityCount: 7 },
    ],
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
