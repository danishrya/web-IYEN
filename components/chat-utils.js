// Fungsi helper untuk format data - bisa dipakai di mana aja

export function formatTimeStamp(date: Date): string {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function categorizeQuestion(text: string): string {
  if (text.toLowerCase().includes("material")) return "material"
  if (text.toLowerCase().includes("karbon")) return "carbon"
  if (text.toLowerCase().includes("rtH")) return "lahan"
  return "general"
}

export function generateSuggestions(lastMessage: string): string[] {
  const suggestions = {
    material: [
      "Apa material terbaik untuk atap?",
      "Bagaimana biaya material ramah lingkungan?",
      "Dimana membeli material lokal?",
    ],
    carbon: ["Berapa jejak karbon rumah saya?", "Cara mengurangi emisi CO2?", "Apa itu carbon footprint?"],
    lahan: ["Berapa RTH yang diperlukan?", "Bagaimana sistem drainase yang baik?", "Apa itu sumur resapan?"],
    general: [
      "Apa itu eco-rating score?",
      "Bagaimana cara memulai desain ramah lingkungan?",
      "Apa manfaat bangunan berkelanjutan?",
    ],
  }

  const category = categorizeQuestion(lastMessage)
  return suggestions[category as keyof typeof suggestions] || suggestions.general
}
