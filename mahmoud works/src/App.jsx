import React, { useState } from "react";
import Form from "./components/Form";
import EDA from "./components/EDA";
import Metrics from "./components/Metrics";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("form");

  return (
    <div className="App">
      <nav>
        <button onClick={() => setActiveTab("form")}>Loan Form</button>
        <button onClick={() => setActiveTab("eda")}>EDA</button>
        <button onClick={() => setActiveTab("metrics")}>Model Metrics</button>
        <button onClick={() => setActiveTab("reports")}>Reports</button>
      </nav>

      {activeTab === "form" && <Form />}
      {activeTab === "eda" && <EDA />}
      {activeTab === "metrics" && <Metrics />}
      {activeTab === "reports" && <Reports />}
    </div>
  );
}

export default App;
