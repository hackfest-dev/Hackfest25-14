import React, { useState, useEffect } from 'react';
import './ReminderForm.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Declare outside component to avoid reset
const triggeredReminders = new Set();

const PatientReminderForm = () => {
  const [patientName, setPatientName] = useState('');
  const [medicine, setMedicine] = useState({ name: '', time: '', days: [] });
  const [medicines, setMedicines] = useState([]);
  const [checkupReminder, setCheckupReminder] = useState('');
  const [checkupDate, setCheckupDate] = useState('');
  const [checkupTime, setCheckupTime] = useState('');
  const [checkups, setCheckups] = useState([]);


  const today = new Date().toISOString().split('T')[0];
  const todayDay = daysOfWeek[new Date().getDay()];

  const handleMedicineChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...medicine, [name]: value });
  };

  const handleDayToggle = (day) => {
    const updatedDays = medicine.days.includes(day)
      ? medicine.days.filter(d => d !== day)
      : [...medicine.days, day];
    setMedicine({ ...medicine, days: updatedDays });
  };

  const addMedicine = () => {
    if (medicine.name && medicine.time && medicine.days.length > 0) {
      const formatted = {
        name: medicine.name,
        time: medicine.time,
        days: medicine.days
      };
      setMedicines([...medicines, formatted]);
      toast.success(`💊 Reminder set for ${medicine.name} at ${medicine.time}`);
      setMedicine({ name: '', time: '', days: [] });
    } else {
      alert('Please complete the medicine details.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      name: patientName,
      medicines,
      checkupReminder: checkupReminder && checkupDate && checkupTime
        ? { note: checkupReminder, date: checkupDate, time: checkupTime }
        : null
    };
  
    try {
      const res = await fetch('http://localhost:5000/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.error('Server error:', data);
        toast.error(`❌ Failed to save reminder. ${data?.message || res.statusText}`);
        return;
      }
  
      toast.success('✅ Reminder saved successfully!');
      console.log(data);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('❌ Failed to save reminder.');
    }
  };
  

  const getTimeNowFormatted = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm}`;
  };

  const normalizeTime = (timeString) => {
    const date = new Date(`1970-01-01T${convertTo24Hr(timeString)}:00`);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };
  // Support function for consistent 12hr format
const convertTo24Hr = (time12h) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (modifier === 'PM' && hours !== '12') hours = parseInt(hours, 10) + 12;
  if (modifier === 'AM' && hours === '12') hours = '00';
  return `${hours}:${minutes}`;
};

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = getTimeNowFormatted();
      const currentDate = new Date().toISOString().split('T')[0];
      const currentDay = daysOfWeek[new Date().getDay()];
  
      console.log("⏰ Checking reminders at:", currentTime, currentDate);
  
      // MEDICINE REMINDER
      medicines.forEach((med) => {
        const key = `med|${med.name}|${med.time}|${currentDate}`;
        if (
          med.days.includes(currentDay) &&
          normalizeTime(med.time) === currentTime &&
          !triggeredReminders.has(key)
        ) {
          toast.info(`💊 Time to take ${med.name} at ${med.time}`, {
            autoClose: false,
            closeButton: true
          });
          triggeredReminders.add(key);
        }
      });
  
      // CHECKUP REMINDER
      checkups.forEach((chk) => {
        const key = `checkup|${chk.note}|${chk.time}|${chk.date}`;
        if (
          chk.date === currentDate &&
          normalizeTime(chk.time) === currentTime &&
          !triggeredReminders.has(key)
        ) {
          toast.info(`📅 Today’s Check-Up: ${chk.note} at ${chk.time}`, {
            autoClose: false,
            closeButton: true
          });
          triggeredReminders.add(key);
        }
      });
  
    }, 1000); // every second
  
    return () => clearInterval(interval);
  }, [medicines, checkups]);

  return (
    <>
      <form className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold">Set Patient Reminder</h2>

        <div>
          <label className="block mb-1">Patient Name:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* MEDICINE SECTION */}
        <div className="border border-gray-200 p-4 rounded">
          <h3 className="font-semibold mb-2">Add Medicine</h3>
          <input
            type="text"
            name="name"
            placeholder="Medicine name"
            value={medicine.name}
            onChange={handleMedicineChange}
            className="w-full p-2 border mb-2 rounded"
          />
          <input
            type="text"
            name="time"
            placeholder="e.g. 08:30 AM"
            value={medicine.time}
            onChange={handleMedicineChange}
            className="w-full p-2 border mb-2 rounded"
          />

          <div className="flex flex-wrap gap-2 mb-2">
            {daysOfWeek.map(day => (
              <label key={day} className="text-sm">
                <input
                  type="checkbox"
                  checked={medicine.days.includes(day)}
                  onChange={() => handleDayToggle(day)}
                />{' '}
                {day}
              </label>
            ))}
          </div>
          <button type="button" onClick={addMedicine} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
            Add Medicine
          </button>
        </div>

        {/* MEDICINE DISPLAY */}
        {medicines.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mt-4">All Medicines Added:</h3>
            <ul className="list-disc pl-6">
              {medicines.map((med, idx) => (
                <li key={idx}>
                  {med.name} - {med.time} on {med.days.join(', ')}
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-lg mt-4 text-blue-600">Today's Reminders ({todayDay}):</h3>
            <ul className="list-disc pl-6">
              {medicines.filter(med => med.days.includes(todayDay)).map((med, idx) => (
                <li key={idx}>
                  💊 {med.name} at {med.time}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CHECKUP SECTION */}
        <div className="mt-4 border border-gray-200 p-4 rounded">
          <h3 className="font-semibold mb-2">Add Check-Up Reminder</h3>
          <input
            type="text"
            placeholder="Check-up note"
            value={checkupReminder}
            onChange={(e) => setCheckupReminder(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          <input
            type="date"
            value={checkupDate}
            onChange={(e) => setCheckupDate(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          <input
            type="text"
            placeholder="e.g. 10:45 AM"
            value={checkupTime}
            onChange={(e) => setCheckupTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
  type="button"
  onClick={() => {
    if (checkupReminder && checkupDate && checkupTime) {
      const newCheckup = {
        note: checkupReminder,
        date: checkupDate,
        time: checkupTime
      };
      setCheckups(prev => [...prev, newCheckup]);
      toast.success(`📅 Check-up reminder set for ${checkupDate} at ${checkupTime}`);
      setCheckupReminder('');
      setCheckupDate('');
      setCheckupTime('');
    } else {
      alert('Please complete all check-up details.');
    }
  }}
  
  className="bg-purple-500 text-white px-3 py-1 mt-2 rounded hover:bg-purple-600"
>
  Add Check-Up
</button>
{checkups.length > 0 && (
  <div className="mt-4">
    <h3 className="font-semibold text-lg text-purple-600">All Check-Up Reminders:</h3>
    <ul className="list-disc pl-6">
      {checkups.map((chk, idx) => (
        <li key={idx}>
          📅 {chk.note} on {chk.date} at {chk.time}
        </li>
      ))}
    </ul>
  </div>
)}

{checkups.length > 0 && (
  <div className="mt-4">
    <h3 className="font-semibold text-lg text-red-600">Today’s Check-Ups:</h3>
    <ul className="list-disc pl-6">
      {checkups
        .filter(chk => chk.date === today)
        .map((chk, idx) => (
          <li key={idx}>
            📅 {chk.note} at {chk.time}
          </li>
        ))}
    </ul>
  </div>
)}

       {/*<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save All Reminders
        </button>*/}
      </form>

      <ToastContainer />
    </>
  );
};

export default PatientReminderForm;
