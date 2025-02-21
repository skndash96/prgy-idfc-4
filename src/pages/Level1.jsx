import React, { useState, useEffect } from "react";

const emailsData = [
  {
    id: 1,
    sender: "HR Department",
    subject: "Updated Employee Handbook",
    content: "Please review the latest employee handbook updates. Click here to download the document.",
    phishing: false,
    image: "hr.png",
  },
  {
    id: 2,
    sender: "IT Support",
    subject: "Scheduled System Maintenance on Sep 10",
    content: "Our servers will undergo maintenance on September 10th. Please save your work in advance.",
    phishing: false,
    image: "it-support.png",
  },
  {
    id: 3,
    sender: "OpenAI",
    subject: "The latest version of ChatGPT now available!",
    content: "You have been selected to test our latest AI model. Click here to access the beta.",
    phishing: true,
    image: "openai.png",
  },
  {
    id: 4,
    sender: "Bank Alert",
    subject: "Unusual Activity Detected!",
    content: "We have detected unusual activity on your account. Click here to verify your information.",
    phishing: true,
    image: "bank-alert.png",
  },
  {
    id: 5,
    sender: "Netflix",
    subject: "Your Subscription is Expiring Soon!",
    content: "Renew your subscription today to continue enjoying unlimited streaming.",
    phishing: false,
    image: "netflix.png",
  },
  {
    id: 6,
    sender: "Amazon",
    subject: "Exclusive Offer Just for You!",
    content: "Click now to claim your 50% discount on your next purchase!",
    phishing: true,
    image: "amazon.png",
  },
];

const Level1 = () => {
  const [emails, setEmails] = useState(emailsData);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [showPopup, setShowPopup] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && emails.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (emails.length === 0) {
      setShowPopup(true);
    }
    if (timeLeft === 0) {
      setTimeUp(true);
    }
  }, [timeLeft, emails]);

  const handleSelection = (isPhishing) => {
    if (selectedEmail) {
      if (selectedEmail.phishing === isPhishing) {
        setScore(score + 3);
      } else {
        setScore(score - 1);
      }
      setEmails(emails.filter((email) => email.id !== selectedEmail.id));
      setSelectedEmail(null);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#070625] via-40% to-[#3D348E] p-6 text-white relative">

      {/* Score & Timer in One Large Button */}
      <div className="absolute top-4 right-4 bg-gray-900 px-6 py-3 rounded-full text-lg font-semibold shadow-md flex space-x-6">
        <span className="text-green-400">Score: {score}</span>
        <span className="text-red-400">Time Left: {timeLeft}s</span>
      </div>

      {/* Game Area */}
      <div className="flex mt-16 w-full max-w-5xl space-x-6">
        
        {/* Inbox - Increased Width */}
        <div className="w-2/5 bg-gray-100 text-black rounded-lg p-4 overflow-y-scroll h-[600px] shadow-lg">
          <h2 className="text-lg font-bold text-center mb-2">Inbox</h2>
          {emails.length > 0 ? (
            emails.map((email) => (
              <div
                key={email.id}
                className={`p-3 shadow-sm rounded-lg mb-3 cursor-pointer flex items-center space-x-3 ${
                  selectedEmail?.id === email.id ? "bg-blue-200" : "bg-white hover:bg-gray-200 transition-all duration-200"
                }`}
                onClick={() => setSelectedEmail(email)}
              >
                <img src={email.image} alt="email" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-sm">{email.sender}</p>
                  <p className="text-xs text-gray-600">{email.subject}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No more emails</p>
          )}
        </div>

        {/* Email Content - Increased Width & Top-Aligned */}
        <div className="w-3/5 bg-white text-black p-5 rounded-lg shadow-lg h-[600px] flex flex-col justify-start">
          <h2 className="text-lg font-bold text-center">Email Content</h2>
          {selectedEmail ? (
            <div className="mt-4 text-sm">
              <img src={selectedEmail.image} alt="email" className="w-14 h-14 rounded-full mb-2 mx-auto" />
              <p className="font-semibold text-lg">{selectedEmail.sender}</p>
              <p className="text-sm text-gray-600">{selectedEmail.subject}</p>
              <p className="mt-3">{selectedEmail.content}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-700 transition-all duration-200"
                  onClick={() => handleSelection(true)}
                >
                  Report as Phishing
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-700 transition-all duration-200"
                  onClick={() => handleSelection(false)}
                >
                  Mark as Safe
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-gray-500 text-center">Select an email to view details.</p>
          )}
        </div>
      </div>

      {/* Popup when all emails are read */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-xl text-center">
            {score < 10 ? (
              <>
                <h2 className="text-2xl font-bold mb-2">You Haven't Passed This Level</h2>
                <p className="text-lg">Your Score: <span className="font-bold text-red-500">{score}</span></p>
                <button
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-all duration-200"
                  onClick={() => window.location.reload()}
                >
                  Play Again
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
                <p className="text-lg">Your Score: <span className="font-bold text-green-500">{score}</span></p>
                <button
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-all duration-200"
                  onClick={() => window.location.href = "/game/2"}
                >
                  Next Level
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Time Up Popup */}
      {timeUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-xl text-center">
            <h2 className="text-2xl font-bold mb-2">Time's Up!</h2>
            <button
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-all duration-200"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Level1;
