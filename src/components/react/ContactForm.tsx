import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { isContactOpen } from '../../store'; // Adjust path as needed

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const isOpen = useStore(isContactOpen);

  if (!isOpen) return null;
  const closeContact = () => {
      isContactOpen.set(false);
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch('https://api.gurumantra.in/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus('success');
    } catch (err) {
      setStatus('idle');
      alert("Something went wrong. Please try again.");
    }
  };

  if (status === 'success') return <div className="p-8 text-green-600 font-bold border-2 border-green-100 rounded-xl bg-green-50 text-center">Message Sent! We will get back to you shortly.</div>;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-[100]">
    <form onSubmit={handleSubmit} className="space-y-4 glass p-6 rounded-2xl shadow-sm border border-gray-100">
        <button onClick={closeContact} className="absolute top-4 right-4 text-red-400 text-lg hover:text-red-600">✕</button>
      <input name="full_name" type="text" placeholder="Full Name" required className="w-full p-3 mt-8 border rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="email" type="email" placeholder="Email" required className="w-full p-3 border rounded-lg" />
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-500 glass border border-r-0 border-gray-300 rounded-l-md">+91</span>
          <input name="phone" type="tel" pattern="[0-9]{10}" placeholder="10 Digit Phone Number" required className="w-full p-3 border rounded-r-lg" />
        </div>
      </div>
      <select name="subject" className="w-full p-3 border rounded-lg glass">
        <option value="general">General Inquiry</option>
        <option value="admission">Admission / Courses</option>
        <option value="startup">Startup Incubation</option>
        <option value="project">Final Year Project Support</option>
        <option value="internship">Internship / Full-time Placement</option>
      </select>
      <textarea name="message" rows={4} placeholder="How can we help you?" required className="w-full p-3 border rounded-lg"></textarea>
      <button disabled={status === 'submitting'} className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50 transition-all">
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
    </div>
  );
};

export default ContactForm;