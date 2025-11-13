"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (message: string) => Promise<void>
  isLoading: boolean
  onNew?: () => void
}

export function ChatInput({ onSend, isLoading, onNew }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px"
    }
  }, [input])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      await onSend(input)
      setInput("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-end bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-lg"
    >
      <button
        type="button"
        onClick={onNew}
        disabled={isLoading}
        className="p-2.5 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-all duration-200 disabled:opacity-50 text-slate-600 dark:text-slate-400 hover:text-green-600"
        title="Chat baru"
      >
        <Plus className="w-5 h-5" />
      </button>

      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.ctrlKey) {
            handleSubmit(e as any)
          }
        }}
        placeholder="Tanya tentang desain ramah lingkungan..."
        disabled={isLoading}
        className="flex-1 bg-transparent resize-none outline-none text-sm max-h-30 disabled:opacity-50 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
        rows={1}
      />

      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className={cn(
          "p-2.5 rounded-lg transition-all duration-200 flex-shrink-0 font-medium",
          isLoading || !input.trim()
            ? "text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50"
            : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:scale-105 active:scale-95",
        )}
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  )
}
