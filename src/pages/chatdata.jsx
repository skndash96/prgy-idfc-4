const chatData = {
    start: {
      message: "📞 Incoming call from an unknown number\n\nKumar: Hi, am I speaking with James? This is Kumar from Sharesies. We’re reaching out with an exclusive investment opportunity.",
      options: [
        { text: "Oh, that sounds interesting. Tell me more.", next: "offerDetails" },
        { text: "I don’t remember signing up for this. Can you prove you’re from Sharesies?", next: "verifyIdentity" }
      ]
    },
    verifyIdentity: {
      message: "Kumar: Of course! We are a partner with major investment platforms. I can send a verification email from our official-looking domain.",
      options: [
        { text: "Alright, I guess that sounds legitimate.", next: "offerDetails" },
        { text: "No, I’ll verify this with Sharesies myself.", next: "avoidScam" }
      ]
    },
    offerDetails: {
      message: "Kumar: We offer expert financial advice for just $299. Our analysts will optimize your portfolio.",
      options: [
        { text: "That sounds reasonable. How do I sign up?", next: "paymentRequest" },
        { text: "Why would Sharesies charge for advice when they’re just a trading platform?", next: "explanation1" }
      ]
    },
    paymentRequest: {
      message: "Kumar: Great! Please pay via PayPal using the link I send.",
      options: [
        { text: "[Clicks link and pays $299]", next: "remoteAccessRequest" },
        { text: "Why do you need my computer access?", next: "explanation2" }
      ]
    },
    remoteAccessRequest: {
      message: "💻 [Kumar now has access to your computer]\n\nKumar: Now let’s set up your transfer.",
      options: [
        { text: "[Transfers $600]", next: "scammedEnding" },
        { text: "I need time to think.", next: "pressureTactic" }
      ]
    },
    pressureTactic: {
      message: "Kumar: James, this is time-sensitive! If you wait, you could lose thousands in potential gains!",
      options: [
        { text: "Fine, I’ll do it now.", next: "scammedEnding" },
        { text: "No, I need to be cautious.", next: "realization" }
      ]
    },
    realization: {
      message: "🔻 You check with Sharesies and discover the scam just in time! (You avoided the scam.)",
      options: []
    },
    avoidScam: {
      message: "Kumar: Frustrated but hangs up (You avoided the scam!)",
      options: []
    },
    scammedEnding: {
      message: "💸 [You send another $600] \n📉 Weeks later, you realize it was all a scam...\n\nGAME OVER - SCAMMED ENDING",
      options: []
    }
  };
  
  export default chatData;