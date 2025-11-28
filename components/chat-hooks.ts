"use client"

// Hook adalah fungsi khusus React untuk manage state & logic

import { useState, useCallback } from "react"

// Hook untuk manage chat history
export function useChatHistory(maxMessages = 50) {
  const [history, setHistory] = useState<any[]>([])

  const addToHistory = useCallback(
    (message: any) => {
      setHistory((prev) => {
        const updated = [message, ...prev]
        // Limit history size
        return updated.slice(0, maxMessages)
      })
    },
    [maxMessages],
  )

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  return { history, addToHistory, clearHistory }
}

// Hook untuk track typing status
export function useTypingIndicator(delay = 800) {
  const [isTyping, setIsTyping] = useState(false)
  const timeoutRef = useCallback(
    (callback: () => void) => {
      setIsTyping(true)
      const timeout = setTimeout(() => {
        setIsTyping(false)
        callback()
      }, delay)
      return () => clearTimeout(timeout)
    },
    [delay],
  )

  return { isTyping, startTyping: timeoutRef }
}
