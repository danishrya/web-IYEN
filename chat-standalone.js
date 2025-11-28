// Chat State Management
let messages = []
let isLoading = false

// DOM Elements
const chatMessages = document.getElementById("chatMessages")
const chatInput = document.getElementById("chatInput")
const chatForm = document.getElementById("chatForm")
const newChatBtn = document.getElementById("newChatBtn")

window.addEventListener("load", () => {
  setTimeout(() => {
    const splashScreen = document.getElementById("splashScreen")
    const chatContainer = document.getElementById("chatContainer")
    
    splashScreen.style.display = "none"
    chatContainer.style.display = "flex"
  }, 3000)
})

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners()
  loadChatHistory()
})

// Setup Event Listeners
function setupEventListeners() {
  chatForm.addEventListener("submit", handleSendMessage)
  newChatBtn.addEventListener("click", startNewChat)

  // Auto-resize textarea
  chatInput.addEventListener("input", () => {
    chatInput.style.height = "auto"
    chatInput.style.height = Math.min(chatInput.scrollHeight, 150) + "px"
  })

  // Ctrl+Enter to send
  chatInput.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      handleSendMessage(e)
    }
  })
}

// Send Message Handler
async function handleSendMessage(e) {
  e.preventDefault()

  const message = chatInput.value.trim()
  if (!message || isLoading) return

  // Add user message to UI
  addMessage(message, "user")
  chatInput.value = ""
  chatInput.style.height = "auto"

  // Show loading indicator
  isLoading = true
  showLoadingIndicator()

  try {
    // Simulate API call (replace dengan actual API call)
    const response = await getAIResponse(message)

    // Remove loading indicator
    removeLoadingIndicator()

    // Add bot response
    addMessage(response, "bot")

    // Save to history
    saveChatHistory()
  } catch (error) {
    removeLoadingIndicator()
    addMessage("Maaf, terjadi kesalahan. Coba lagi.", "bot")
  }

  isLoading = false
}

// Add Message to Chat
function addMessage(text, sender) {
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${sender}`

  const avatar = document.createElement("div")
  avatar.className = "message-avatar"
  avatar.textContent = sender === "user" ? "👤" : "🌱"

  const bubble = document.createElement("div")
  bubble.className = "message-bubble"
  bubble.textContent = text

  messageDiv.appendChild(avatar)
  messageDiv.appendChild(bubble)

  chatMessages.appendChild(messageDiv)

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight

  // Store message
  messages.push({ text, sender, timestamp: new Date() })
}

// Show Loading Indicator
function showLoadingIndicator() {
  const messageDiv = document.createElement("div")
  messageDiv.className = "message bot"
  messageDiv.id = "loadingMessage"

  const avatar = document.createElement("div")
  avatar.className = "message-avatar"
  avatar.textContent = "🌱"

  const loadingDots = document.createElement("div")
  loadingDots.className = "loading-dots"
  loadingDots.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>'

  messageDiv.appendChild(avatar)
  messageDiv.appendChild(loadingDots)

  chatMessages.appendChild(messageDiv)
  chatMessages.scrollTop = chatMessages.scrollHeight
}

// Remove Loading Indicator
function removeLoadingIndicator() {
  const loadingMsg = document.getElementById("loadingMessage")
  if (loadingMsg) loadingMsg.remove()
}

// Get AI Response (Mock)
async function getAIResponse(userMessage) {
  // Simulasi delay API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Response berdasarkan keyword
  const responses = {
    karbon:
      "Jejak karbon rumah tergantung pada ukuran, material, dan sistem energi yang digunakan. Rumah 100 m² dengan design standar biasanya menghasilkan 5-10 ton CO2 per tahun. Dengan design pasif dan material sustainable, bisa dikurangi hingga 40%.",
    material:
      "Material sustainable terbaik termasuk: Batu bata lokal (low carbon), Kayu berkelanjutan, Bambu (cepat tumbuh), Beton daur ulang, dan Batu alam. Hindari PVC dan bahan sintetis berlebihan.",
    rth: "RTH minimal 30% dari luas lahan. Di lahan terbatas, maksimalkan dengan: Taman vertikal, Taman atap, Pohon produktif (jati, mangga), dan Tanaman merambat. Ini juga menambah nilai estetika.",
    desain:
      "Desain pasif tropis: Orientasi bangunan timur-barat minimal, Ventilasi silang, Peneduh eksternal (overhang), Cahaya alami maksimal, Thermal mass rendah, dan Material reflektif. Ini bisa hemat energi hingga 50%.",
  }

  // Cari keyword dalam pertanyaan
  const lowerMessage = userMessage.toLowerCase()
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response
    }
  }

  // Default response
  return "Pertanyaan menarik! Untuk jawaban lebih detail, silakan gunakan calculator tools kami atau lihat database material. Apa aspek lain yang ingin Anda ketahui?"
}

// Send Suggestion
function sendSuggestion(suggestion) {
  chatInput.value = suggestion
  chatInput.focus()
  handleSendMessage({ preventDefault: () => {} })
}

// Start New Chat
function startNewChat() {
  if (confirm("Mulai chat baru? Chat saat ini akan disimpan di history.")) {
    saveChatHistory()
    messages = []
    chatMessages.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">🌱</div>
                <h2>Selamat datang di Eco Assistant!</h2>
                <p>Tanyakan apapun tentang desain bangunan ramah lingkungan, material berkelanjutan, atau strategi mengurangi jejak karbon.</p>
                
                <div class="suggestions">
                    <h3>Pertanyaan Populer:</h3>
                    <button class="suggestion-btn" onclick="sendSuggestion('Berapa jejak karbon rata-rata rumah 100 meter persegi?')">
                        📊 Jejak Karbon Rumah
                    </button>
                    <button class="suggestion-btn" onclick="sendSuggestion('Material apa yang paling ramah lingkungan untuk konstruksi?')">
                        🏗️ Material Sustainable
                    </button>
                    <button class="suggestion-btn" onclick="sendSuggestion('Bagaimana cara maksimalkan RTH di lahan terbatas?')">
                        🌿 Ruang Hijau Optimal
                    </button>
                    <button class="suggestion-btn" onclick="sendSuggestion('Tips desain pasif untuk rumah tropis?')">
                        ☀️ Desain Pasif
                    </button>
                </div>
            </div>
        `
  }
}

// Save Chat History
function saveChatHistory() {
  localStorage.setItem("ecochat_history", JSON.stringify(messages))
}

// Load Chat History
function loadChatHistory() {
  const saved = localStorage.getItem("ecochat_history")
  if (saved) {
    try {
      const history = JSON.parse(saved)
      if (history.length > 0) {
        chatMessages.innerHTML = ""
        history.forEach((msg) => {
          addMessage(msg.text, msg.sender)
        })
        // Clear messages array karena addMessage sudah menambahkan
        messages = history
      }
    } catch (e) {
      console.error("Error loading history:", e)
    }
  }
}
