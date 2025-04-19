// components/Sidebar.js
import { FaUserMd, FaNotesMedical, FaCalendarAlt, FaBell, FaChartBar } from 'react-icons/fa';

const Sidebar = () => (
  <aside className="w-64 h-screen bg-black text-white flex flex-col p-4">
    <h1 className="text-2xl font-bold mb-6">Health Connect</h1>
    <nav className="space-y-4">
      <a href="#" className="flex items-center space-x-2 hover:text-teal-400">
        <FaUserMd /> <span>Patient Overview</span>
      </a>
      <a href="#" className="flex items-center space-x-2 hover:text-teal-400">
        <FaNotesMedical /> <span>Health Records</span>
      </a>
      <a href="#" className="flex items-center space-x-2 hover:text-teal-400">
        <FaCalendarAlt /> <span>Appointments</span>
      </a>
      <a href="#" className="flex items-center space-x-2 hover:text-teal-400">
        <FaBell /> <span>Emergency Alerts</span>
      </a>
      <a href="#" className="flex items-center space-x-2 hover:text-teal-400">
        <FaChartBar /> <span>Health Analytics</span>
      </a>
    </nav>
  </aside>
);

export default Sidebar;
