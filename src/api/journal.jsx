import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL; // your backend URL

export const createJournalEntry = async (userId, text) => {
  try {

    const response = await axios.post(`${API_BASE_URL}/journal/entry`, {
      userId,
      text,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating journal entry:', error);
    throw error;
  }
};

export const fetchWeeklySummary = async (userId, weekStart) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/journal/weekly`, {
      params: {
        userId,
        weekStart,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weekly summary:', error);
    throw error;
  }
};

export const fetchMoodTrends = async (userId, period) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/journal/mood-trends`, {
      params: {
        userId,
        period,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching mood trends:', error);
    throw error;
  }
};

export const loginUser = async (email, name) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, {
      email,
      name,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
