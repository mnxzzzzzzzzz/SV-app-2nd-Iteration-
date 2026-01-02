import { useState, useEffect } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { BottomNav } from "./components/BottomNav";
import { HomeScreen } from "./components/screens/HomeScreen";
import { QRScreen } from "./components/screens/QRScreen";
import { PayScreen } from "./components/screens/PayScreen";
import { OrbitScreen } from "./components/screens/OrbitScreen";
import { MeScreen } from "./components/screens/MeScreen";
import { DesignSystemShowcase } from "./components/DesignSystemShowcase";
import { EmailEntry } from "./components/auth/EmailEntry";
import { OTPVerification } from "./components/auth/OTPVerification";
import { Waitlist } from "./components/auth/Waitlist";

import { LoadingScreen } from "./components/shared/LoadingScreen";

type AuthStep = "email" | "loading" | "otp" | "waitlist" | "authenticated";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [showDesignSystem, setShowDesignSystem] = useState(false);
  const [authStep, setAuthStep] = useState<AuthStep>("email");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Auto-hide splash screen after animation completes
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Listen for hash changes to show design system
    const handleHashChange = () => {
      if (window.location.hash === "#design-system") {
        setShowDesignSystem(true);
      } else {
        setShowDesignSystem(false);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Check on mount

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Dev helper: Allow bypassing auth with hash
  useEffect(() => {
    if (window.location.hash === "#skip-auth") {
      setAuthStep("authenticated");
      setUserEmail("demo@university.edu");
    }
  }, []);

  // Auth handlers
  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
    setAuthStep("loading");
    setTimeout(() => {
      setAuthStep("otp");
    }, 2000);
  };

  const handleOTPVerify = () => {
    // For demo purposes, randomly decide if user goes to waitlist or gets authenticated
    // In production, this would be determined by backend
    const isOnWaitlist = Math.random() > 0.5; // 50% chance
    setAuthStep(isOnWaitlist ? "waitlist" : "authenticated");
  };

  const handleBackToEmail = () => {
    setAuthStep("email");
    setUserEmail("");
  };

  // Render auth screens
  const renderAuthScreen = () => {
    switch (authStep) {
      case "email":
        return <EmailEntry onSubmit={handleEmailSubmit} />;
      case "loading":
        return <LoadingScreen title="StudentVerse" subtitle="Verifying your information..." />;
      case "otp":
        return (
          <OTPVerification
            email={userEmail}
            onVerify={handleOTPVerify}
            onBack={handleBackToEmail}
          />
        );
      case "waitlist":
        return <Waitlist email={userEmail} />;
      default:
        return null;
    }
  };

  const renderScreen = () => {
    if (showDesignSystem) {
      return (
        <div>
          <button
            onClick={() => {
              window.location.hash = "";
              setShowDesignSystem(false);
            }}
            className="sticky top-0 z-10 w-full bg-sv-glass-bg backdrop-blur-md text-sv-text-main py-4 px-6 border-b border-sv-glass-border"
          >
            ← Back to App
          </button>
          <DesignSystemShowcase />
        </div>
      );
    }

    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "qr":
        return <QRScreen />;
      case "pay":
        return <PayScreen />;
      case "orbit":
        return <OrbitScreen />;
      case "me":
        return <MeScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-sv-navy">
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Main App */}
      {!showSplash && (
        <>
          {/* Mobile Container */}
          <div className="max-w-[480px] mx-auto min-h-screen bg-sv-navy relative">
            {/* Authentication Flow */}
            {authStep !== "authenticated" && renderAuthScreen()}

            {/* Main App Content - Only show when authenticated */}
            {authStep === "authenticated" && (
              <>
                {/* Content Area */}
                <main className="overflow-y-auto">
                  {renderScreen()}
                </main>

                {/* Bottom Navigation - Hidden when viewing design system */}
                {!showDesignSystem && (
                  <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
