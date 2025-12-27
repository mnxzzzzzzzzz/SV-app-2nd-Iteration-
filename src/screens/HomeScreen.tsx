"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { Colors, Spacing, FontSize, BorderRadius } from "../constants/Colors"
import Card from "../components/ui/Card"
import Badge from "../components/ui/Badge"
import { useEffect, useRef } from "react"

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const stats = {
    savings: 1247,
    discounts: 23,
    visits: 45,
  }

  const recentActivities = [
    {
      id: "1",
      merchant: "Campus Coffee House",
      discount: 20,
      time: "2 hours ago",
      amount: 4.5,
    },
    {
      id: "2",
      merchant: "UniBooks & Supplies",
      discount: 15,
      time: "Yesterday",
      amount: 12.0,
    },
    {
      id: "3",
      merchant: "Tech Store",
      discount: 25,
      time: "3 days ago",
      amount: 45.0,
    },
  ]

  const nearbyDeals = [
    {
      id: "1",
      name: "Campus Coffee House",
      discount: 20,
      distance: "0.3 km",
      logo: "https://via.placeholder.com/80",
      popular: true,
    },
    {
      id: "2",
      name: "Student Gym",
      discount: 30,
      distance: "0.5 km",
      logo: "https://via.placeholder.com/80",
      popular: false,
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.headerLeft}>
            <Image 
              source={require("../../assets/studentverse-icon.svg")} 
              style={styles.miniLogo}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.greeting}>Good Morning</Text>
              <Text style={styles.userName}>John Student</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={Colors.text.primary} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>3</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Stats Card */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Card style={styles.statsCard}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statsGradient}
            >
              <Text style={styles.statsTitle}>Your Total Savings</Text>
              <Text style={styles.statsAmount}>${stats.savings.toLocaleString()}</Text>
              <Text style={styles.statsSubtext}>This semester</Text>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stats.discounts}</Text>
                  <Text style={styles.statLabel}>Active Deals</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stats.visits}</Text>
                  <Text style={styles.statLabel}>Visits</Text>
                </View>
              </View>
            </LinearGradient>
          </Card>
        </Animated.View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: `${Colors.primary}20` }]}>
                <Ionicons name="qr-code" size={24} color={Colors.primary} />
              </View>
              <Text style={styles.actionText}>Scan QR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: `${Colors.success}20` }]}>
                <Ionicons name="card" size={24} color={Colors.success} />
              </View>
              <Text style={styles.actionText}>SV Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: `${Colors.warning}20` }]}>
                <Ionicons name="planet" size={24} color={Colors.warning} />
              </View>
              <Text style={styles.actionText}>Orbit AI</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: `${Colors.error}20` }]}>
                <Ionicons name="wallet" size={24} color={Colors.error} />
              </View>
              <Text style={styles.actionText}>Wallet</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nearby Deals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Deals</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {nearbyDeals.map((deal) => (
            <Card key={deal.id} style={styles.dealCard}>
              <View style={styles.dealContent}>
                <Image source={{ uri: deal.logo }} style={styles.dealLogo} />
                <View style={styles.dealInfo}>
                  <View style={styles.dealHeader}>
                    <Text style={styles.dealName}>{deal.name}</Text>
                    {deal.popular && (
                      <Badge variant="warning">
                        <Text style={[styles.badgeText, { color: Colors.warning }]}>Popular</Text>
                      </Badge>
                    )}
                  </View>
                  <View style={styles.dealDetails}>
                    <View style={styles.dealDetailItem}>
                      <Ionicons name="location" size={14} color={Colors.text.tertiary} />
                      <Text style={styles.dealDetailText}>{deal.distance}</Text>
                    </View>
                    <View style={styles.dealDetailItem}>
                      <Ionicons name="pricetag" size={14} color={Colors.success} />
                      <Text style={[styles.dealDetailText, { color: Colors.success }]}>{deal.discount}% OFF</Text>
                    </View>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
              </View>
            </Card>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          {recentActivities.map((activity) => (
            <Card key={activity.id} style={styles.activityCard}>
              <View style={styles.activityContent}>
                <View style={styles.activityIcon}>
                  <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityMerchant}>{activity.merchant}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <View style={styles.activityAmount}>
                  <Text style={styles.activitySaved}>-${activity.amount.toFixed(2)}</Text>
                  <Text style={styles.activityDiscount}>{activity.discount}% OFF</Text>
                </View>
              </View>
            </Card>
          ))}
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
    paddingTop: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  miniLogo: {
    width: 40,
    height: 40,
  },
  greeting: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
  },
  userName: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text.primary,
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.error,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCount: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.text.primary,
  },
  statsCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: 0,
    overflow: "hidden",
  },
  statsGradient: {
    padding: Spacing.lg,
  },
  statsTitle: {
    fontSize: FontSize.md,
    color: Colors.text.primary,
    opacity: 0.9,
  },
  statsAmount: {
    fontSize: 48,
    fontWeight: "700",
    color: Colors.text.primary,
    marginVertical: Spacing.xs,
  },
  statsSubtext: {
    fontSize: FontSize.sm,
    color: Colors.text.primary,
    opacity: 0.8,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: Spacing.lg,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: FontSize.xxl,
    fontWeight: "700",
    color: Colors.text.primary,
  },
  statLabel: {
    fontSize: FontSize.sm,
    color: Colors.text.primary,
    opacity: 0.8,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  seeAllText: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontSize: FontSize.xs,
    color: Colors.text.secondary,
    fontWeight: "600",
  },
  dealCard: {
    marginBottom: Spacing.md,
  },
  dealContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  dealLogo: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceLight,
    marginRight: Spacing.md,
  },
  dealInfo: {
    flex: 1,
  },
  dealHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  dealName: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: "600",
  },
  dealDetails: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  dealDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dealDetailText: {
    fontSize: FontSize.sm,
    color: Colors.text.tertiary,
  },
  activityCard: {
    marginBottom: Spacing.sm,
  },
  activityContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.success}20`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityMerchant: {
    fontSize: FontSize.md,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: FontSize.sm,
    color: Colors.text.tertiary,
  },
  activityAmount: {
    alignItems: "flex-end",
  },
  activitySaved: {
    fontSize: FontSize.md,
    fontWeight: "700",
    color: Colors.success,
    marginBottom: 2,
  },
  activityDiscount: {
    fontSize: FontSize.xs,
    color: Colors.text.tertiary,
  },
})
