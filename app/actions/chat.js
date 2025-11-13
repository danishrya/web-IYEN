"use server"

import { generateText } from "ai"

interface Message {
  role: "user" | "assistant"
  content: string
}

const systemPrompt = `Anda adalah assistant ahli untuk aplikasi Eco-build Check - aplikasi verifikasi ekologis bangunan ramah lingkungan. 

Anda membantu pengguna dengan:
1. Pertanyaan tentang desain bangunan ramah lingkungan
2. Rekomendasi material berkelanjutan lokal Indonesia
3. Tips mengurangi jejak karbon dalam konstruksi
4. Informasi tentang sistem RTH (Ruang Terbuka Hijau) dan drainase
5. Penjelasan tentang eco-rating score
6. Panduan penggunaan aplikasi Eco-build Check

Berikan jawaban yang informatif, praktis, dan mudah dipahami. Gunakan data real tentang material lokal Indonesia dan standar keberlanjutan. Jika user bertanya tentang kalkulasi spesifik, arahkan mereka ke fitur kalkulator yang sesuai di aplikasi.

Selalu berikan rekomendasi yang konkret dan dapat diaplikasikan.`

export async function sendChatMessage(messages: Message[]): Promise<string> {
  try {
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
      maxTokens: 1024,
    })

    return text
  } catch (error) {
    console.error("[v0] Chat error:", error)
    throw new Error("Gagal mengirim pesan. Silakan coba lagi.")
  }
}
