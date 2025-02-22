import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";

const emailsData = [
  {
    id: 1,
    sender: "HR Department",
    senderEmail: "hr-infotech@passinbox.com",
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
    correctReason: "The sender's email is suspicious, the offer of a free iPhone is a classic phishing lure, and it pressures users to act by scanning a QR code.",
    wrongHelp: "Legitimate companies do not offer high-value rewards just for policy reviews. Always verify the sender’s email and avoid scanning unknown QR codes."
  },
  {
    id: 2,
    sender: "Stripe",
    senderEmail: "noreply@stripe.com",
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
    phishing: false,
    image: "/mail.png",
    correctReason: "The email comes from a legitimate Stripe domain, contains no urgency tactics, and provides a valid Stripe link.",
    wrongHelp: "Phishing emails usually contain misleading links or urgent warnings. This email directs users to Stripe’s official domain for security verification."
  },
  {
    id: 3,
    sender: "OpenAI",
    senderEmail: "openai-120120i1@bajk.com",
    subject: "The latest version of ChatGPT now available!",
    content:
      `You have been selected to test our latest AI model.
<a href="#" class="text-blue-500 underline">Click here</a> to access the beta.`,
    phishing: true,
    image: "/mail.png",
    correctReason: "The sender email is not from OpenAI’s official domain, and the email pressures the user to click an unverified link.",
    wrongHelp: "Official beta invitations from OpenAI will come from an openai.com domain and provide more details. Avoid clicking unknown links."
  },
  {
    id: 4,
    sender: "IT Security Team",
    senderEmail: "itsec@infosys.com",
    subject: "Upcoming System Maintenance - Action Required",
    content:
      "Dear Employee,\n\nWe are conducting a scheduled system maintenance on March 10, 2024, from 12:00 AM to 4:00 AM (UTC). During this period, some internal services may be temporarily unavailable.\n\nTo ensure a smooth transition, please:\n- Save your work and log out before the maintenance begins.\n- Avoid accessing company systems during the maintenance window.\n- If you experience issues after maintenance, contact IT support at support@company.com.\n\nFor more details, please visit our official IT support portal:\n\n<a href='https://company-itportal.com/maintenance' target='_blank'>View Maintenance Details</a>\n\nThank you for your cooperation.\n\nBest regards,\nIT Security Team",
    phishing: false,
    image: "/mail.png",
    correctReason: "The email is from an official IT department address, provides clear information, and does not contain suspicious links or urgent threats.",
    wrongHelp: "Phishing emails often include fake urgency and suspicious links. This email, however, is informative and from a trusted source."
  },
  {
    id: 5,
    sender: "2024-EAP Support Team",
    senderEmail: "finance-providers@aspkas.com",
    subject: "2024 Employee Assistance Program - Financial Support Available",
    content:
      "Dear Employees,\n\nWe hope this message finds you well. We understand that the past year has been challenging for many, and we want to extend our support during these times. We are pleased to introduce the 2024 Employee Assistance Program, designed to provide financial assistance to employees and their families.\n\nAs part of our commitment to your well-being, this program aims to help alleviate financial burdens and offer some relief. We have allocated funds to provide $2,250 to each eligible family or individual who meets the specified criteria.\n\nIf you or your family have experienced financial hardship and could benefit from this program, we encourage you to apply. The application process is now open and will remain so until December 31, 2024. To apply for the 2024 Employee Assistance Program, please use the link provided below:\n\n<a href='https://kralakademi.com/ess/ess/index.html' class='text-blue-500 underline'>2024 Employee Assistance Program</a>\n\nWarm regards,\n\nThe 2024-EAP Support Team",
    phishing: true,
    image: "/mail.png",
    correctReason: "The sender’s email is not from an official company domain, and the email promises financial aid while leading to an unknown link.",
    wrongHelp: "Scammers often use financial aid as bait. Always verify offers with HR directly before clicking on unknown links."
  },
  {
    id: 6,
    sender: "HR Department",
    senderEmail: "john@hrdept.com",
    subject: "Annual Leave Policy Update - Please Review",
    content:
      "Dear Team,\n\nWe would like to inform you about an update to our annual leave policy, effective April 1, 2025. The updated policy includes:\n- Increased leave days for employees with over 5 years of service.\n- New guidelines on leave carryover.\n- Simplified request and approval process.\n\nPlease review the full details here:\n\n<a href='https://company-portal.com/leave-policy' target='_blank'>View Updated Policy</a>\n\nIf you have any questions, feel free to reach out to HR at hr@company.com.\n\nBest regards,\nHR Department",
    phishing: false,
    image: "/mail.png",
    correctReason: "The sender is from an internal HR department, the message provides legitimate policy updates, and links lead to a known company domain.",
    wrongHelp: "Phishing emails often demand immediate action or use fake domains. This email provides useful company-related information without urgency."
  },
  {
    id: 7,
    sender: "IT Helpdesk",
    senderEmail: "help@gglo.com",
    subject: "Urgent: Verify Your Email Access Now",
    content:
      "Dear User,\n\nWe have noticed unusual login attempts on your account. To prevent unauthorized access, please verify your email immediately by clicking the secure link below:\n\n<a href='https://secure-mail.verification.com' class='text-blue-500 underline'>Verify Email Now</a>\n\nFailure to verify within 24 hours will result in account suspension.\n\nThank you,\nIT Helpdesk Support",
    phishing: true,
    image: "/mail.png",
    correctReason: "The email creates urgency, asks for immediate action, and links to a suspicious domain unrelated to the company.",
    wrongHelp: "Legitimate security alerts provide clear sender identification and do not use threatening language. Verify with your IT team before clicking any links."
  },
  {
    id: 8,
    sender: "Finance Department",
    senderEmail: "fintech@hack.in",
    subject: "Payroll Processing Update - Important Notice",
    content:
      "Dear Employees,\n\nWe would like to inform you that our payroll processing system will undergo scheduled maintenance on March 20, 2025. As a result, salary disbursements for this cycle may be delayed by 24 hours.\n\nRest assured, we are working to minimize any inconvenience. If you have any concerns, please contact our finance team at finance@company.com.\n\nThank you for your patience and understanding.\n\nBest regards,\nFinance Department",
    phishing: false,
    image: "/mail.png",
    correctReason: "The sender is a company department, provides advance notice of a routine event, and does not ask for personal information.",
    wrongHelp: "Phishing emails often create fake payroll issues to steal credentials. This email, however, only provides a general update."
  },
  {
    id: 9,
    sender: "Admin Support",
    senderEmail: "admin@aisjp.com",
    subject: "Action Required: Confirm Your Employee Benefits",
    content:
      "Dear Employee,\n\nWe are updating our employee benefits records and need you to confirm your details. Failure to update your information may result in benefit suspension.\n\nPlease confirm your details immediately by clicking the link below:\n\n<a href='https://secure-hrbenefits.com/update' class='text-blue-500 underline'>Confirm Benefits Now</a>\n\nThis must be completed within 48 hours to avoid service interruption.\n\nBest regards,\nAdmin Support Team",
    phishing: true,
    image: "/mail.png",
    correctReason: "The sender email is suspicious, the email pressures users to act quickly, and the link leads to an unknown site.",
    wrongHelp: "Scammers use urgent language to trick employees into submitting personal information. Always verify benefit updates with HR directly."
  }
];

