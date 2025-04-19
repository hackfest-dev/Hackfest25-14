import React from 'react';

const RecentActivity = () => {
  // Example activity data (this would typically come from an API)
  const activities = [
    "Patient 1 had a successful surgery",
    "Patient 2 updated their health records",
    "Patient 3 was discharged from the hospital",
  ];

  return (
    <div>
      <ul>
        {activities.map((activity, index) => (
          <li key={index} className="text-sm text-gray-600 mb-2">
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
