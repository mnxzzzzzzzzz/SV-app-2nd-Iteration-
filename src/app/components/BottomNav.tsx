import { Home, Search, ScanLine, MessageSquare, User } from "lucide-react";
import { motion } from "motion/react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Search", icon: Search },
  { id: "qr", label: "Scan", icon: ScanLine },
  { id: "orbit", label: "Chat", icon: MessageSquare },
  { id: "me", label: "Profile", icon: User },
];

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-[#0F1429] border-t border-white/10 pb-safe z-40"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around px-4 h-20 max-w-[480px] mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[48px] relative"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#2962FF] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              
              {/* Icon */}
              <div className="relative">
                <Icon 
                  className={`w-6 h-6 transition-colors ${
                    isActive ? "text-[#2962FF]" : "text-[#A0A4B8]"
                  }`}
                  aria-hidden="true"
                />
              </div>
              
              {/* Label */}
              <span 
                className={`text-xs transition-colors ${
                  isActive ? "text-white" : "text-[#A0A4B8]"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
