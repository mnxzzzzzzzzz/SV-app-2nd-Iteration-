import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface OTPVerificationProps {
  email: string;
  onVerify: () => void;
  onBack: () => void;
}

export function OTPVerification({ email, onVerify, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const maskEmail = (email: string) => {
    const [username, domain] = email.split("@");
    const maskedUsername = username.slice(0, 2) + "***" + username.slice(-1);
    return `${maskedUsername}@${domain}`;
  };

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const digits = pastedData.split("").filter(char => /^\d$/.test(char));
    
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);
    
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    setTimeout(() => {
      setIsLoading(false);
      if (otpCode === "123456") {
        onVerify();
      } else {
        setError("Invalid OTP. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  const handleResend = () => {
    setCountdown(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  const isComplete = otp.every(digit => digit !== "");

  return (
    <div className="min-h-screen bg-sv-navy flex flex-col px-6 max-w-[480px] mx-auto">
      {/* Header */}
      <div className="pt-8 pb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sv-text-muted hover:text-sv-text-main transition-colors min-h-[48px]"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          <span>Back</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center w-20 h-20 rounded-full bg-sv-azure/20 mx-auto mb-8"
          >
            <CheckCircle2 className="w-10 h-10 text-sv-azure" aria-hidden="true" />
          </motion.div>

          {/* Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-semibold text-sv-text-main mb-3">Verify Your Email</h1>
            <p className="text-sv-text-muted">
              We sent a 6-digit code to
            </p>
            <p className="text-sv-text-main font-medium mt-1">{maskEmail(email)}</p>
          </motion.div>

          {/* OTP Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <div className="flex gap-3 justify-center mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 bg-sv-glass-bg border border-sv-glass-border rounded-xl text-sv-text-main text-center text-xl font-semibold focus:outline-none focus:border-sv-azure transition-colors backdrop-blur-sm"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm text-center"
                role="alert"
              >
                {error}
              </motion.p>
            )}
          </motion.div>

          {/* Countdown Timer & Resend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-8"
          >
            {!canResend ? (
              <p className="text-sv-text-muted text-sm">
                Resend code in{" "}
                <span className="text-sv-text-main font-medium">{countdown}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sv-azure text-sm font-medium hover:underline min-h-[44px]"
              >
                Didn't receive the code? Resend
              </button>
            )}
          </motion.div>

          {/* Verify Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={handleVerify}
            disabled={!isComplete || isLoading}
            className="w-full bg-sv-azure text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
          >
            {isLoading ? (
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            ) : (
              "Verify"
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
