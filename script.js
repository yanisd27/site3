document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatOutput = document.getElementById("chat-output");

    if (!sendBtn || !userInput || !chatOutput) return;

    async function handleSendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        // 1. Afișăm textul tău în chat
        appendMessage("user", text);
        userInput.value = "";

        // 2. Afișăm mesajul de încărcare
        const loadingId = appendMessage("ai", "Asistentul tău AI calculează...");

        try {
            // Un prompt de sistem care forțează AI-ul să extragă și să calculeze caloriile exacte
            const systemPrompt = "Ești un nutriționist sportiv expert. Rolul tău este să analizezi textul utilizatorului și să calculezi caloriile și macronutrienții (proteine, carbohidrați, grăsimi) pentru orice aliment sau masă introdusă (inclusiv gogoșari, shaorma, mâncăruri gătite). Răspunde direct, prietenos și scurt (maxim 2 paragrafe). Răspunde obligatoriu în limba română și folosește emoticoane relevante.";
            
            // Apelăm endpoint-ul AI securizat
            const urlModificat = `https://pollinations.ai{encodeURIComponent(text)}?system=${encodeURIComponent(systemPrompt)}`;
            const response = await fetch(urlModificat);

            if (!response.ok) {
                document.getElementById(loadingId).innerHTML = `<strong>Asistent AI</strong><p style="color: red;">Serverul este ocupat. Reîncearcă în câteva secunde!</p>`;
                return;
            }

            const aiResponse = await response.text();
            
            // 3. Afișăm răspunsul inteligent primit de la AI
            if (aiResponse && aiResponse.trim().length > 0) {
                const formattedResponse = aiResponse.replace(/\n/g, '<br>');
                document.getElementById(loadingId).innerHTML = `<strong>Asistent AI</strong><p>${formattedResponse}</p>`;
            } else {
                document.getElementById(loadingId).innerHTML = `<strong>Asistent AI</strong><p style="color: red;">Eroare la procesarea textului.</p>`;
            }

        } catch (error) {
            console.error("Eroare:", error);
            document.getElementById(loadingId).innerHTML = `<strong>Asistent AI</strong><p style="color: red;">Conexiunea locală a fost blocată de browser. Trimite codul pe GitHub și activează GitHub Pages pentru a debloca AI-ul complet! 🚀</p>`;
        }
    }

    sendBtn.addEventListener("click", handleSendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSendMessage();
    });

    function appendMessage(sender, text) {
        const msgId = "msg-" + Date.now();
        const messageDiv = document.createElement("div");
        
        if (sender === "user") {
            messageDiv.className = "user-msg";
            messageDiv.innerHTML = `<strong>Tu</strong><p>${text}</p>`;
        } else {
            messageDiv.className = "ai-msg";
            messageDiv.id = msgId;
            messageDiv.innerHTML = `<strong>Asistent AI</strong><p>${text}</p>`;
        }
        
        chatOutput.appendChild(messageDiv);
        chatOutput.scrollTop = chatOutput.scrollHeight;
        return msgId;
    }
});
