import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import PatientReminderForm from "./frontend/components/PatientReminderForm"; 
import BloodTestResultPage from "./frontend/pages/BloodTestResultPage";  
import AnnualPhysicalPage from "./frontend/pages/AnnualPhysicalPage";
import VaccinationRecordPage from "./frontend/pages/VaccinationRecordPage";
import ExploreRecordsPage from './frontend/pages/ExploreRecordsPage';
import ShareWithDoctorPage from './frontend/pages/ShareWithDoctorPage';
import AwarenessBloodDonationPage from './AwarenessBloodDonationPage'; // ✅ Import this component
import HolisticHealthPage from './HolisticHealthPage'; 
import HealthAIAssistant from './HealthAIAssistant';  
import DoctorDashboard from "./frontend/pages/DoctorDashboard";
import OverviewCards from './frontend/components/OverviewCards'; 



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blood-test-results" component={BloodTestResultPage} />
        <Route path="/annual-physical" element={<AnnualPhysicalPage />} />
        <Route path="/vaccination-record" element={<VaccinationRecordPage />} />
        <Route path="/records" element={<ExploreRecordsPage />} />
        <Route path="/share-doctor" element={<ShareWithDoctorPage />} />
        <Route path="/awareness" element={<AwarenessBloodDonationPage />} /> {/* ✅ Add this */}
        <Route path="/holistic-health" element={<HolisticHealthPage />} />
        <Route path="/health-ai-assistant" element={<HealthAIAssistant />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/reminder" element={<PatientReminderForm />} />
      </Routes>
    </Router>
  );
}

export default App;
