import { Sparkles, User } from "lucide-react"
import type { Message } from "./types"

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === "user"

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-sv-text-muted/20" : "bg-gradient-to-br from-sv-azure to-sv-violet"
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-sv-text-muted" aria-hidden="true" />
        ) : (
          <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`max-w-[75%] rounded-xl px-4 py-3 ${
          isUser ? "bg-sv-azure text-white" : "bg-sv-glass-bg text-sv-text-main border border-sv-glass-border"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className={`text-xs mt-1 ${isUser ? "text-white/70" : "text-sv-text-muted"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  )
}
