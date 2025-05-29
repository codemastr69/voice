const button = document.getElementById("record");
        const speech = document.getElementById("speechtxt");

        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = function(event) {
            speech.innerText = event.results[0][0].transcript;
        };

        recognition.onerror = function(event) {
            console.error("Speech recognition error:", event.error);
        };

        button.onclick = function() {
            recognition.start();
        };