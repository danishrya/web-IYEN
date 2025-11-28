// Initialize
let chatHistory = []
let isLoadingResponse = false

document.addEventListener("DOMContentLoaded", () => {
  const inputMessage = document.getElementById("inputMessage")
  const btnSend = document.getElementById("btnSend")
  const btnNewChat = document.getElementById("btnNewChat")
  const btnMenu = document.getElementById("btnMenu")

  // Load saved chat history
  loadChatHistory()

  // Send message on button click
  btnSend.addEventListener("click", sendMessage)

  // Send message on Enter key (Shift+Enter for new line)
  inputMessage.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  })

  // Auto-resize textarea
  inputMessage.addEventListener("input", () => {
    inputMessage.style.height = "auto"
    inputMessage.style.height = Math.min(inputMessage.scrollHeight, 100) + "px"
  })

  // New chat button
  btnNewChat.addEventListener("click", startNewChat)

  // Menu button
  btnMenu.addEventListener("click", () => {
    alert("Menu options akan ditambahkan\n- Pengaturan\n- Riwayat Chat\n- Tentang Aplikasi")
  })

  // Transition dari splash ke chat setelah 3 detik
  setTimeout(() => {
    document.getElementById("splashScreen").classList.add("hidden")
    document.getElementById("chatContainer").style.display = "flex"
  }, 3000)
})

function sendMessage() {
  const inputMessage = document.getElementById("inputMessage")
  const message = inputMessage.value.trim()

  if (!message || isLoadingResponse) return

  // Add user message
  addMessage(message, "user")
  inputMessage.value = ""
  inputMessage.style.height = "auto"

  // Hide suggestions
  document.getElementById("suggestionsContainer").style.display = "none"

  // Show new chat button
  document.getElementById("btnNewChat").classList.add("show")

  // Show loading indicator
  showLoadingMessage()

  // Simulate AI response delay
  setTimeout(() => {
    removeLoadingMessage()
    const response = getAIResponse(message)
    addMessage(response, "bot")
    saveChatHistory()
  }, 1500)
}

function sendSuggestion(suggestionText) {
  const inputMessage = document.getElementById("inputMessage")
  inputMessage.value = suggestionText
  inputMessage.style.height = "auto"
  inputMessage.style.height = inputMessage.scrollHeight + "px"
  sendMessage()
}

function addMessage(text, sender) {
  const messagesContainer = document.getElementById("messagesContainer")
  const messageGroup = document.createElement("div")
  messageGroup.className = "message-group"

  const message = document.createElement("div")
  message.className = `message ${sender}-message`

  const avatar = document.createElement("div")
  avatar.className = "message-avatar"
  avatar.textContent = sender === "bot" ? "🤖" : "👤"

  const content = document.createElement("div")
  content.className = "message-content"
  content.innerHTML = formatMessageContent(text)

  message.appendChild(avatar)
  message.appendChild(content)
  messageGroup.appendChild(message)
  messagesContainer.appendChild(messageGroup)

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight

  // Add to history
  chatHistory.push({ sender, text, timestamp: new Date().toLocaleTimeString() })
}

function formatMessageContent(text) {
  // Simple formatting
  return `<p>${text.replace(/\n/g, "</p><p>")}</p>`
}

function showLoadingMessage() {
  const messagesContainer = document.getElementById("messagesContainer")
  const loadingDiv = document.createElement("div")
  loadingDiv.id = "loadingMessage"
  loadingDiv.className = "message bot-message"

  const avatar = document.createElement("div")
  avatar.className = "message-avatar"
  avatar.textContent = "🤖"

  const content = document.createElement("div")
  content.className = "message-content loading-message"

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("div")
    dot.className = "loading-dot"
    content.appendChild(dot)
  }

  loadingDiv.appendChild(avatar)
  loadingDiv.appendChild(content)
  messagesContainer.appendChild(loadingDiv)

  messagesContainer.scrollTop = messagesContainer.scrollHeight
  isLoadingResponse = true
}

function removeLoadingMessage() {
  const loadingMessage = document.getElementById("loadingMessage")
  if (loadingMessage) {
    loadingMessage.remove()
  }
  isLoadingResponse = false
}

