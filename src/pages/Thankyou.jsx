import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const ThankYou = () => {
  const navigate = useNavigate();
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!review.trim()) {
      alert("Please enter a review before submitting.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => navigate("/"), 3000); // Redirect to main page after 3 seconds
  };

  return (
    <div className="text-center flex flex-col items-center justify-center gap-y-8 h-screen">
      <h1 className="text-6xl font-bold font-paytone">Thank You!</h1>
      <p className="text-xl font-paytone mt-4">We appreciate your participation in the Bait or Legit? challange.</p>
      
      {!submitted ? (
        <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 text-black font-paytone p-6 rounded-lg shadow-md w-3/4">
          <p className="text-xl mb-4">Please leave a review about your experience:</p>
          <textarea
            className="w-full p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Type your review here..."
          ></textarea>
          <button
            className="mt-4 bg-green-500 text-white px-6 py-3 rounded-md text-xl font-bold hover:cursor-pointer"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
      ) : (
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md w-3/4 text-2xl font-paytone">
          Thank you for your feedback! Redirecting to the main page...
        </div>
      )}
    </div>
  );
};

export default ThankYou;
