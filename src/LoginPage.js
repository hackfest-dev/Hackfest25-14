import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmergencyModal from './frontend/components/EmergencyModal';
import LiveMap from './frontend/components/LiveMap';



export default function LoginPage() {
  const navigate = useNavigate();

  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showAmbulanceModal, setShowAmbulanceModal] = useState(false);
  const [showBloodBankModal, setShowBloodBankModal] = useState(false);

  const handlePatientLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleDoctorLogin = (e) => {
    e.preventDefault();
    navigate("/doctor-dashboard");
  };

  const handleAmbulanceLogin = (e) => {
    e.preventDefault();
    navigate("/ambulance-dashboard");
  };

  const handleBloodBankLogin = (e) => {
    e.preventDefault();
    navigate("/bloodbank-dashboard");
  };

  return (
    <div className="bg-gradient-to-r from-teal-100 via-white to-teal-200 text-gray-800 min-h-screen font-sans">
      <header className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-6 shadow-md text-center">
        <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-md">MEDISYNC</h1>
        <p className="text-lg mt-2 font-medium">Connecting Healthcare Seamlessly</p>
      </header>

      <main className="p-8 flex flex-col items-center space-y-16">
        <section className="max-w-4xl text-center">
          <h2 className="text-3xl font-semibold text-teal-700 mb-4">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Medisync is a unified digital healthcare platform that links Aadhaar-based records
            with intelligent services to streamline your medical journey.
          </p>
        </section>

        <section className="w-full max-w-4xl text-center">
          <h2 className="text-2xl font-semibold mb-8 text-teal-600">Choose Your Portal</h2>
          <div className="flex flex-wrap justify-center gap-5 mb-8">
            <button
              onClick={() => setShowPatientModal(true)}
              className="bg-teal-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-teal-600 transition-transform transform hover:scale-105 duration-300"
            >
              Patients
            </button>
            <button
              onClick={() => setShowDoctorModal(true)}
              className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 duration-300"
            >
              Doctors
            </button>
            <button
              onClick={() => setShowAmbulanceModal(true)}
              className="bg-purple-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-purple-600 transition-transform transform hover:scale-105 duration-300"
            >
              Ambulance
            </button>
            <button
              onClick={() => setShowBloodBankModal(true)}
              className="bg-pink-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-pink-600 transition-transform transform hover:scale-105 duration-300"
            >
              Blood Bank
            </button>
          </div>
        </section>

        <section className="text-center mt-10">
  <h3 className="text-2xl font-semibold text-red-600 mb-4">Emergency Request</h3>
  <button
    className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-transform transform hover:scale-105 duration-300 shadow-md"
    onClick={() => setShowEmergencyModal(true)} // ✅ Show modal on click
  >
    Request Emergency Help
  </button>

  {/* ✅ Show EmergencyModal + LiveMap if true */}
  {showEmergencyModal && (
    <>
      <EmergencyModal isOpen={showEmergencyModal} onClose={() => setShowEmergencyModal(false)} />
      <LiveMap />
    </>
  )}
</section>

      </main>

      {/* Patient Modal */}
      {showPatientModal && (
        <Modal title="Patient Login" onClose={() => setShowPatientModal(false)} onSubmit={handlePatientLogin}>
          <Input label="Aadhaar Number" type="text" placeholder="Enter Aadhaar" pattern="\d{12}" maxLength={12} />
          <Input label="OTP" type="text" placeholder="Enter OTP" pattern="\d{4}" maxLength={4} />
        </Modal>
      )}

      {/* Doctor Modal */}
      {showDoctorModal && (
        <Modal title="Doctor Login" onClose={() => setShowDoctorModal(false)} onSubmit={handleDoctorLogin}>
          <Input label="Employee ID" type="text" placeholder="Enter Employee ID" />
          <Input label="Password" type="password" placeholder="Enter Password" />
        </Modal>
      )}

      {/* Ambulance Modal */}
      {showAmbulanceModal && (
        <Modal title="Ambulance Login" onClose={() => setShowAmbulanceModal(false)} onSubmit={handleAmbulanceLogin}>
          <Input label="Vehicle ID" type="text" placeholder="Enter Vehicle ID" />
          <Input label="Password" type="password" placeholder="Enter Password" />
        </Modal>
      )}

      {/* Blood Bank Modal */}
      {showBloodBankModal && (
        <Modal title="Blood Bank Login" onClose={() => setShowBloodBankModal(false)} onSubmit={handleBloodBankLogin}>
          <Input label="Center ID" type="text" placeholder="Enter Center ID" />
          <Input label="Password" type="password" placeholder="Enter Password" />
        </Modal>
      )}
    </div>
  );
}

// 🔹 Reusable Modal Component
function Modal({ title, onClose, onSubmit, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        <form className="space-y-5" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// 🔹 Reusable Input Component
function Input({ label, type, placeholder, pattern, maxLength }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
      <input
        type={type}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        required
      />
    </div>
  );
}
