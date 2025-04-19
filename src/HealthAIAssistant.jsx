import React, { useState } from "react";

const HealthAIAssistant = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleAskAI = () => {
    if (query.trim() === "") {
      setResponse("Please enter a health-related query.");
      return;
    }

    const q = query.toLowerCase();
    let advice = "";

    if (q.includes("headache")) {
      advice = "For headaches, stay hydrated, rest, avoid screen exposure, and try cold compresses. Persistent headaches should be evaluated by a physician.";
    } else if (q.includes("diabetes")) {
      advice = "Control diabetes by following a low-sugar, high-fiber diet, exercising regularly, and checking your blood sugar levels as advised.";
    } else if (q.includes("bmi")) {
      advice = "A high BMI suggests potential overweight. Try regular cardio, portion control, and track your weight over time.";
    } else if (q.includes("cough")) {
      advice = "Stay hydrated, inhale steam, and avoid irritants. Use cough syrups if needed. If the cough lasts more than 2 weeks, consult a doctor.";
    } else if (q.includes("fever")) {
      advice = "Drink fluids, rest, and use paracetamol for fever. Monitor the temperature. Seek medical help if it exceeds 102°F or persists.";
    } else if (q.includes("cold")) {
      advice = "Use warm fluids, rest, and vitamin C. Avoid sudden temperature changes. If symptoms persist, consult a healthcare provider.";
    } else if (q.includes("blood pressure") || q.includes("bp")) {
      advice = "To manage high BP, reduce salt, exercise daily, and monitor regularly. If it's consistently high, consult your physician for medication.";
    } else if (q.includes("cholesterol")) {
      advice = "Avoid fried foods, increase fiber intake, exercise, and consider heart-healthy fats. Get tested regularly to monitor levels.";
    } else if (q.includes("fatigue")) {
      advice = "Fatigue can result from stress, poor sleep, or nutritional deficiency. Ensure good sleep, eat well, and rule out thyroid issues.";
    } else if (q.includes("stomach pain")) {
      advice = "Rest your stomach, avoid spicy food, and drink plenty of fluids. If pain is severe or persistent, get a medical check-up.";
    } else if (q.includes("chest pain")) {
      advice = "Chest pain can be serious. Seek immediate medical attention to rule out heart-related issues, especially if accompanied by shortness of breath or nausea.";
    } else if (q.includes("lump")) {
      advice = "Any lump in the body should be evaluated by a doctor. It could be benign or something serious, so early examination is key.";
    } else if (q.includes("sore eye")) {
      advice = "A sore eye may be due to infection or irritation. Avoid rubbing, use clean water or eye drops, and consult an eye specialist if it persists.";
    } else if (q.includes("ear pain")) {
      advice = "Ear pain may be caused by infection, wax buildup, or pressure changes. Avoid poking inside the ear and consult an ENT specialist.";
    } else if (q.includes("muscle catch") || q.includes("muscle cramp")) {
      advice = "Apply a warm compress, gently stretch the muscle, and stay hydrated. Magnesium deficiency can also cause cramps.";
    } else if (q.includes("period") || q.includes("menstruation") || q.includes("menstrual")) {
      advice = "For period-related issues: stay hydrated, apply a warm compress to the lower abdomen, and rest. Over-the-counter pain relief like ibuprofen can help. If your period lasts more than 7 days, is extremely painful, or irregular, it's important to consult a gynecologist for further evaluation.";
    } else {
      advice = "Please consult a medical professional for personalized advice. This AI assistant provides general suggestions based on symptoms.";
    }

    setResponse(advice);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">AI Health Assistant</h1>
        <p className="text-gray-300 mb-6">
          Ask anything related to your health, symptoms, or precautions. Our AI assistant will give basic advice.
        </p>

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white mb-4"
          rows={4}
          placeholder="e.g. What should I do if I have a constant headache?"
        ></textarea>

        <button
          onClick={handleAskAI}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-medium"
        >
          Ask AI
        </button>

        {response && (
          <div className="mt-6 bg-gray-900 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">💡 AI Response</h2>
            <p className="text-gray-200">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthAIAssistant;