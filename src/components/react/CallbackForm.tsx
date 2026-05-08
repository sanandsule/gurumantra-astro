import React, { useState } from 'react';

const CallbackForm = () => {
  const [sent, setSent] = useState(false);

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = { phone: formData.get('phone'), timestamp: new Date().toISOString() };

    await fetch('https://api.gurumantra.in/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSent(true);
  };

  if (sent) return <p className="text-blue-600 font-medium">Talk to you soon! 📞</p>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <div className="flex flex-1">
        <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">+91</span>
        <input name="phone" type="tel" required pattern="[0-9]{10}" placeholder="Your Phone Number" className="flex-1 p-3 border border-gray-300 rounded-r-lg" />
      </div>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
        Request Callback
      </button>
    </form>
  );
};

export default CallbackForm;