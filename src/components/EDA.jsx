import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

function EDA() {
  const [edaData, setEdaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://abdullahbuhlaq3.pythonanywhere.com/api/eda"
        );
        setEdaData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching EDA data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading data...</div>;
  if (!edaData) return <div>Error loading data</div>;

  return (
    <div className="dynamic-eda">
      <h2>Exploratory Data Analysis</h2>

      {/* Approval Rate Pie Chart */}
      <Plot
        data={[
          {
            values: [
              edaData.approval_rate[1] * 100,
              edaData.approval_rate[0] * 100,
            ],
            labels: ["Approved", "Rejected"],
            type: "pie",
            textinfo: "percent",
            hoverinfo: "label+percent",
          },
        ]}
        layout={{ title: "Overall Loan Approval Rate" }}
      />

      {/* Gender Comparison */}
      <Plot
        data={[
          {
            x: ["Male", "Female"],
            y: [
              edaData.gender_stats.Male * 100,
              edaData.gender_stats.Female * 100,
            ],
            name: "Approval Rate",
            type: "bar",
            marker: { color: ["blue", "pink"] },
          },
        ]}
        layout={{
          title: "Approval Rate by Gender",
          yaxis: { title: "Percentage (%)", range: [0, 100] },
        }}
      />

      {/* Income vs Loan Amount Scatter */}
      <Plot
        data={[
          {
            x: edaData.income_samples.incomes,
            y: edaData.income_samples.loans,
            mode: "markers",
            type: "scatter",
            marker: {
              size: 12,
              color: edaData.income_samples.status.map((status) =>
                status ? "green" : "red"
              ),
            },
            text: edaData.income_samples.status.map((status) =>
              status ? "Approved" : "Rejected"
            ),
          },
        ]}
        layout={{
          title: "Income vs Loan Amount (Sample)",
          xaxis: { title: "Applicant Income" },
          yaxis: { title: "Loan Amount" },
          hovermode: "closest",
        }}
      />

      {/* Property Area Analysis */}
      <Plot
        data={[
          {
            x: Object.keys(edaData.property_area),
            y: Object.values(edaData.property_area).map((rate) => rate * 100),
            type: "bar",
            marker: { color: ["#FFA07A", "#87CEFA", "#98FB98"] },
          },
        ]}
        layout={{
          title: "Approval Rate by Property Area",
          yaxis: { title: "Percentage (%)", range: [0, 100] },
        }}
      />

      {/* Credit History Impact */}
      <Plot
        data={[
          {
            x: Object.keys(edaData.credit_history).map((key) =>
              key === "1.0" ? "Good" : "Bad"
            ),
            y: Object.values(edaData.credit_history).map((rate) => rate * 100),
            type: "bar",
            marker: { color: ["red", "green"] },
          },
        ]}
        layout={{
          title: "Approval Rate by Credit History",
          yaxis: { title: "Percentage (%)", range: [0, 100] },
        }}
      />

      {/* Dependents Analysis */}
      <Plot
        data={[
          {
            x: Object.keys(edaData.dependents_stats),
            y: Object.values(edaData.dependents_stats).map(
              (rate) => rate * 100
            ),
            type: "bar",
            marker: { color: "#9B59B6" },
          },
        ]}
        layout={{
          title: "Approval Rate by Number of Dependents",
          yaxis: { title: "Percentage (%)", range: [0, 100] },
          xaxis: { title: "Number of Dependents" },
        }}
      />
    </div>
  );
}

export default EDA;
