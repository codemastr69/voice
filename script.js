const button = document.getElementById("record");
    const speechText = document.getElementById("speechtxt");

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      speechText.innerText = `You: ${transcript}`;

      const aiReply = await askChatGPT(transcript);
      speechText.innerText += `\nAI: ${aiReply}`;

      // Speak the AI's reply
      const utterance = new SpeechSynthesisUtterance(aiReply);
      speechSynthesis.speak(utterance);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    button.onclick = () => {
      recognition.start();
    };

    async function askChatGPT(userText) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer YOUR_OPENAI_API_KEY",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userText }]
        })
      });

      const data = await response.json();
      return data.choices[0].message.content.trim();
    }
