import React from "react";

interface StepExplanationProps {
  step: number;
  type: string;
  // instruction: string;
  description: React.ReactNode;
  name: string;
  code: string;
}

const StepExplanation: React.FC<StepExplanationProps> = ({
  step,
  code,
  type: typ,
  name,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-2 break-words">
      <h2 className="text-xl font-bold mb-4">
        Step {step + 1} - {name}
      </h2>
      <div className="step relative">
        <div className="bg-gray-100 p-4 pt-6 rounded mb-4 break-words">
          <code className="text-sm">{code}</code>
        </div>
        <pre className="ml-1 block text-xs absolute top-[-0.5rem] rounded-lg bg-gray-300 p-1">
          <code>{typ}</code>
        </pre>
      </div>
      {description}
    </div>
  );
};

export default StepExplanation;
