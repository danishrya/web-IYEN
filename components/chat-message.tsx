import { Sparkles, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  isLoading?: boolean
}

export function ChatMessage({ role, content, isLoading }: ChatMessageProps) {
  const isUser = role === "user"

  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      <div className="flex gap-3 items-start max-w-lg">
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        )}

        <div
          className={cn(
            "px-4 py-3 rounded-2xl max-w-xs lg:max-w-md shadow-md backdrop-blur-sm transition-all",
            isUser
              ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-tr-none"
              : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700",
          )}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-current rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
              <span className="text-sm">Berfikir...</span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{content}</p>
          )}
        </div>

        {isUser && (
          <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </div>
        )}
      </div>
    </div>
  )
}
