import React from 'react';

const PatientAlerts = () => {
  // Example alert data (this would typically come from an API)
  const alerts = [
    "Patient 1 needs a medication refill",
    "Patient 2 missed an appointment",
    "Patient 3 has a scheduled check-up tomorrow",
  ];

  return (
    <div>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index} className="text-sm text-gray-600 mb-2">
            {alert}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientAlerts;
