import React, { useState } from "react";
import MusicPlayer from "../components/MusicPlayer";
import { IoIosFingerPrint } from "react-icons/io";
import { PiUserSoundFill } from "react-icons/pi";
import { GiSoundWaves } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [feeling, setFeeling] = useState("");
  const [response, setResponse] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState(null);

  const userId = "user-id-placeholder"; // Replace with the actual user ID (e.g., from auth context or props)

  const handleVoiceInput = () => {
    if (!isListening) {
      if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => setIsListening(true);

        recognition.onend = () => {
          setIsListening(false);
          setRecognitionInstance(null);
        };

        recognition.onresult = (event) => {
          let finalTranscript = "";

          for (let i = 0; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + " ";
            }
          }

          setFeeling(finalTranscript);
        };

        recognition.start();
        setRecognitionInstance(recognition);
      } else {
        alert("Voice recognition is not supported in this browser.");
      }
    } else {
      if (recognitionInstance) {
        recognitionInstance.stop();
        setRecognitionInstance(null);
      }
      handleSubmit();
    }
  };

  const saveJournalEntry = async (content, date) => {
    try {
      await fetch("http://localhost:5050/api/journal/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, content, date }),
      });
    } catch (error) {
      console.error("Failed to save journal entry:", error);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await fetch("http://localhost:8880/feeler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feeling }),
      });

      if (!res.ok) throw new Error("Error with the response");

      const data = await res.json();
      setResponse(data.response);

      // Save the journal entry automatically
      const journalContent = `
        Feeling: ${feeling}\n
        Empathy: ${data.response.empathy}\n
        Advice: ${data.response.advice}\n
        Encouragement: ${data.response.encouragement}
      `;
      const date = new Date().toISOString();
      await saveJournalEntry(journalContent, date);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen font-aqem bg-gray-100 flex items-center justify-center">
      {/* Music Player */}
      <div className="fixed top-0 m-5 rounded-2xl right-0 p-2 z-20">
        <MusicPlayer />
      </div>

      {/* Main Content */}
      <div className="mt-10 text-center">
        
        <h1 className="text-header font-extrabold">_THE JOURNAL*</h1>

        

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative mt-8">
          <div className="relative w-4/6 justify-center items-center ml-52">
            <input
              type="text"
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              placeholder=" Talk to me..."
              className="w-full text-2xl px-12 py-2 pr-12 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`absolute top-1/2 left-1 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:ring-2 hover:ring-black ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-black text-white"
              }`}
            >
              
              {isListening ? <GiSoundWaves className="text-2xl" /> : <PiUserSoundFill className="text-2xl" />}
            </button>
            <button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:ring-2 hover:ring-black"
            >
              <IoIosFingerPrint className="text-3xl" />
            </button>
            
          </div>
        </form>
{/* View Journal Entries Button */}
<button
          onClick={() => navigate("/journal-entries")}
          className="mt-4 py-2 px-6 bg-black text-white rounded-3xl font-semibold hover:bg-white hover:text-black hover:ring-2 hover:ring-black"
        >
          View Journal Entries
        </button>
        {/* Response Modal */}
        {response && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-lg p-6 w-3/4 max-w-3xl">
              <h2 className="text-2xl font-pixel">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
              <p className="text-gray-600 text-2xl font-wild italic">"{feeling}"</p>
              <div className="mt-6 text-2xl font-wild">
                <p>{response.empathy}</p>
                <p>{response.advice}</p>
                <p>{response.encouragement}</p>
              </div>
              <button
                onClick={() => setResponse(null)}
                className="py-2 px-4 bg-black text-white rounded-md font-semibold hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
