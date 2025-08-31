// bmiUtils.ts

export type BMIResult = {
    bmi: number;
    category: string;
    categoryColor: string;
    indicatorPosition: number;
};

export function calculateBMI(height: number, weight: number): BMIResult | { error: string } {
    if (!height || !weight || height <= 0 || weight <= 0) {
        return { error: "Please enter valid height and weight values." };
    }

    const bmi = weight / ((height / 100) ** 2);
    const bmiRounded = Math.round(bmi * 10) / 10;

    let category: string;
    let categoryColor: string;
    let indicatorPosition: number;

    if (bmi < 18.5) {
        category = "Underweight";
        categoryColor = "bg-blue-500 text-white";
        indicatorPosition = (bmi / 18.5) * 18.5;
    } else if (bmi < 25) {
        category = "Normal Weight";
        categoryColor = "bg-green-500 text-white";
        indicatorPosition = 18.5 + ((bmi - 18.5) / (25 - 18.5)) * 25;
    } else if (bmi < 30) {
        category = "Overweight";
        categoryColor = "bg-yellow-500 text-white";
        indicatorPosition = 43.5 + ((bmi - 25) / (30 - 25)) * 25;
    } else {
        category = "Obese";
        categoryColor = "bg-red-500 text-white";
        indicatorPosition =
            68.5 + ((Math.min(bmi, 40) - 30) / (40 - 30)) * 31.5;
    }

    return {
        bmi: bmiRounded,
        category,
        categoryColor,
        indicatorPosition: Math.min(indicatorPosition, 100),
    };
}
