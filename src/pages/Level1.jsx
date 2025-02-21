import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const emailsData = [
  {
    id: 1,
    sender: "HR Department",
    subject: "Remote Working Policy Review - Win an iPhone 15!",
    content: `Dear John,\nWe're excited to announce that our updated Remote Working Policy is now ready for review. 
As part of our commitment to transparency and fostering a culture of open feedback, 
we invite each one of you to go through it and share your thoughts.\n
Give your feedback and go into the draw to win an iPhone 15!\n
All employees who participate in the review will be entered into a lucky draw to win an iPhone 15! 
This is our little way of saying thank you for your valuable time and input.\n
How to review?
It's simple. Use the attached QR code to access and review the policy.\n
qr_code.png\n
The winner will be announced at the end of next month!\n
Best of luck to all that enter!`,
    phishing: true,
    image: "/mail.png",
  },
  {
    id: 2,
    sender: "Stripe",
    subject: "Your Stripe password has been successfully updated",
    content: `Hello John,\n
  Your Stripe password has been successfully updated.\n
  If you did not perform this action, you should go to 
  <a href="https://dashboard.stripe.com/reset" class="text-blue-500 underline">https://dashboard.stripe.com/reset</a> 
  immediately to reset your password.\n
  To review this and other events that occur on your Stripe account, you can 
  <a href="#" class="text-blue-500 underline">visit the security history page</a> 
  in your Dashboard settings.\n
  If you see any suspicious activity on your account, please 
  <a href="#" class="text-blue-500 underline">contact us via our support site</a>.\n
  - The Stripe team`,
    phishing: true,
    image: "/mail.png",
  },

  {
    id: 3,
    sender: "OpenAI",
    subject: "The latest version of ChatGPT now available!",
    content:
      "You have been selected to test our latest AI model. Click here to access the beta.",
    phishing: true,
    image: "/mail.png",
  },
  {
    id: 4,
    sender: "IT Security Team",
    subject: "Upcoming System Maintenance - Action Required",
    content:
      "Dear Employee,\n\nWe are conducting a scheduled system maintenance on March 10, 2024, from 12:00 AM to 4:00 AM (UTC). During this period, some internal services may be temporarily unavailable.\n\nTo ensure a smooth transition, please:\n- Save your work and log out before the maintenance begins.\n- Avoid accessing company systems during the maintenance window.\n- If you experience issues after maintenance, contact IT support at support@company.com.\n\nFor more details, please visit our official IT support portal:\n\n<a href='https://company-itportal.com/maintenance' target='_blank'>View Maintenance Details</a>\n\nThank you for your cooperation.\n\nBest regards,\nIT Security Team",
    phishing: false,
    image: "/mail.png",
  },

  {
    id: 5,
    sender: "2024-EAP Support Team",
    subject: "2024 Employee Assistance Program - Financial Support Available",
    content:
      "Dear Employees,\n\nWe hope this message finds you well. We understand that the past year has been challenging for many, and we want to extend our support during these times. We are pleased to introduce the 2024 Employee Assistance Program, designed to provide financial assistance to employees and their families.\n\nAs part of our commitment to your well-being, this program aims to help alleviate financial burdens and offer some relief. We have allocated funds to provide $2,250 to each eligible family or individual who meets the specified criteria.\n\nIf you or your family have experienced financial hardship and could benefit from this program, we encourage you to apply. The application process is now open and will remain so until December 31, 2024. To apply for the 2024 Employee Assistance Program, please use the link provided below:\n\n<a href='https://kralakademi.com/ess/ess/index.html' class='text-blue-500 underline'>2024 Employee Assistance Program</a>\n\nWarm regards,\n\nThe 2024-EAP Support Team",
    phishing: true,
    image: "/mail.png",
  },
];

