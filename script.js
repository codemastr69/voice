const btn = document.getElementById("record");
const output = document.getElementById("result");

if (!('webkitSpeechRecognition' in window)) {
  output.textContent = "SpeechRecognition not supported in this browser.";
} else {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    output.textContent = "You said: " + transcript;

    const aiReply = await askChatGPT(transcript);
    output.textContent += "\nAI: " + aiReply;

    // Speak the response
    const utter = new SpeechSynthesisUtterance(aiReply);
    speechSynthesis.speak(utter);
  };

  recognition.onerror = (e) => {
    output.textContent = "Error: " + e.error;
  };

  btn.onclick = () => {
    recognition.start();
  };
}

// 🧠 Ask ChatGPT using OpenAI API
async function askChatGPT(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_OPENAI_API_KEY", // <-- replace for testing only
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
