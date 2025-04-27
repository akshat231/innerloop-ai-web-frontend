import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchMoodTrends } from '../api/journal';

const moodToScore = (mood) => {
  // Map moods to numeric scores
  const mapping = {
    happy: 9,
    content: 8,
    neutral: 5,
    sad: 3,
    anxious: 4,
    overwhelmed: 2,
    excited: 9,
    grateful: 8,
    stressed: 3,
    angry: 2,
  };
  return mapping[mood.toLowerCase()] || 5; // default to 5 if mood unknown
};

const MoodTrendChart = ({ userId }) => {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const getMoodTrends = async () => {
      try {
        const response = await fetchMoodTrends(userId, 7);
        const mappedData = response.data.map(entry => ({
          date: entry.date.slice(5), // only MM-DD
          mood: moodToScore(entry.mood),
        }));
        setMoodData(mappedData);
      } catch (error) {
        console.error('Error fetching mood trends:', error);
      }
    };

    if (userId) {
      getMoodTrends();
    }
  }, [userId]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-bold mb-4 text-indigo-700">Mood Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={moodData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Line type="monotone" dataKey="mood" stroke="#6366F1" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodTrendChart;
