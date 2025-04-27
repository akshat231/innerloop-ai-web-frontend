import React, { useState } from 'react';
import { createJournalEntry } from '../api/journal';

const JournalEntryForm = ({ userId }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    try {
      setLoading(true);
      await createJournalEntry(userId, text);
      setText('');
      alert('Journal entry submitted!');
    } catch (error) {
      alert('Failed to submit entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write about your day..."
        className="w-full h-32 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition"
      >
        {loading ? 'Submitting...' : 'Submit Entry'}
      </button>
    </form>
  );
};

export default JournalEntryForm;
