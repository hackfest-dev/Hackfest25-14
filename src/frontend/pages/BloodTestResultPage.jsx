import React from "react";

const BloodTestResultPage = () => {
  const bloodTest = {
    date: "2025-04-15",
    labName: "City Diagnostic Center",
    doctor: "Dr. Meena Rao",
    results: [
      { label: "Hemoglobin", value: "13.5 g/dL", normal: "12-16 g/dL" },
      { label: "WBC Count", value: "6,200 /µL", normal: "4,000-11,000 /µL" },
      { label: "Platelets", value: "250,000 /µL", normal: "150,000-450,000 /µL" },
      { label: "Fasting Glucose", value: "105 mg/dL", normal: "70-100 mg/dL" },
      { label: "Cholesterol", value: "220 mg/dL", normal: "< 200 mg/dL" },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">🧪 Blood Test Results</h1>
        <p className="text-gray-300 mb-2">Date: {bloodTest.date}</p>
        <p className="text-gray-300 mb-2">Lab: {bloodTest.labName}</p>
        <p className="text-gray-300 mb-4">Doctor: {bloodTest.doctor}</p>

        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="pb-2">Parameter</th>
              <th className="pb-2">Result</th>
              <th className="pb-2">Normal Range</th>
            </tr>
          </thead>
          <tbody>
            {bloodTest.results.map((test, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="py-2 text-white">{test.label}</td>
                <td className="py-2 text-green-400">{test.value}</td>
                <td className="py-2 text-gray-400">{test.normal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodTestResultPage;