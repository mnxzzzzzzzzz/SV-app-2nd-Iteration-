import React, { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "./src/constants/Colors"

// Screens
import HomeScreen from "./src/screens/HomeScreen"
import QRScreen from "./src/screens/QRScreen"
import PayScreen from "./src/screens/PayScreen"
import OrbitScreen from "./src/screens/OrbitScreen"
import MeScreen from "./src/screens/MeScreen"
import LoginScreen from "./src/screens/auth/LoginScreen"
import OTPScreen from "./src/screens/auth/OTPScreen"

const Tab = createBottomTabNavigator()

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authStep, setAuthStep] = useState<"login" | "otp">("login")
  const [email, setEmail] = useState("")

  if (!isAuthenticated) {
    if (authStep === "login") {
      return (
        <SafeAreaProvider>
          <StatusBar style="light" backgroundColor={Colors.background} />
          <LoginScreen 
            onLogin={(email) => {
              setEmail(email)
              setAuthStep("otp")
            }} 
          />
        </SafeAreaProvider>
      )
    }
    return (
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor={Colors.background} />
        <OTPScreen 
          email={email}
          onVerify={() => setIsAuthenticated(true)}
          onBack={() => setAuthStep("login")}
        />
      </SafeAreaProvider>
    )
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={Colors.background} />
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: Colors.primary,
            background: Colors.background,
            card: Colors.surface,
            text: Colors.text.primary,
            border: Colors.border,
            notification: Colors.primary,
          },
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = "home"

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline"
              } else if (route.name === "QR") {
                iconName = focused ? "qr-code" : "qr-code-outline"
              } else if (route.name === "Pay") {
                iconName = focused ? "card" : "card-outline"
              } else if (route.name === "Orbit") {
                iconName = focused ? "planet" : "planet-outline"
              } else if (route.name === "Me") {
                iconName = focused ? "person" : "person-outline"
              }

              return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.text.tertiary,
            tabBarStyle: {
              backgroundColor: Colors.surface,
              borderTopColor: Colors.border,
              borderTopWidth: 1,
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
            },
            tabBarItemStyle: {
              padding: 0,
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="QR" component={QRScreen} />
          <Tab.Screen name="Pay" component={PayScreen} />
          <Tab.Screen name="Orbit" component={OrbitScreen} />
          <Tab.Screen name="Me" component={MeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
