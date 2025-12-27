import { Bell } from "lucide-react"

interface HeaderProps {
  userName?: string
}

export function Header({ userName = "Guest" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#080C1F]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[480px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/studentverse-monogram.svg" alt="StudentVerse" className="h-10" />
          </div>

          {/* Notification Icon */}
          <button
            className="relative p-2 rounded-full hover:bg-white/5 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-6 h-6 text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
          </button>
        </div>
      </div>
    </header>
  )
}
