import React from 'react';
import PatientAlerts from './PatientAlerts';
import PatientList from './PatientList';
import RecentActivity from './RecentActivity';

const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800">Patient Alerts</h2>
        <PatientAlerts />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800">Patient List</h2>
        <PatientList />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
        <RecentActivity />
      </div>
    </div>
  );
};

export default OverviewCards;
