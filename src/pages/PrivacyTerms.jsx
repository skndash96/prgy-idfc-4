import { useNavigate } from "react-router-dom";
import React from "react";

const PrivacyTerms = () => {
  const content = {
    privacy: {
      title: "Privacy Policy",
      text: `We value your privacy and ensure that no personal data is collected beyond essential gameplay statistics. No sensitive information is stored or shared with third parties. Your interactions within the game are used solely for improving user experience.`
    },
    terms: {
      title: "Terms and Conditions",
      text: `By using this platform, you agree to engage in fair play. Any misuse, unauthorized attempts to access data, or disruptive behavior may result in access restrictions. We reserve the right to update these terms as necessary.`
    }
  };

  return (
    <div className="text-center flex flex-col items-center justify-around gap-y-8">
      <h1 className="text-3xl font-bold font-paytone">{content.terms.title}</h1>
      <p className="text-black font-paytone mt-4 w-3/4 bg-gradient-to-b from-yellow-100 to-yellow-500 p-6 rounded-lg shadow-md">
        {content.terms.text}
      </p>
      <h1 className="text-3xl font-bold font-paytone">{content.privacy.title}</h1>
      <p className="text-black font-paytone mt-4 w-3/4 bg-gradient-to-b from-yellow-100 to-yellow-500 p-6 rounded-lg shadow-md">
        {content.privacy.text}
      </p>
    </div>
  );
};

export default PrivacyTerms;
