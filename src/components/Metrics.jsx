import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

function ModelMetrics() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(
          "https://abdullahbuhlaq3.pythonanywhere.com/api/model_metrics"
        );
        setMetrics(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching model metrics:", error);
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <div>Loading metrics...</div>;
  if (!metrics) return <div>Error loading model metrics</div>;

  return (
    <div className="model-metrics">
      <h2>Model Performance Metrics</h2>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Accuracy</h3>
          <p>{(metrics.accuracy * 100).toFixed(2)}%</p>
          <p>Overall correctness of predictions</p>
        </div>

        <div className="metric-card">
          <h3>Precision</h3>
          <p>{(metrics.precision * 100).toFixed(2)}%</p>
          <p>Correct positive predictions ratio</p>
        </div>

        <div className="metric-card">
          <h3>Recall</h3>
          <p>{(metrics.recall * 100).toFixed(2)}%</p>
          <p>True positives identified correctly</p>
        </div>

        <div className="metric-card">
          <h3>F1 Score</h3>
          <p>{metrics.f1_score.toFixed(2)}</p>
          <p>Balance between precision and recall</p>
        </div>
      </div>

      <div className="confusion-matrix">
        <h3>Confusion Matrix</h3>
        <Plot
          data={[
            {
              z: [
                [
                  metrics.confusion_matrix.true_negative,
                  metrics.confusion_matrix.false_positive,
                ],
                [
                  metrics.confusion_matrix.false_negative,
                  metrics.confusion_matrix.true_positive,
                ],
              ],
              x: ["Predicted Negative", "Predicted Positive"],
              y: ["Actual Negative", "Actual Positive"],
              type: "heatmap",
              colorscale: "Blues",
              showscale: false,
              text: [
                [
                  `TN: ${metrics.confusion_matrix.true_negative}`,
                  `FP: ${metrics.confusion_matrix.false_positive}`,
                ],
                [
                  `FN: ${metrics.confusion_matrix.false_negative}`,
                  `TP: ${metrics.confusion_matrix.true_positive}`,
                ],
              ],
              hoverinfo: "text",
            },
          ]}
          layout={{
            title: "Confusion Matrix",
            xaxis: { side: "bottom" },
            yaxis: { autorange: "reversed" },
          }}
        />
      </div>
    </div>
  );
}

export default ModelMetrics;
