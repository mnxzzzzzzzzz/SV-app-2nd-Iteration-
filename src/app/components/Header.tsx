import { Bell } from "lucide-react"

interface HeaderProps {
  userName?: string
}

export function Header({ userName = "Guest" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-sv-navy/95 backdrop-blur-md border-b border-sv-glass-border">
      <div className="max-w-[480px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/studentverse-app-icon.png" alt="StudentVerse" className="h-8 w-auto" />
          </div>

          {/* Notification Icon */}
          <button
            className="relative p-2 rounded-xl hover:bg-sv-glass-highlight transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-6 h-6 text-sv-text-main" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </button>
        </div>
      </div>
    </header>
  )
}
