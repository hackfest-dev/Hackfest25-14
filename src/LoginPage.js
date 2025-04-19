import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const showUserLogin = () => {
    document.getElementById("user-login").classList.remove("hidden");
    document.getElementById("user-login").scrollIntoView({ behavior: "smooth" });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
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
              onClick={showUserLogin}
              className="bg-teal-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-teal-600 transition-transform transform hover:scale-105 duration-300"
            >
              Patients
            </button>
            <button
              onClick={() => navigate("/doctor-dashboard")}
              className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 duration-300"
            >
              Doctors
            </button>
            <button
              className="bg-purple-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-purple-600 transition-transform transform hover:scale-105 duration-300"
            >
              Ambulance
            </button>
            <button
              className="bg-pink-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-pink-600 transition-transform transform hover:scale-105 duration-300"
            >
              Blood Bank
            </button>
          </div>

          {/* Glassmorphism Login Card */}
          <div
            id="user-login"
            className="hidden mx-auto mt-6 max-w-md bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-teal-200"
          >
            <h3 className="text-2xl font-bold mb-6 text-teal-700 text-center">User Login (Aadhaar)</h3>
            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Aadhaar Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                  placeholder="Enter Aadhaar"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">OTP</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                  placeholder="Enter OTP"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </section>

        <section className="text-center mt-10">
          <h3 className="text-2xl font-semibold text-red-600 mb-4">Emergency Request</h3>
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-transform transform hover:scale-105 duration-300 shadow-md"
          >
            Request Emergency Help
          </button>
        </section>
      </main>
    </div>
  );
}
