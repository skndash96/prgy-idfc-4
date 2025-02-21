import React, { useState } from "react";
import chatData from "../pages/chatdata";

const Chat = () => {
  const [currentNode, setCurrentNode] = useState("start");

  const handleOptionClick = (nextNode) => {
    setCurrentNode(nextNode);
  };

  const currentChat = chatData[currentNode];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="mb-4">
          <p className="text-lg font-medium">{currentChat.message}</p>
        </div>
        <div className="space-y-3">
          {currentChat.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option.next)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition hover:cursor-pointer"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;