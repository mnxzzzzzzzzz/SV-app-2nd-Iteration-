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
  User,
} from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import { Switch } from "../ui/switch"

export function MeScreen() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [biometricsEnabled, setBiometricsEnabled] = useState(true)

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logging out...")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#080C1F] pb-24">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-white"
        >
          Profile
        </motion.h1>
      </div>

      <div className="px-6 space-y-6">
        {/* Savings Card (Moved from Home) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#2962FF] via-[#1E4FD9] to-[#153BB0] rounded-[32px] p-8 mb-2 relative overflow-hidden shadow-[0_20px_50px_rgba(41,98,255,0.3)] border border-white/10"
        >
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-medium mb-4">Your Total Savings</p>
            <div className="flex items-baseline gap-1 mb-2">
              <h2 className="text-5xl font-bold text-white tracking-tight">£1,247</h2>
            </div>
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-10">This semester</p>
            
            <div className="h-[1px] bg-white/10 w-full mb-8" />
            
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <p className="text-white text-2xl font-bold mb-1">23</p>
                <p className="text-white/40 text-[9px] uppercase font-bold tracking-wider">Active Deals</p>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="text-center flex-1">
                <p className="text-white text-2xl font-bold mb-1">45</p>
                <p className="text-white/40 text-[9px] uppercase font-bold tracking-wider">Visits</p>
              </div>
            </div>
          </div>
          
          {/* Abstract design elements */}
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
          <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden bg-[#2962FF]/10 border border-[#2962FF]/20">
            <img src="/studentverse-social-avatar.svg" alt="StudentVerse Avatar" className="w-full h-full" />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white mb-1">Alex Johnson</h2>
            <p className="text-[#A0A4B8] text-sm">STU-2024-1847</p>
          </div>
        </motion.div>

        {/* Account Email Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-[#0F1429] rounded-2xl p-5 border border-white/10"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#2962FF]/10">
              <Mail className="w-5 h-5 text-[#2962FF]" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-[#A0A4B8] text-xs mb-1">Account Email</p>
              <p className="text-white font-medium">alex.johnson@student.edu</p>
              <p className="text-[#10B981] text-xs mt-1">Verified</p>
            </div>
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#2962FF]" aria-hidden="true" />
            Security
          </h3>

          <div className="bg-[#0F1429] rounded-2xl border border-white/10 divide-y divide-white/10">
            {/* 2FA Toggle */}
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#10B981]/10">
                  <Lock className="w-5 h-5 text-[#10B981]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-white font-medium">Two-Factor Authentication</p>
                  <p className="text-[#A0A4B8] text-xs">Add an extra layer of security</p>
                </div>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
                aria-label="Toggle two-factor authentication"
              />
            </div>

            {/* Biometrics Toggle */}
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#2962FF]/10">
                  <Smartphone className="w-5 h-5 text-[#2962FF]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-white font-medium">Biometric Login</p>
                  <p className="text-[#A0A4B8] text-xs">Use fingerprint or face ID</p>
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
          <h3 className="text-lg font-semibold text-white mb-3">Settings</h3>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-[#0F1429] rounded-2xl border border-white/10 text-left hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#2962FF]/10">
                  <Bell className="w-5 h-5 text-[#2962FF]" aria-hidden="true" />
                </div>
                <span className="text-white font-medium">Notifications</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#A0A4B8]" aria-hidden="true" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-[#0F1429] rounded-2xl border border-white/10 text-left hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#A0A4B8]/10">
                  <Globe className="w-5 h-5 text-[#A0A4B8]" aria-hidden="true" />
                </div>
                <span className="text-white font-medium">Language & Region</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#A0A4B8]" aria-hidden="true" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-[#0F1429] rounded-2xl border border-white/10 text-left hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#A0A4B8]/10">
                  <Settings className="w-5 h-5 text-[#A0A4B8]" aria-hidden="true" />
                </div>
                <span className="text-white font-medium">Preferences</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#A0A4B8]" aria-hidden="true" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-[#0F1429] rounded-2xl border border-white/10 text-left hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#A0A4B8]/10">
                  <HelpCircle className="w-5 h-5 text-[#A0A4B8]" aria-hidden="true" />
                </div>
                <span className="text-white font-medium">Help & Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#A0A4B8]" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 bg-[#EF4444]/10 rounded-2xl border border-[#EF4444]/20 text-[#EF4444] font-medium hover:bg-[#EF4444]/20 transition-colors"
        >
          <LogOut className="w-5 h-5" aria-hidden="true" />
          <span>Log Out</span>
        </motion.button>

        {/* Version Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-center gap-2 py-4 text-[#A0A4B8] text-sm"
        >
          <Info className="w-4 h-4" aria-hidden="true" />
          <span>StudentVerse v1.0.0</span>
        </motion.div>
      </div>
    </div>
  )
}