const Level1 = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState(emailsData);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [score, setScore] = useState(0);
  const SECS = 120;
  const [timeLeft, setTimeLeft] = useState(SECS);
  const [timeUp, setTimeUp] = useState(false);
  const [allEmailsViewed, setAllEmailsViewed] = useState(false);
  const { addScore } = useProfile();
  const [explaination, setExplaination] = useState(null)

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
      const isCorrect = selectedEmail.phishing === isPhishing

      const newScore =
        isCorrect ? score + 3 : score - 1;

      setExplaination({
        text: isCorrect ? selectedEmail.correctReason : selectedEmail.wrongHelp,
        correct: isCorrect
      })

      setScore(newScore);

      const remainingEmails = emails.filter(
        (email) => email.id !== selectedEmail.id
      );
      setEmails(remainingEmails);
      setSelectedEmail(null);
      if (remainingEmails.length === 0) {
        setAllEmailsViewed(true);
        addScore(1, newScore, SECS - timeLeft);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 text-white relative">
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
                className={`p-3 shadow-sm rounded-lg mb-3 cursor-pointer flex items-center space-x-3 ${selectedEmail?.id === email.id
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
              <p className="font-semibold text-lg">{selectedEmail.sender}
                <span className="ml-2 text-base text-neutral-600">
                  ({selectedEmail.senderEmail})
                </span>
              </p>
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
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-700 transition-all duration-200 hover:cursor-pointer"
                  onClick={() => handleSelection(true)}
                >
                  Report as Phishing
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-700 transition-all duration-200 hover:cursor-pointer"
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

      <ul className="mt-4 flex gap-2">
        {new Array(emailsData.length).fill(null).map((_, i) => (
          <li
            key={i}
            className={`w-4 h-4 rounded-full ${i < emailsData.length - emails.length ||
              (selectedEmail && i === emailsData.length - emails.length)
              ? "bg-amber-400"
              : "bg-amber-800"
              }`}
          ></li>
        ))}
      </ul>

      {/* Explaination */}
      {explaination && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black max-w-4xl p-6 rounded-lg shadow-xl text-center">
            <h2 className="text-2xl font-bold mb-2">
              {explaination.correct ? "You got it" : "Uh oh. You got phished"}
            </h2>
            <p className="mt-4">
              {explaination.text}
            </p>
            <button
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-all duration-200"
              onClick={() => setExplaination(null)}
            >
              Continue
            </button>
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

      {/* All Emails Viewed Popup */}
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
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-all duration-200 hover:cursor-pointer"
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
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-all duration-200 hover:cursor-pointer"
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
