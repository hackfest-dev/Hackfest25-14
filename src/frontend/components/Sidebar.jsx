import { FaUserInjured, FaCalendarAlt, FaPills, FaComments } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col py-6 px-4 space-y-6 shadow-lg">
      <h1 className="text-3xl font-bold text-center text-teal-400">Doctor</h1>
      <nav className="flex flex-col gap-4">
        <a href="#" className="flex items-center gap-3 hover:text-teal-300">
          <FaUserInjured />
          Patient Overview
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-teal-300">
          <FaCalendarAlt />
          Appointment Management
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-teal-300">
          <FaPills />
          Medication History
        </a>
        <a href="#" className="flex items-center gap-3 hover:text-teal-300">
          <FaComments />
          Communication
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
