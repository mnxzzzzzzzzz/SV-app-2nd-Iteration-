import { Home, QrCode, CreditCard, Compass, User } from "lucide-react";
import { motion } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: string | number; color?: string; className?: string }>;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "qr", label: "Scan", icon: QrCode },
  { id: "pay", label: "Pay", icon: CreditCard },
  { id: "orbit", label: "Orbit", icon: Compass },
  { id: "me", label: "Profile", icon: User },
];

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-sv-glass-bg backdrop-blur-xl border-t border-sv-glass-border pb-safe z-40"
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
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-sv-azure rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              
              {/* Icon with glow effect for active Pay tab */}
              <div className="relative">
                {isActive && item.id === "pay" && (
                  <div className="absolute inset-0 -m-2 rounded-full bg-sv-cyan/20 blur-md" />
                )}
                <Icon 
                  size={24}
                  className={`relative z-10 ${
                    isActive 
                      ? (item.id === "pay" ? "text-sv-cyan" : "text-sv-azure") 
                      : "text-sv-text-muted"
                  }`}
                />
              </div>
              
              {/* Label */}
              <span 
                className={`text-xs transition-colors ${
                  isActive ? "text-sv-text-main" : "text-sv-text-muted"
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
