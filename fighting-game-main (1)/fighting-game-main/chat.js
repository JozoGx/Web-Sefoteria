document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chat-widget');
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    chatToggle.addEventListener('click', function() {
        chatContainer.classList.remove('hidden');
        chatToggle.classList.add('hidden');
    });

    closeChat.addEventListener('click', function() {
        chatContainer.classList.add('hidden');
        chatToggle.classList.remove('hidden');
    });

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessageToChat('Anda', message);
            fetchResponse(message);
            userInput.value = '';
        }
    }

    function addMessageToChat(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = sender === 'AI' ? 'message ai-message' : 'message user-message';
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        document.getElementById('chat-messages').appendChild(messageElement);
        document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
    }

    async function fetchResponse(message) {
        const lowercaseMessage = message.toLowerCase();
        
        // Fungsi untuk mengekstrak informasi dari halaman web
        function extractWebsiteInfo() {
            const heroText = document.querySelector('.hero p').textContent;
            const characterNames = Array.from(document.querySelectorAll('.character-item h1')).map(el => el.textContent);
            const characterDescriptions = Array.from(document.querySelectorAll('.character-description')).map(el => el.textContent);
            const features = Array.from(document.querySelectorAll('.feature-list li')).map(el => el.textContent);
            const teamMembers = Array.from(document.querySelectorAll('.team-member')).map(el => ({
                role: el.querySelector('h4').textContent,
                details: el.querySelector('ul').textContent
            }));

            return {
                gameDescription: heroText,
                characters: characterNames.map((name, i) => ({ name, description: characterDescriptions[i] })),
                features: features,
                team: teamMembers
            };
        }

        const websiteInfo = extractWebsiteInfo();

        // Fungsi untuk mencari jawaban berdasarkan kata kunci
        function findAnswer(query) {
            if(query.includes('kontak') || query.includes('contact')) {
                return window.location = "#contact";
            }
            if (query.includes('game') || query.includes('sefoteria')) {
                return websiteInfo.gameDescription;
            }
            if (query.includes('character') || query.includes('karakter')) {
                return websiteInfo.characters.map(c => `${c.name}: ${c.description}`).join('\n');
            }
            if (query.includes('feature') || query.includes('fitur')) {
                return `Fitur-fitur game Sefoteria meliputi: ${websiteInfo.features.join(', ')}`;
            }
            if (query.includes('team') || query.includes('tim')) {
                return websiteInfo.team.map(m => `${m.role}: ${m.details}`).join('\n');
            }
            // Tambahkan lebih banyak kondisi sesuai kebutuhan

            return null;
        }

        const answer = findAnswer(lowercaseMessage);
        if (answer) {
            addMessageToChat('AI', answer);

            return;
        }

        // Jika tidak ada jawaban spesifik, gunakan respons umum
        const generalResponses = [
            "Sefoteria adalah game petualangan pixel-art epik. Apa yang ingin Anda ketahui lebih lanjut tentang gamenya?",
            "Game ini memiliki karakter-karakter unik dengan kemampuan khusus. Apakah Anda ingin tahu lebih banyak tentang karakter tertentu?",
            "Tim pengembang kami terdiri dari profesional berpengalaman. Apakah Anda tertarik mengetahui lebih lanjut tentang tim kami?",
            "Sefoteria menawarkan berbagai fitur menarik. Apakah ada fitur spesifik yang ingin Anda ketahui?",
            "Maaf, saya tidak memiliki informasi spesifik tentang itu. Namun, saya bisa memberi tahu Anda tentang gameplay, grafis, atau aspek lain dari Sefoteria. Apa yang ingin Anda ketahui?"
        ];

        const randomResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];
        addMessageToChat('AI', randomResponse);
    }
});
