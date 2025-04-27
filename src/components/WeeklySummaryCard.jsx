import React, { useState, useEffect } from 'react';
import { fetchWeeklySummary } from '../api/journal';

const WeeklySummary = ({ userId }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSummary = async () => {
      try {
        setLoading(true);
        const response = await fetchWeeklySummary(userId);
        if (response.data) {
          setSummary(response.data);
        } else {
          setSummary(null);
        }
      } catch (error) {
        console.error('Failed to fetch summary:', error);
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };

    getSummary();
  }, [userId]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading summary...</div>;
  }

  if (!summary) {
    return <div className="text-center text-gray-400">No weekly summary available yet.</div>;
  }

  const {
    mood = "Unknown",
    emotions = [],
    themes = [],
    patterns = "No patterns identified.",
    suggestion = "No suggestions available.",
    affirmation = "Stay positive!",
  } = summary;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">This Week's Reflection</h2>
      <div className="mb-4">
        <p className="text-gray-700"><strong>Mood:</strong> {mood}</p>
        <p className="text-gray-700"><strong>Emotions:</strong> {emotions.length > 0 ? emotions.join(', ') : "No emotions recorded."}</p>
        <p className="text-gray-700"><strong>Themes:</strong> {themes.length > 0 ? themes.join(', ') : "No themes recorded."}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700"><strong>Patterns:</strong> {patterns}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700"><strong>Suggestion:</strong> {suggestion}</p>
      </div>
      <div>
        <p className="text-gray-700"><strong>AFFIRMATION:</strong> {affirmation}</p>
      </div>
    </div>
  );
};

export default WeeklySummary;
