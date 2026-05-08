// src/components/react/PathfinderQuiz.tsx
import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { isQuizOpen } from '../../store'; // Adjust path as needed

// interface PathfinderQuizProps {
//   id?: string; // Add this line
//   isOpen: boolean;
//   onClose: () => void;
// }

const PathfinderQuiz = () => {
  // The component now manages its own visibility based on the store
  const isOpen = useStore(isQuizOpen);
  
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    intent: '', skill: '', interest: '', fullname: '', email: '', phone: ''
  });

  if (!isOpen) return null;

  const closeQuiz = () => {
    isQuizOpen.set(false);
    setStep(0); // Reset for next time
  };

  const steps = [
    { key: 'intent', title: "What's your primary goal?", options: ["Final Year Project", "Start-up Incubation", "Career/Job Search", "Research Paper"] },
    { key: 'skill', title: "Your AI/ML skill level?", options: ["Beginner", "Intermediate", "Advanced"] },
    { key: 'interest', title: "Main Interest?", options: ["Generative AI", "Web Development", "Robotics", "Data Science"] }
  ];

  const handleNext = (val: string) => {
    setFormData({ ...formData, [steps[step].key]: val });
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://api.gurumantra.in/pathfinder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Success! Check your email for the PDF.");
        closeQuiz();
      }
    } catch (error) {
        console.error("Submission failed", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-[100]">
      <div className="glass rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
        <button onClick={closeQuiz} className="absolute top-4 right-4 text-red-400 hover:text-red-600">✕</button>

        {step < 3 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <p className="text-sm font-semibold text-pink-600 mb-2">Step {step + 1} of 4</p>
            <h2 className="text-2xl font-bold text-purple-400 mb-6">{steps[step].title}</h2>
            <div className="grid gap-3">
              {steps[step].options.map((opt) => (
                <button key={opt} onClick={() => handleNext(opt)} className="w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-purple-500 hover:border-purple-500 transition-all">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-center">
            <h2 className="text-2xl font-bold mb-2">Almost there!</h2>
            <p className="text-gray-500 mb-6">Enter your details to download your AI Career Roadmap PDF.</p>
            <input 
              type="text" placeholder="Full Name" required
              className="w-full p-3 mb-3 border rounded-lg outline-blue-500"
              onChange={e => setFormData({...formData, fullname: e.target.value})}
            />
            <input 
              type="email" placeholder="Email Address" required
              className="w-full p-3 mb-3 border rounded-lg outline-blue-500"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <input 
              type="tel" placeholder="10 Digit Phone Number" required pattern="[0-9]{10}"
              className="w-full p-3 mb-6 border rounded-lg outline-blue-500"
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
            <button 
              disabled={loading}
              className="w-full bg-purple-500 text-white py-3 rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Get My Free Guide →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PathfinderQuiz;