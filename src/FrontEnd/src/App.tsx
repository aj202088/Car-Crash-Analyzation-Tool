// Used https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/ to help split up pages

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputPage from "./Pages/InputPage";
import AnalysisPage from "./Pages/AnalysisPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/AnalysisPage" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;
