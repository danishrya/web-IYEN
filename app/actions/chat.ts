"use server"

import { generateText } from "ai"

interface Message {
  role: "user" | "assistant"
  content: string
}

const systemPrompt = `
Anda adalah assistant ahli untuk aplikasi Eco-build Check — aplikasi verifikasi ekologis bangunan ramah lingkungan.

Anda membantu pengguna dengan:
1. Pertanyaan tentang desain bangunan ramah lingkungan.
2. Rekomendasi material berkelanjutan lokal Indonesia.
3. Tips mengurangi jejak karbon dalam konstruksi.
4. Informasi tentang sistem RTH (Ruang Terbuka Hijau) dan drainase.
5. Penjelasan tentang eco-rating score.
6. Panduan penggunaan aplikasi Eco-build Check.

Berikan jawaban yang informatif, praktis, dan mudah dipahami.
Gunakan data nyata tentang material lokal Indonesia dan standar keberlanjutan.
Jika pengguna bertanya tentang kalkulasi spesifik, arahkan mereka ke fitur kalkulator di aplikasi.

Selalu berikan rekomendasi yang konkret dan dapat diaplikasikan.
`

export async function sendChatMessage(messages: Message[]): Promise<string> {
  try {
    if (!messages || messages.length === 0) {
      throw new Error("Pesan tidak boleh kosong.")
    }

    const { text } = await generateText({
      model: "gpt-4o-mini", // cukup pakai ini, "openai/" gak perlu
      system: systemPrompt,
      messages,
      temperature: 0.7,
      maxOutputTokens: 1024, // di package ai, pakai `maxOutputTokens` bukan `maxTokens`
    })

    return text.trim()
  } catch (error) {
    console.error("[EcoBuild Chat Error]:", error)
    throw new Error("Gagal mengirim pesan. Silakan coba lagi nanti.")
  }
}