function getAIResponse(userMessage) {
  const message = userMessage.toLowerCase()

  // Keyword-based responses
  if (message.includes("carbon") || message.includes("karbon")) {
    return `Untuk menghitung jejak karbon rumah 100m², saya perlu informasi lebih lanjut:\n• Jenis material konstruksi\n• Sumber energi (listrik, gas, solar)\n• Sistem pemanas/pendingin\n\nSecara umum, rumah 100m² yang efisien energi menghasilkan ~2-3 ton CO2 per tahun. Dengan design passif dan solar panel, bisa kurangi hingga 70%!`
  }

  if (message.includes("material") || message.includes("ramah lingkungan")) {
    return `Material ramah lingkungan yang bagus untuk bangunan:\n✓ Batu bata tanah lokal - rendah emisi, breathable\n✓ Kayu berkelanjutan - renewable, aesthetic\n✓ Bamboo - cepat tumbuh, kuat\n✓ Recycled plastic - mengurangi limbah\n✓ Hempcrete - insulation alami\n✓ Cork - sustainable, thermal efficient\n\nPilih material lokal untuk kurangi carbon footprint transportasi!`
  }

  if (message.includes("energi") || message.includes("hemat")) {
    return `Tips hemat energi untuk rumah berkelanjutan:\n1. Orientasi bangunan ke arah cerah tapi hindari panas berlebih\n2. Desain passive: ventilasi cross, thermal mass\n3. Insulasi dinding & atap yang baik\n4. Window dengan low-E glass\n5. Solar panel untuk listrik\n6. Water heating solar thermal\n7. LED lighting everywhere\n\nBisa hemat hingga 60% konsumsi energi dengan strategi ini!`
  }

  if (message.includes("green building") || message.includes("rth")) {
    return `Green Building adalah bangunan yang design-nya mempertimbangkan:\n• Efisiensi energi & air\n• Material berkelanjutan\n• Kualitas indoor air\n• Dampak ekologi minimal\n• Komunitas & aksesibilitas\n\nRTH (Ruang Terbuka Hijau) minimal 30% luas lahan adalah kunci untuk:\n✓ Mendinginkan area\n✓ Menyerap air hujan\n✓ Biodiversity\n✓ Kesehatan penghuni`
  }

  if (message.includes("berapa") || message.includes("hitung")) {
    return `Untuk perhitungan spesifik, saya butuh data:\n• Ukuran bangunan (m²)\n• Lokasi geografis\n• Material yang digunakan\n• Sistem energi\n• Jumlah penghuni\n\nBuka fitur "Kalkulator Karbon" di aplikasi Eco-build Check untuk kalkulasi detail dan akurat!`
  }

  if (message.includes("drainase") || message.includes("sumur")) {
    return `Sistem drainase berkelanjutan:\n• Sumur resapan: permeabilitas tanah\n• Biopori: infiltrasi permukaan\n• Rainwater harvesting: simpan untuk irigasi\n• Permeable paving: reduce runoff\n\nRekomendasi untuk lokasi Anda bergantung curah hujan & tipe tanah. Gunakan fitur "Verifikasi Lahan" untuk analisis detail!`
  }

  if (message.includes("solar") || message.includes("panel")) {
    return `Solar Panel untuk rumah berkelanjutan:\n• PV Panel (listrik): 3-5 kW untuk rumah 100m²\n• Solar Thermal (air panas): hemat 60% energy\n• ROI: 8-10 tahun dengan subsidies\n• Lifespan: 25-30 tahun\n\nKombinasi dengan battery storage untuk backup malam hari. Investment terbayar dengan hemat listrik bulanan!`
  }

  // Default response
  return `Pertanyaan menarik! 🌱\n\nSaya memahami Anda tertarik tentang: "${userMessage}"\n\nCoba tanyakan saya tentang:\n• Perhitungan jejak karbon\n• Material ramah lingkungan\n• Hemat energi & air\n• Desain passive cooling\n• Sistem solar & renewable\n\nGunakan juga fitur lain di aplikasi untuk analisis mendalam!`
}

function startNewChat() {
  const messagesContainer = document.getElementById("messagesContainer")
  const inputMessage = document.getElementById("inputMessage")
  const suggestionsContainer = document.getElementById("suggestionsContainer")
  const btnNewChat = document.getElementById("btnNewChat")

  // Clear messages
  messagesContainer.innerHTML = `
        <div class="message-group welcome">
            <div class="message bot-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>Halo! Saya Eco Assistant, siap membantu Anda merancang rumah yang ramah lingkungan.</p>
                    <p>Tanyakan apa saja tentang:</p>
                    <ul class="message-list">
                        <li>✓ Perhitungan jejak karbon</li>
                        <li>✓ Material berkelanjutan</li>
                        <li>✓ Sistem drainase & RTH</li>
                        <li>✓ Desain pasif & energi terbarukan</li>
                    </ul>
                </div>
            </div>
        </div>
    `

  // Reset input
  inputMessage.value = ""
  inputMessage.style.height = "auto"

  // Show suggestions again
  suggestionsContainer.style.display = "grid"

  // Hide new chat button
  btnNewChat.classList.remove("show")

  // Reset chat history for UI (but keep saved)
  chatHistory = []

  saveChatHistory()
}

function saveChatHistory() {
  localStorage.setItem("ecochat-history", JSON.stringify(chatHistory))
}

function loadChatHistory() {
  const saved = localStorage.getItem("ecochat-history")
  if (saved) {
    chatHistory = JSON.parse(saved)
  }
}

console.log("[v0] Eco-chat initialized successfully")
