import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import JournalForm from './components/JournalForm';
import WeeklySummaryCard from './components/WeeklySummaryCard';
import MoodTrendChart from './components/MoodTrendChart';
import VoiceRecorder from './components/VoiceRecorder';
import Login from './components/Login'; // Login screen

const App = () => {
  const [user, setUser] = useState(null); // { userId, email, name }


  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // 🆕 clear localStorage
  };


  useEffect(() => {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // 🆕 save to localStorage
  };




  useEffect(() => {
    if (!user) return; // don't fetch if not logged in
  }, [user]);

  // If user not logged in yet, show Login
  if (!user) {
    return <Login onLoginSuccess={(userId, email, name) => { handleLoginSuccess({userId, email, name}); setUser({ userId, email, name })}} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-1 container mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">
            Welcome, {user.name} 👋
          </h2>

          <JournalForm
           userId = {user.userId}
          />

          {/* Voice Input (optional) */}
          {/* <VoiceRecorder
            onResult={(voiceText) =>
              setJournalText((prev) => (prev ? prev + ' ' + voiceText : voiceText))
            }
          /> */}
        </section>

        <section className="mb-8">
          <WeeklySummaryCard userId={user.userId} />
        </section>

        <section>
          <MoodTrendChart userId={user.userId} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
