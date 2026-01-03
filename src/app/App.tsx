import { useState, useEffect } from "react";
import "../global.css";

import { BottomNav } from "./components/BottomNav";
import { HomeScreen } from "./components/screens/HomeScreen";
import { SearchScreen } from "./components/screens/SearchScreen";
import { PayScreen } from "./components/screens/PayScreen";
import { OrbitScreen } from "./components/screens/OrbitScreen";
import { MeScreen } from "./components/screens/MeScreen";
import { QRScreen } from "./components/screens/QRScreen";
import { DesignSystemShowcase } from "./components/DesignSystemShowcase";
import { EmailEntry } from "./components/auth/EmailEntry";
import { OTPVerification } from "./components/auth/OTPVerification";
import { Waitlist } from "./components/auth/Waitlist";

import { LoadingScreen } from "./components/shared/LoadingScreen";

type AuthStep = "email" | "loading" | "otp" | "waitlist" | "authenticated";

export default function App() {
  const skipSplash = true; // Skip splash screen
  const [showSplash, setShowSplash] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [showDesignSystem, setShowDesignSystem] = useState(false);
  const [authStep, setAuthStep] = useState<AuthStep>("email");
  const [userEmail, setUserEmail] = useState("");
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const handleOfferClick = (offerId: string) => {
    setSelectedOfferId(offerId);
    setActiveTab("qr");
  };

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
      setAuthStep("authenticated");
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

  const handleLogout = () => {
    setAuthStep("email");
    setUserEmail("");
    setActiveTab("home");
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
        return <HomeScreen onOfferClick={handleOfferClick} />;
      case "search":
        return <SearchScreen onOfferClick={handleOfferClick} />;
      case "pay":
        return <PayScreen />;
      case "orbit":
        return <OrbitScreen />;
      case "qr":
        return <QRScreen />;
      case "me":
        return <MeScreen onLogout={handleLogout} />;
      default:
        return <HomeScreen onOfferClick={handleOfferClick} />;
    }
  };

  return (
    <div className="h-full bg-sv-navy">
      {/* Authentication Flow - Full screen for proper centering */}
      {authStep !== "authenticated" && (
        <div className="h-full">
          {renderAuthScreen()}
        </div>
      )}

      {/* Main App Content - Only show when authenticated */}
      {authStep === "authenticated" && (
        <div className="max-w-[480px] mx-auto h-full bg-sv-navy relative flex flex-col">
          {/* Content Area */}
          <main className="flex-1 overflow-y-auto pb-20">
            {renderScreen()}
          </main>

          {/* Bottom Navigation - Hidden when viewing design system */}
          {!showDesignSystem && (
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
          )}
        </div>
      )}
    </div>
  );
}
