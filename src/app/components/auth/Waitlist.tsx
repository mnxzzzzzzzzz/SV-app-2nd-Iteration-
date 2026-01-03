import { motion } from "framer-motion";
import { Hourglass, Copy, Share2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface WaitlistProps {
  email: string;
}

export function Waitlist({ email }: WaitlistProps) {
  const [copied, setCopied] = useState(false);
  
  const referralCode = "SV" + Math.random().toString(36).substring(2, 8).toUpperCase();
  const currentReferrals = 12;
  const targetReferrals = 20;
  const progress = (currentReferrals / targetReferrals) * 100;
  const waitlistPosition = 1847;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const shareText = `Join me on StudentVerse! Use my referral code: ${referralCode}`;
    if (navigator.share) {
      navigator.share({
        title: "StudentVerse Referral",
        text: shareText,
      });
    }
  };

  return (
    <div className="min-h-screen bg-sv-navy flex flex-col items-center justify-center px-6 max-w-[480px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        {/* Hourglass Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center w-24 h-24 rounded-full bg-sv-text-muted/20 mx-auto mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 180, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Hourglass className="w-12 h-12 text-sv-text-muted" aria-hidden="true" />
          </motion.div>
        </motion.div>

        {/* Title & Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-semibold text-sv-text-main mb-3">Access Pending</h1>
          <p className="text-sv-text-muted mb-4">
            You're on the waitlist! Skip the line by referring friends.
          </p>
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 bg-sv-glass-bg border border-sv-glass-border rounded-full px-4 py-2 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-sv-gold animate-pulse" />
            <span className="text-sv-text-muted text-sm font-medium">
              Position #{waitlistPosition.toLocaleString()}
            </span>
          </div>
        </motion.div>

        {/* Referral Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-sv-glass-bg border border-sv-glass-border rounded-2xl p-6 mb-6 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sv-text-main font-semibold">Referral Progress</h2>
            <div className="flex items-center gap-1">
              <span className="text-sv-text-main text-xl font-bold">{currentReferrals}</span>
              <span className="text-sv-text-muted">/ {targetReferrals}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-3 bg-sv-navy rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-sv-azure to-sv-cyan rounded-full"
            />
          </div>

          <p className="text-sv-text-muted text-sm">
            {targetReferrals - currentReferrals} more referrals to unlock instant access!
          </p>

          {/* Milestones */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-sv-text-main text-sm font-medium">5 referrals</p>
                <p className="text-sv-text-muted text-xs">Move up 500 spots</p>
              </div>
              <span className="text-success text-xs font-medium">Completed</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-sv-text-main text-sm font-medium">10 referrals</p>
                <p className="text-sv-text-muted text-xs">Move up 1,000 spots</p>
              </div>
              <span className="text-success text-xs font-medium">Completed</span>
            </div>
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-5 h-5 rounded-full border-2 border-sv-text-muted flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sv-text-main text-sm font-medium">20 referrals</p>
                <p className="text-sv-text-muted text-xs">Instant access unlocked!</p>
              </div>
              <span className="text-sv-text-muted text-xs font-medium">{targetReferrals - currentReferrals} more</span>
            </div>
          </div>
        </motion.div>

        {/* Referral Code */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <label className="block text-sv-text-main text-sm font-medium mb-3">
            Your Referral Code
          </label>
          <div className="flex gap-3">
            <div className="flex-1 bg-sv-glass-bg border border-sv-glass-border rounded-full px-6 py-4 flex items-center justify-center backdrop-blur-sm">
              <span className="text-sv-text-main text-xl font-bold tracking-wider">{referralCode}</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="bg-sv-glass-bg border border-sv-glass-border rounded-full w-14 h-14 flex items-center justify-center hover:border-sv-azure transition-colors backdrop-blur-sm"
              aria-label="Copy referral code"
            >
              {copied ? (
                <CheckCircle2 className="w-6 h-6 text-success" aria-hidden="true" />
              ) : (
                <Copy className="w-6 h-6 text-sv-text-muted" aria-hidden="true" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Share Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onClick={handleShare}
          className="w-full bg-sv-azure text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity min-h-[56px]"
        >
          <Share2 className="w-5 h-5" aria-hidden="true" />
          Share Referral Code
        </motion.button>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-sv-text-muted text-sm mt-8"
        >
          We'll notify you at{" "}
          <span className="text-sv-text-main font-medium">{email}</span>
          {" "}when you're approved
        </motion.p>
      </motion.div>
    </div>
  );
}
