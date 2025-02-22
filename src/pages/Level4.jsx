import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import chatData from "../pages/chatdata";

const Chat = () => {
  const [currentNode, setCurrentNode] = useState("start");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { addScore } = useProfile();

  const handleOptionClick = (nextNode) => {
    setCurrentNode(nextNode);

    // Check if the next node has no options (i.e., it's an endpoint)
    if (!chatData[nextNode]?.options || chatData[nextNode].options.length === 0) {
      setShowPopup(true);
      addScore(4, 10, 0); // Unlock Level 5 (assuming 10 points and 0 seconds as placeholders)
    }
  };

  const handleBackToLevels = () => {
    navigate("/levels");
  };

  const currentChat = chatData[currentNode];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="mb-4">
          <p className="text-lg font-medium">{currentChat.message}</p>
        </div>

        {/* Show options if available */}
        {currentChat.options?.length > 0 ? (
          <div className="space-y-3">
            {currentChat.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.next)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
              >
                {option.text}
              </button>
            ))}
          </div>
        ) : (
          // Show popup when the chat ends
          showPopup && (
            <div className="mt-4 text-center">
              <button
                onClick={handleBackToLevels}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition"
              >
                Back to Levels
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Chat;