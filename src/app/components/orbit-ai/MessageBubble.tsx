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
          isUser ? "bg-[#A0A4B8]/20" : "bg-gradient-to-br from-[#2962FF] to-[#1E4FD9]"
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-[#A0A4B8]" aria-hidden="true" />
        ) : (
          <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`max-w-[75%] rounded-[20px] px-4 py-3 ${
          isUser ? "bg-[#2962FF] text-white" : "bg-[#0F1429] text-white border border-white/10"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className={`text-xs mt-1 ${isUser ? "text-white/70" : "text-[#A0A4B8]"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  )
}
