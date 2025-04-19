import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon, title, subtitle, description, buttonText, onClick }) => (
  <div className="bg-teal-800 text-white p-5 rounded-2xl shadow-md max-w-sm flex flex-col justify-between">
    <div>
      <div className="flex items-center gap-2 text-lg font-semibold mb-2">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <p className="text-sm text-zinc-100 mb-1">{subtitle}</p>
      <p className="text-sm mb-4">{description}</p>
    </div>
    <button 
      onClick={onClick}
      className="bg-white text-black px-4 py-2 rounded self-center hover:bg-zinc-300 transition"
    >
      {buttonText}
    </button>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '📁',
      title: 'Centralized Medical Records',
      subtitle: 'All your medical information in one secure place',
      description: "Access your complete medical history, test results, prescriptions, and doctor's notes anytime, anywhere.",
      buttonText: 'Explore Records',
      onClick: () => navigate('/records')
    },
    {
      icon: '🔔',
      title: 'Medication & Check-up Reminders',
      subtitle: 'Never miss important health appointments',
      description: 'Set personalized reminders for medications, doctor appointments, and regular health check-ups.',
      buttonText: 'Set Reminders',
      onClick: () => navigate('/reminder') 
    },
    {
      icon: '💧',
      title: 'Health Awareness & Blood Donation',
      subtitle: 'Stay informed and help save lives',
      description: 'Access health education resources and connect with blood donation centers when there’s a need.',
      buttonText: 'Learn More',
      onClick: () => navigate('/awareness')
    },
    {
      icon: '⚠️',
      title: 'Emergency Assistance',
      subtitle: 'Quick access to help when you need it most',
      description: 'One-tap emergency contacts, nearby hospital locator, and quick sharing of critical medical information.',
      buttonText: 'Emergency Services',
      onClick: () => {} // Add logic later
    },
    {
      icon: '🧠',
      title: 'AI-Powered Health Predictions',
      subtitle: 'Proactive insights for better health',
      description: 'Advanced AI analyzes your health data to provide personalized recommendations and early warning signs.',
      buttonText: 'View Insights',
      onClick: () => navigate('/health-ai-assistant')
    },
    {
      icon: '❤️',
      title: 'Holistic Health Management',
      subtitle: 'Your complete health companion',
      description: 'Track fitness goals, monitor vital signs, and maintain a comprehensive health journal all in one app.',
      buttonText: 'Start Tracking',
      onClick: () => navigate('/holistic-health')
    }
  ];

  return (
    <div className="bg-teal-200  min-h-screen py-10 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
};

export default Dashboard;