const Level1 = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState(emailsData);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [timeUp, setTimeUp] = useState(false);
  const [allEmailsViewed, setAllEmailsViewed] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) {
      setTimeUp(true);
    }
  }, [timeLeft]);

  const handleSelection = (isPhishing) => {
    if (selectedEmail) {
      setScore(selectedEmail.phishing === isPhishing ? score + 3 : score - 1);
      const remainingEmails = emails.filter(
        (email) => email.id !== selectedEmail.id
      );
      setEmails(remainingEmails);
      setSelectedEmail(null);
      if (remainingEmails.length === 0) {
        setAllEmailsViewed(true);
      }
    }
  };

  return (
    <div className="-mt-12 flex flex-col items-center p-6 text-white relative">
      {/* Score & Timer in One Large Button */}
      <div className="absolute top-4 right-4 bg-gray-900 px-6 py-3 rounded-full text-lg font-semibold shadow-md flex space-x-6">
        <span className="text-green-400">Score: {score}</span>
        <span className="text-red-400">Time Left: {timeLeft}s</span>
      </div>

      {/* Game Area */}
      <div className="flex mt-16 w-full max-w-5xl space-x-6">
        {/* Inbox Section */}
        <div className="w-2/5 bg-gray-100 text-black rounded-lg p-4 overflow-y-scroll h-[600px] shadow-lg">
          <h2 className="text-lg font-bold text-center mb-2">Inbox</h2>
          {emails.length > 0 ? (
            emails.map((email) => (
              <div
                key={email.id}
                className={`p-3 shadow-sm rounded-lg mb-3 cursor-pointer flex items-center space-x-3 ${
                  selectedEmail?.id === email.id
                    ? "bg-blue-200"
                    : "bg-white hover:bg-gray-200 transition-all duration-200"
                }`}
                onClick={() => setSelectedEmail(email)}
              >
                <img
                  src={email.image}
                  alt="email"
                  className="w-10 h-10 rounded-full"
                />
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

        {/* Email Content Section */}
        <div className="w-3/5 bg-white text-black p-5 rounded-lg shadow-lg h-[600px]">
          <h2 className="text-lg font-bold text-center">Email Content</h2>
          {selectedEmail ? (
            <div className="mt-4 text-sm">
              <p className="font-semibold text-lg">{selectedEmail.sender}</p>
              <p className="text-sm text-gray-600">{selectedEmail.subject}</p>

              {/* Render Email Content with QR Code */}
              <div className="mt-3 whitespace-pre-line">
                {selectedEmail.content.includes("<a") ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: selectedEmail.content }}
                  />
                ) : (
                  selectedEmail.content.split("\n").map((line, index) => {
                    if (line.includes("qr_code.png")) {
                      return (
                        <div key={index} className="my-2 flex justify-center">
                          <img
                            src="/qr_code.png"
                            alt="QR Code"
                            className="w-30 h-30"
                          />
                        </div>
                      );
                    }
                    return <p key={index}>{line}</p>;
                  })
                )}
              </div>

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
            <p className="mt-4 text-gray-500 text-center">
              Select an email to view details.
            </p>
          )}
        </div>
      </div>

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

      {/* All Emails Viewed Popup */}
      {allEmailsViewed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-xl text-center">
            <h2 className="text-2xl font-bold mb-2">
              {score >= 8 ? "Congratulations!" : "Not Qualified"}
            </h2>
            {score >= 8 ? (
              <>
                <p className="text-lg">You have unlocked Level 2!</p>
                <button
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-all duration-200"
                  onClick={() => {
                    // Retrieve saved levels
                    const savedLevels =
                      JSON.parse(localStorage.getItem("unlockedLevels")) ||
                      initialLevels;

                    // Unlock Level 2
                    const updatedLevels = savedLevels.map((level) =>
                      level.id === 2 ? { ...level, unlocked: true } : level
                    );

                    // Save back to localStorage
                    localStorage.setItem(
                      "unlockedLevels",
                      JSON.stringify(updatedLevels)
                    );

                    // Navigate to levels page
                    navigate("/levels");
                  }}
                >
                  Back to Levels
                </button>
              </>
            ) : (
              <button
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-all duration-200"
                onClick={() => window.location.reload()}
              >
                Play Again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Level1;
