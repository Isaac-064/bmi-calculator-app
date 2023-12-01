// src/BMICalculatorComponent.tsx
import React, { useEffect, useState, useRef } from "react";
import BMICalculator from "./BMIcalculator";
import Chart from "chart.js/auto";
import "./styles.css";

function BMICalculatorComponent() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [bmi, setBMI] = useState<string>("");
  const [interpretation, setInterpretation] = useState<string>("");
  const [chart, setChart] = useState<Chart | null>(null);

  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    initializeChart();
  }, [chart]);

  useEffect(() => {
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chart]);

  const initializeChart = () => {
    if (!chart) {
      const ctx = chartRef.current?.getContext("2d");

      if (chartRef.current) {
        Chart.getChart(chartRef.current)?.destroy();
      }

      if (ctx) {
        const newChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["BMI"],
            datasets: [
              {
                label: "BMI Result",
                data: [0],
                backgroundColor: ["rgba(75, 192, 192, 0.2)"],
                borderColor: ["rgba(75, 192, 192, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        setChart(newChart);
      }
    }
  };

  const handleCalculate = () => {
    const calculator = new BMICalculator();
    const bmiValue: number | string = calculator.calculateBMI(
      parseFloat(weight),
      parseFloat(height)
    );

    if (typeof bmiValue === "number") {
      const interpretationValue: string = calculator.interpretBMI(bmiValue);
      setBMI(bmiValue.toFixed(2));
      setInterpretation(interpretationValue);

      updateChart(bmiValue);
    } else {
      setBMI("");
      setInterpretation(bmiValue);
    }
  };

  const updateChart = (bmiValue: number) => {
    if (chart) {
      chart.data.labels = ["BMI"];
      chart.data.datasets[0].data = [bmiValue];
      chart.update();
    }
  };

  return (
    <div>
      <h3>Calculadora BMI</h3>
      <div>
        <label>Peso (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div>
        <label>Estatura (m):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <br />
      <button className="calculate-button" onClick={handleCalculate}>
        Calcular BMI
      </button>
      <br />
      {bmi && (
        <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#333' }}>
          Tu BMI es: {bmi}
        </p>
      )}
      {interpretation && (
        <p style={{ fontSize: '1.1em',fontWeight: 'bold', color: '#555' }}>
          Interpretación: {interpretation}
        </p>
      )}
      <canvas ref={chartRef} width="200" height="100" style={{ maxWidth: '100%' }} />
    </div>
  );
}

export default BMICalculatorComponent;
