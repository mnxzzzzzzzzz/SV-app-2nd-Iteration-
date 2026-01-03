"use client"

import {
  Settings,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Mail,
  Info,
  Smartphone,
  Globe,
  Lock,
  X,
  Check,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Switch } from "../ui/switch"

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", flag: "🇦🇪" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
]

const REGIONS = [
  { code: "ae", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "uk", name: "United Kingdom", flag: "🇬🇧" },
  { code: "us", name: "United States", flag: "🇺🇸" },
  { code: "in", name: "India", flag: "🇮🇳" },
  { code: "sg", name: "Singapore", flag: "🇸🇬" },
]

interface MeScreenProps {
  onLogout?: () => void
}

export function MeScreen({ onLogout }: MeScreenProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [biometricsEnabled, setBiometricsEnabled] = useState(true)
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [selectedRegion, setSelectedRegion] = useState("ae")

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-sv-navy pb-24">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-heading text-3xl font-bold text-sv-text-main"
        >
          Profile
        </motion.h1>
      </div>

      <div className="px-6 space-y-6">
        {/* Savings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-sv-azure via-sv-azure/80 to-sv-violet rounded-2xl p-8 mb-2 relative overflow-hidden shadow-[0_20px_50px_rgba(41,98,255,0.3)] border border-sv-glass-border"
        >
          <div className="relative z-10">
            <p className="font-body text-white/80 text-sm font-medium mb-4">Your Total Savings</p>
            <div className="flex items-baseline gap-1 mb-2">
              <h2 className="font-heading text-5xl font-bold text-white tracking-tight">£1,247</h2>
            </div>
            <p className="text-label text-white/60 mb-10">This semester</p>
            
            <div className="h-[1px] bg-white/10 w-full mb-8" />
            
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <p className="font-heading text-white text-2xl font-bold mb-1">23</p>
                <p className="text-label text-white/40">Active Deals</p>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="text-center flex-1">
                <p className="font-heading text-white text-2xl font-bold mb-1">45</p>
                <p className="text-label text-white/40">Visits</p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 blur-[40px] rounded-full -ml-16 -mb-16" />
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex items-center gap-4"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden bg-sv-azure/10 border border-sv-azure/20">
            <img src="/studentverse-app-icon.png" alt="StudentVerse Avatar" className="w-full h-full object-contain" />
          </div>

          <div className="flex-1">
            <h2 className="font-heading text-xl font-semibold text-sv-text-main mb-1">Sanjar</h2>
            <p className="text-meta text-sv-text-muted">STU-2024-1847</p>
          </div>
        </motion.div>

        {/* Account Email Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-sv-glass-bg rounded-xl p-5 border border-sv-glass-border backdrop-blur-md"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-sv-azure/10">
              <Mail className="w-5 h-5 text-sv-azure" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-label text-sv-text-muted mb-1">Account Email</p>
              <p className="font-body text-sv-text-main font-medium">sanjar@student.edu</p>
              <p className="text-label text-success mt-1">Verified</p>
            </div>
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h3 className="font-heading text-lg font-semibold text-sv-text-main mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-sv-azure" aria-hidden="true" />
            Security
          </h3>

          <div className="bg-sv-glass-bg rounded-xl border border-sv-glass-border divide-y divide-sv-glass-border backdrop-blur-md">
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-success/10">
                  <Lock className="w-5 h-5 text-success" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-body text-sv-text-main font-medium">Two-Factor Authentication</p>
                  <p className="font-body text-sv-text-muted text-xs">Add an extra layer of security</p>
                </div>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
                aria-label="Toggle two-factor authentication"
              />
            </div>

            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-sv-azure/10">
                  <Smartphone className="w-5 h-5 text-sv-azure" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-body text-sv-text-main font-medium">Biometric Login</p>
                  <p className="font-body text-sv-text-muted text-xs">Use fingerprint or face ID</p>
                </div>
              </div>
              <Switch
                checked={biometricsEnabled}
                onCheckedChange={setBiometricsEnabled}
                aria-label="Toggle biometric login"
              />
            </div>
          </div>
        </motion.div>

        {/* Settings Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="font-heading text-lg font-semibold text-sv-text-main mb-3">Settings</h3>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-sv-glass-bg rounded-xl border border-sv-glass-border text-left hover:bg-sv-glass-highlight transition-colors backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-sv-azure/10">
                  <Bell className="w-5 h-5 text-sv-azure" aria-hidden="true" />
                </div>
                <span className="text-sv-text-main font-medium">Notifications</span>
              </div>
              <ChevronRight className="w-5 h-5 text-sv-text-muted" aria-hidden="true" />
            </button>

            <button 
              onClick={() => setShowLanguageModal(true)}
              className="w-full flex items-center justify-between p-4 bg-sv-glass-bg rounded-xl border border-sv-glass-border text-left hover:bg-sv-glass-highlight transition-colors backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-sv-text-muted/10">
                  <Globe className="w-5 h-5 text-sv-text-muted" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-sv-text-main font-medium block">Language & Region</span>
                  <span className="text-sv-text-muted text-xs">
                    {LANGUAGES.find(l => l.code === selectedLanguage)?.flag} {LANGUAGES.find(l => l.code === selectedLanguage)?.name} • {REGIONS.find(r => r.code === selectedRegion)?.name}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-sv-text-muted" aria-hidden="true" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-sv-glass-bg rounded-xl border border-sv-glass-border text-left hover:bg-sv-glass-highlight transition-colors backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-sv-text-muted/10">
                  <Settings className="w-5 h-5 text-sv-text-muted" aria-hidden="true" />
                </div>
                <span className="text-sv-text-main font-medium">Preferences</span>
              </div>
              <ChevronRight className="w-5 h-5 text-sv-text-muted" aria-hidden="true" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-sv-glass-bg rounded-xl border border-sv-glass-border text-left hover:bg-sv-glass-highlight transition-colors backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-sv-text-muted/10">
                  <HelpCircle className="w-5 h-5 text-sv-text-muted" aria-hidden="true" />
                </div>
                <span className="text-sv-text-main font-medium">Help & Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-sv-text-muted" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 bg-destructive/10 rounded-xl border border-destructive/20 text-destructive font-medium hover:bg-destructive/20 transition-colors"
        >
          <LogOut className="w-5 h-5" aria-hidden="true" />
          <span>Log Out</span>
        </motion.button>

        {/* Version Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-2 py-4 text-sv-text-muted text-sm"
        >
          <Info className="w-4 h-4" aria-hidden="true" />
          <span>StudentVerse v1.0.0</span>
        </motion.div>
      </div>

      {/* Language & Region Modal */}
      <AnimatePresence>
        {showLanguageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
            onClick={() => setShowLanguageModal(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-sv-navy rounded-t-3xl w-full max-w-[480px] max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-bold text-sv-text-main">Language & Region</h2>
                  <button
                    onClick={() => setShowLanguageModal(false)}
                    className="w-10 h-10 rounded-full bg-sv-glass-bg flex items-center justify-center border border-sv-glass-border"
                  >
                    <X className="w-5 h-5 text-sv-text-muted" />
                  </button>
                </div>

                {/* Language Selection */}
                <div className="mb-6">
                  <h3 className="font-heading text-sm font-semibold text-sv-text-muted mb-3 uppercase tracking-wider">Language</h3>
                  <div className="space-y-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setSelectedLanguage(lang.code)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${
                          selectedLanguage === lang.code
                            ? "bg-sv-azure/20 border-sv-azure/50"
                            : "bg-sv-glass-bg border-sv-glass-border hover:bg-sv-glass-highlight"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{lang.flag}</span>
                          <span className="text-sv-text-main font-medium">{lang.name}</span>
                        </div>
                        {selectedLanguage === lang.code && (
                          <Check className="w-5 h-5 text-sv-azure" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region Selection */}
                <div className="mb-6">
                  <h3 className="font-heading text-sm font-semibold text-sv-text-muted mb-3 uppercase tracking-wider">Region</h3>
                  <div className="space-y-2">
                    {REGIONS.map((region) => (
                      <button
                        key={region.code}
                        onClick={() => setSelectedRegion(region.code)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${
                          selectedRegion === region.code
                            ? "bg-sv-azure/20 border-sv-azure/50"
                            : "bg-sv-glass-bg border-sv-glass-border hover:bg-sv-glass-highlight"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{region.flag}</span>
                          <span className="text-sv-text-main font-medium">{region.name}</span>
                        </div>
                        {selectedRegion === region.code && (
                          <Check className="w-5 h-5 text-sv-azure" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowLanguageModal(false)}
                  className="w-full bg-sv-azure text-white py-4 rounded-xl font-semibold hover:bg-sv-azure/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
