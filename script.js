// CONFIGURARE WORKER PROXY - Link-ul tău oficial și activ de Cloudflare
const WORKER_URL = "https://fitlife.yanis-andrei2007.workers.dev; 

document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatOutput = document.getElementById("chat-output");

    if (sendBtn && userInput && chatOutput) {
        async function handleSendMessage() {
            const text = userInput.value.trim();
            if (!text) return;

            appendMessage("user", text);
            userInput.value = "";

            const loadingId = appendMessage("ai", "Asistentul tău AI calculează...");

            try {
                // Trimitem cererea către Worker-ul tău privat Cloudflare
                const response = await fetch(WORKER_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        messages: [
                            { 
                                role: "system", 
                                content: "Ești un nutriționist sportiv expert. Rolul tău este să analizezi textul utilizatorului și să calculezi caloriile și macronutrienții (proteine, carbohidrați, grăsimi) pentru orice aliment sau masă introdusă (inclusiv gogoșari, shaorma, mâncăruri gătite). Răspunde direct, prietenos și scurt (maxim 2 paragrafe). Răspunde obligatoriu în limba română și folosește emoticoane relevante." 
                            },
                            { role: "user", content: text }
                        ]
                    })
                });

                if (!response.ok) {
                    document.getElementById(loadingId).innerHTML = `<strong>Asistent AI</strong><p style="color: red;">Eroare proxy Cloudflare (${response.status}). Verifică cheia Groq din contul Cloudflare.</p>`;
                    return;
                }

                const data = await response.json();
                
                if (data.choices && data.choices[0] && data.choices[0].message) {
                    const aiResponse = data.choices[0].message.content;
                    const formattedResponse = aiResponse.replace(/\n/g, '<br>');
                    document.getElementById(loadingId).innerHTML = `<strong>Asistent AI</strong><p>${formattedResponse}</p>`;
                } else {
                    document.getElementById(loadingId).innerHTML = `<strong>Asistent AI</strong><p style="color: red;">Eroare la procesarea textului din server.</p>`;
                }

            } catch (error) {
                console.error("Eroare:", error);
                document.getElementById(loadingId).innerHTML = `<strong>Asistent AI</strong><p style="color: red;">Nu m-am putut conecta la Worker-ul tău Cloudflare. Verifică link-ul WORKER_URL.</p>`;
            }
        }

        sendBtn.addEventListener("click", handleSendMessage);
        userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleSendMessage();
        });
    }

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
