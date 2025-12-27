"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Colors, Spacing, FontSize, BorderRadius } from "../constants/Colors"
import Card from "../components/ui/Card"

export default function MeScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [darkModeEnabled, setDarkModeEnabled] = useState(true)

  const user = {
    name: "John Student",
    email: "john.student@university.edu",
    studentId: "2024001234",
    verified: true,
    avatar: "https://via.placeholder.com/100",
  }

  const menuSections = [
    {
      title: "Account",
      items: [
        { icon: "person-outline", label: "Edit Profile", color: Colors.primary },
        { icon: "school-outline", label: "Student Verification", color: Colors.success },
        { icon: "card-outline", label: "Payment Methods", color: Colors.warning },
        { icon: "shield-checkmark-outline", label: "Security", color: Colors.error },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: "notifications-outline",
          label: "Push Notifications",
          hasSwitch: true,
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        {
          icon: "finger-print-outline",
          label: "Biometric Login",
          hasSwitch: true,
          value: biometricEnabled,
          onToggle: setBiometricEnabled,
        },
        {
          icon: "moon-outline",
          label: "Dark Mode",
          hasSwitch: true,
          value: darkModeEnabled,
          onToggle: setDarkModeEnabled,
        },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: "help-circle-outline", label: "Help Center", color: Colors.text.tertiary },
        { icon: "chatbubble-outline", label: "Contact Support", color: Colors.text.tertiary },
        { icon: "document-text-outline", label: "Terms & Privacy", color: Colors.text.tertiary },
      ],
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              {user.verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
                </View>
              )}
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <View style={styles.studentIdContainer}>
                <Ionicons name="card-outline" size={16} color={Colors.text.tertiary} />
                <Text style={styles.studentId}>ID: {user.studentId}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </Card>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>$1,247</Text>
            <Text style={styles.statLabel}>Total Saved</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>Visits</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>23</Text>
            <Text style={styles.statLabel}>Active Deals</Text>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>{section.title}</Text>
            <Card style={styles.menuCard}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    disabled={item.hasSwitch}
                    activeOpacity={item.hasSwitch ? 1 : 0.7}
                  >
                    <View style={styles.menuItemLeft}>
                      <View style={[styles.menuIcon, { backgroundColor: `${(item.color as string) || Colors.primary}20` }]}>
                        <Ionicons name={item.icon as any} size={20} color={(item.color as string) || Colors.text.primary} />
                      </View>
                      <Text style={styles.menuItemLabel}>{item.label}</Text>
                    </View>
                    {item.hasSwitch ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: Colors.border, true: Colors.primary }}
                        thumbColor={Colors.text.primary}
                      />
                    ) : (
                      <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
                    )}
                  </TouchableOpacity>
                  {itemIndex < section.items.length - 1 && <View style={styles.menuDivider} />}
                </View>
              ))}
            </Card>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>StudentVerse v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: "700",
    color: Colors.text.primary,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  profileContent: {
    flexDirection: "row",
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    position: "relative",
    marginRight: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surfaceLight,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderRadius: 12,
  },
  profileInfo: {
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  studentIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  studentId: {
    fontSize: FontSize.sm,
    color: Colors.text.tertiary,
  },
  editButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: "center",
  },
  editButtonText: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statValue: {
    fontSize: FontSize.xxl,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
  menuSection: {
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  menuSectionTitle: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.text.tertiary,
    marginBottom: Spacing.sm,
  },
  menuCard: {
    padding: 0,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.md,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  menuItemLabel: {
    fontSize: FontSize.md,
    color: Colors.text.primary,
    fontWeight: "500",
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: Spacing.md + 40 + Spacing.md,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    padding: Spacing.lg,
    backgroundColor: `${Colors.error}15`,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: `${Colors.error}30`,
    gap: Spacing.sm,
  },
  logoutText: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.error,
  },
  footer: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
  },
  footerText: {
    fontSize: FontSize.sm,
    color: Colors.text.tertiary,
  },
})
