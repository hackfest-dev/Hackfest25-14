import React, { useState } from "react";

const HolisticHealthPage = () => {
  const [inputs, setInputs] = useState({
    height: '',
    weight: '',
    bp: '',
    diabetes: '',
    cholesterol: '',
  });

  const calculateBMI = () => {
    const heightInMeters = parseFloat(inputs.height) / 100;
    const weight = parseFloat(inputs.weight);
    if (!heightInMeters || !weight) return 0;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getPrecautions = () => {
    const notes = [];
    const bmi = parseFloat(calculateBMI());
    if (bmi > 25) {
      notes.push("Your BMI is high. Consider regular exercise and a balanced diet.");
    }
    const bpValues = inputs.bp.split("/").map(Number);
    if (bpValues[0] > 130 || bpValues[1] > 85) {
      notes.push("Your blood pressure is elevated. Reduce salt intake and manage stress.");
    }
    if (parseFloat(inputs.diabetes) > 140) {
      notes.push("High blood sugar detected. Reduce sugar and carbs; monitor glucose levels.");
    }
    if (parseFloat(inputs.cholesterol) > 200) {
      notes.push("Your cholesterol is high. Avoid oily foods and include fiber-rich meals.");
    }
    return notes;
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const bmi = calculateBMI();

  return (
    <div className="min-h-screen bg-teal-200 text-teal-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Holistic Health Dashboard</h1>
        <p className="text-gray-300 mb-8">Enter your details after your hospital check-up.</p>

        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-teal-500 p-4 rounded">
            <label className="block mb-2 font-semibold">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={inputs.height}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-300 text-black"
              placeholder="e.g. 170"
            />
          </div>
          <div className="bg-teal-500 p-4 rounded">
            <label className="block mb-2 font-semibold">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={inputs.weight}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-300 text-black"
              placeholder="e.g. 70"
            />
          </div>
          <div className="bg-teal-500 p-4 rounded">
            <label className="block mb-2 font-semibold">Blood Pressure (e.g. 120/80)</label>
            <input
              type="text"
              name="bp"
              value={inputs.bp}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-300 text-black"
              placeholder="e.g. 120/80"
            />
          </div>
          <div className="bg-teal-500 p-4 rounded">
            <label className="block mb-2 font-semibold">Blood Sugar (mg/dL)</label>
            <input
              type="number"
              name="diabetes"
              value={inputs.diabetes}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-300 text-black"
              placeholder="e.g. 110"
            />
          </div>
          <div className="bg-teal-500 p-4 rounded col-span-2">
            <label className="block mb-2 font-semibold">Cholesterol (mg/dL)</label>
            <input
              type="number"
              name="cholesterol"
              value={inputs.cholesterol}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-300 text-black"
              placeholder="e.g. 180"
            />
          </div>
        </div>

        <div className="bg-teal-500 p-4 rounded mb-8">
          <h2 className="text-xl font-semibold mb-2">📊 Calculated BMI</h2>
          <p className="text-2xl">{bmi || "--"}</p>
        </div>

        <div className="bg-red-600 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">⚠ Health Precautions</h2>
          <ul className="list-disc list-inside text-white space-y-1">
            {getPrecautions().map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HolisticHealthPage;