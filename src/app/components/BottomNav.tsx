import { Home, Search, CreditCard, Compass, User } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: string | number; color?: string; className?: string }>;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Search", icon: Search },
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
              className="flex items-center justify-center min-w-[56px] min-h-[48px]"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon 
                size={24}
                className={`transition-colors ${
                  isActive ? "text-sv-text-main" : "text-sv-text-muted"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
