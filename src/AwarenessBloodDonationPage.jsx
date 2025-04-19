import React from "react";

const AwarenessBloodDonationPage = () => {
  // Sample data – you can later fetch this dynamically
  const upcomingEvents = [
    {
      type: "Blood Donation Camp",
      date: "April 25, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "City Health Center, MG Road",
      mapLink: "https://www.google.com/maps?q=City+Health+Center+MG+Road",
    },
    {
      type: "Free Health Check-up Camp",
      date: "May 2, 2025",
      time: "9:00 AM - 1:00 PM",
      location: "Community Hall, Indiranagar",
      mapLink: "https://www.google.com/maps?q=Community+Hall+Indiranagar",
    },
  ];

  return (
    <div className="min-h-screen bg-teal-200 text-teal-700 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Health Awareness & Blood Donation</h1>
        <p className="text-black-300 mb-6">
          Stay informed about health camps and make a difference by participating in blood donation drives.
        </p>

        {/* Upcoming Events */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-red-400">Upcoming Events</h2>
          {upcomingEvents.map((event, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded mb-4">
              <h3 className="text-xl font-semibold">{event.type}</h3>
              <p className="text-gray-300">
                📅 <strong>Date:</strong> {event.date} <br />
                🕒 <strong>Time:</strong> {event.time} <br />
                📍 <strong>Location:</strong> {event.location} <br />
                🔗{" "}
                <a href={event.mapLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                  View on Map
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://www.google.com/maps/search/blood+donation+centers+near+me"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-medium"
          >
            Find Nearby Centers
          </a>
        </div>
      </div>
    </div>
  );
};

export default AwarenessBloodDonationPage;