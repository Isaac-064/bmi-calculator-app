// src/BMICalculator.ts
class BMICalculator {
    calculateBMI(weightInKg: number, heightInMeters: number): number | string {
      if (heightInMeters <= 0 || weightInKg <= 0) {
        return "Dato incorrecto. El peso y la estatura deben ser valores positivos.";
      }
  
      const bmi: number = weightInKg / (heightInMeters * heightInMeters);
      return bmi;
    }
  
    interpretBMI(bmi: number): string {
      if (bmi < 18.5) {
        return "Bajo de peso";
      } else if (bmi < 24.9) {
        return "Peso normal";
      } else if (bmi < 29.9) {
        return "Sobrepeso";
      } else {
        return "Obesidad";
      }
    }
  }
  
  export default BMICalculator;