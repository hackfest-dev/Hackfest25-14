import Sidebar from "../components/Sidebar";
import PatientOverview from "../components/PatientOverview";

const DoctorDashboard = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-4">
        <PatientOverview />
      </div>
    </div>
  );
};

export default DoctorDashboard;
