import React, { useState, useEffect } from 'react';

const VoiceRecorder = ({ onResult }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.lang = 'en-US';
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 1;
    recognitionInstance.continuous = false; // Try single utterances

    recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsRecording(false);
    };

    recognitionInstance.onstart = () => {
      console.log('🎙️ Recognition started');
    };

    recognitionInstance.onend = () => {
      console.log('🏁 Recognition ended - isRecording:', isRecording);
      setIsRecording(false);
      if (isRecording) {
        console.log('🔄 Restarting recognition...');
        try {
          recognitionInstance.start();
        } catch (error) {
          console.error('🚫 Error restarting recognition:', error);
        }
      }
    };

    recognitionInstance.onspeechstart = () => {
      console.log('🗣️ Speech detected');
    };

    recognitionInstance.onspeechend = () => {
      console.log('⚡ Speech ended (auto)');
      recognition.stop()
    };

    recognitionInstance.onaudiostart = () => {
      console.log('🎵 Audio capture started');
    };

    recognitionInstance.onsoundstart = () => {
      console.log('🔊 Sound detected');
    };

    recognitionInstance.onnomatch = () => {
      console.log('🚫 Speech not recognized. Please speak clearly.');
    };

    recognitionInstance.onerror = (event) => {
      console.error('🚫 Speech recognition error:', event.error, 'Details:', event);
      setIsRecording(false);
    };

    setRecognition(recognitionInstance);
  }, [onResult]);

  const handleStart = () => {
    if (recognition) {
      setIsRecording(true);
      try {
        recognition.start();
        console.log('🎙️ Starting recognition...');
      } catch (error) {
        console.error('🚫 Error starting recognition:', error);
        setIsRecording(false);
      }
    }
  };

  const handleStop = () => {
    if (recognition) {
      setIsRecording(false);
      console.log('Stopping recognition...');
      setTimeout(() => {
        recognition.stop();
      }, 1000); // Delay stop to allow results
    }
  };

  return (
    <div className="mt-4 flex gap-4 items-center">
      <button
        onClick={isRecording ? handleStop : handleStart}
        className={`px-4 py-2 rounded-lg font-semibold ${
          isRecording ? 'bg-red-500' : 'bg-indigo-500'
        } text-white transition`}
      >
        {isRecording ? 'Stop Recording' : 'Start Voice Input'}
      </button>
    </div>
  );
};

export default VoiceRecorder;