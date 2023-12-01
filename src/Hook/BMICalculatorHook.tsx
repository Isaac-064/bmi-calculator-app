import { useState } from "react";
import BMICalculator from "../Componentes/BMIcalculator";

const useBMICalculator = () => {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [bmi, setBMI] = useState<string>("");
  const [interpretation, setInterpretation] = useState<string>("");

  const calculateBMI = () => {
    const calculator = new BMICalculator();
    const bmiValue: number | string = calculator.calculateBMI(
      parseFloat(weight),
      parseFloat(height)
    );

    if (typeof bmiValue === "number") {
      const interpretationValue: string = calculator.interpretBMI(bmiValue);
      setBMI(bmiValue.toFixed(2));
      setInterpretation(interpretationValue);
    } else {
      setBMI("");
      setInterpretation(bmiValue);
    }
  };

  return {
    weight,
    setWeight,
    height,
    setHeight,
    bmi,
    interpretation,
    calculateBMI,
  };
};

export default useBMICalculator;