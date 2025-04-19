import React from 'react';

const PatientList = () => {
  // Example patient data (this would typically come from an API)
  const patients = [
    { name: "John Doe", age: 30, condition: "Hypertension" },
    { name: "Jane Smith", age: 45, condition: "Diabetes" },
    { name: "Sam Wilson", age: 60, condition: "Arthritis" },
  ];

  return (
    <div>
      <ul>
        {patients.map((patient, index) => (
          <li key={index} className="text-sm text-gray-600 mb-4">
            <p className="font-semibold">{patient.name}</p>
            <p>Age: {patient.age}</p>
            <p>Condition: {patient.condition}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
