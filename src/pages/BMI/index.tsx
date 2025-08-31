import { Button, TextInput } from "@Aneeshpissay330/components-ui";
import { useActionState } from "react";
import { calculateBMI } from "../../utils/bmi";

type State = {
    height: string;
    weight: string;
    result: ReturnType<typeof calculateBMI> | null;
};

const BMI = () => {
    const handleCalculate = async (_: State, formData: FormData): Promise<State> => {
        const height = formData.get("height")?.toString() || "";
        const weight = formData.get("weight")?.toString() || "";
        const output = calculateBMI(parseFloat(height), parseFloat(weight));

        if ("error" in output) {
            alert(output.error);
            // return previous state unchanged
            return _;
        }

        return {
            ..._,
            height,
            weight,
            result: output,
        };
    };
    const [state, formAction] = useActionState<State, FormData>(handleCalculate, {
        height: "",
        weight: "",
        result: null,
    });
    return (
        <main
            id="main-content"
            className="flex items-center justify-center px-6 py-12 mb-5"
        >
            <div
                id="bmi-calculator-card"
                className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 w-full max-w-md"
            >
                {/* Title */}
                <div id="calculator-title" className="text-center mb-8">
                    <h1 className="dot-matrix text-2xl font-bold text-black mb-2">
                        BMI CALCULATOR
                    </h1>
                    <div className="w-12 h-0.5 bg-nothing-red mx-auto" />
                </div>
                {/* Input + Button inside Form */}
                <form
                    action={formAction}
                    className="space-y-6 mb-8"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="height"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Height (cm)
                            </label>
                            <TextInput
                                type="number"
                                name="height"
                                placeholder="170"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="weight"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Weight (kg)
                            </label>
                            <TextInput
                                type="number"
                                name="weight"
                                placeholder="65"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div id="button-section" className="pt-4">
                        <Button fullWidth>
                            CALCULATE BMI
                        </Button>
                    </div>
                </form>
                {/* Result Section */}
                {state?.result && !("error" in state.result) && (
                    <div id="result-section">
                        <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-black mb-2">
                                Your BMI: {state.result.bmi}
                            </div>
                            <div
                                className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${state.result.categoryColor}`}
                            >
                                {state.result.category}
                            </div>
                        </div>

                        {/* BMI Progress Bar */}
                        <div className="mb-6">
                            <div className="flex justify-between text-xs text-gray-500 mb-2">
                                <span>Underweight</span>
                                <span>Normal</span>
                                <span>Overweight</span>
                                <span>Obese</span>
                            </div>
                            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                                {/* BMI Categories Background */}
                                <div className="absolute inset-0 flex">
                                    <div className="w-[18.5%] bg-blue-300" />
                                    <div className="w-[25%] bg-green-300" />
                                    <div className="w-[25%] bg-yellow-300" />
                                    <div className="w-[31.5%] bg-red-300" />
                                </div>
                                {/* BMI Indicator */}
                                <div
                                    className="absolute top-0 w-1 h-full bg-black transition-all duration-500"
                                    style={{ left: `${state.result.indicatorPosition}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>18.5</span>
                                <span>25</span>
                                <span>30</span>
                                <span>40+</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default BMI