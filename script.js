const btn = document.getElementById("record");
const output = document.getElementById("result");

if (!('webkitSpeechRecognition' in window)) {
  output.textContent = "SpeechRecognition not supported in this browser.";
} else {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    output.textContent = "You said: " + transcript;
  };

  recognition.onerror = (e) => {
    output.textContent = "Error: " + e.error;
  };

  btn.onclick = () => {
    recognition.start();
  };
}
