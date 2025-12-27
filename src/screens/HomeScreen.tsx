"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { Colors, Spacing, FontSize, BorderRadius } from "../constants/Colors"
import Card from "../components/ui/Card"
import Badge from "../components/ui/Badge"
import { useState, useEffect, useRef } from "react"

import { useNavigation } from "@react-navigation/native"

export default function HomeScreen() {
  const navigation = useNavigation<any>()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current
  const moveAnim = useRef(new Animated.Value(0)).current

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
      Animated.loop(
        Animated.sequence([
          Animated.timing(moveAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(moveAnim, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start()
  }, [])

  const moveX = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  })

  const moveY = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  })

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

  const [activeCategory, setActiveCategory] = useState("All")
  const categories = ["All", "Entertainment", "Clothing", "Food", "Tech"]

  const nearbyDeals = [
    {
      id: "1",
      name: "Campus Coffee House",
      discount: 20,
      distance: "0.3 km",
      logo: "https://via.placeholder.com/80",
      popular: true,
      category: "Food",
    },
    {
      id: "2",
      name: "Student Gym",
      discount: 30,
      distance: "0.5 km",
      logo: "https://via.placeholder.com/80",
      popular: false,
      category: "Entertainment",
    },
    {
      id: "3",
      name: "Urban Threads",
      discount: 15,
      distance: "1.2 km",
      logo: "https://via.placeholder.com/80",
      popular: true,
      category: "Clothing",
    },
  ]

  const filteredDeals = activeCategory === "All" 
    ? nearbyDeals 
    : nearbyDeals.filter(d => d.category === activeCategory)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.headerLeft}>
            <Image 
              source={require("../../assets/studentverse-icon.png")} 
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
              colors={["#2962FF", "#080C1F"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.5, y: 1.5 }}
              style={styles.statsGradient}
            >
              <Animated.View 
                style={[
                  styles.glowOverlay, 
                  { 
                    transform: [
                      { translateX: moveX },
                      { translateY: moveY },
                    ] 
                  }
                ]} 
              >
                <LinearGradient
                  colors={["rgba(255, 255, 255, 0.15)", "transparent"]}
                  style={{ flex: 1, borderRadius: 100 }}
                />
              </Animated.View>
              
              <Text style={styles.statsTitle}>Your Total Savings</Text>
              <Text style={styles.statsAmount}>{stats.savings.toLocaleString()} AED</Text>
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
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("QR")}>
              <View style={[styles.actionIcon, { backgroundColor: `${Colors.primary}20` }]}>
                <Ionicons name="qr-code" size={24} color={Colors.primary} />
              </View>
              <Text style={styles.actionText}>Scan QR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Pay")}>
              <View style={[styles.actionIcon, { backgroundColor: `${Colors.success}20` }]}>
                <Ionicons name="card" size={24} color={Colors.success} />
              </View>
              <Text style={styles.actionText}>SV Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Orbit")}>
              <View style={[styles.actionIcon, { backgroundColor: `${Colors.warning}20` }]}>
                <Ionicons name="planet" size={24} color={Colors.warning} />
              </View>
              <Text style={styles.actionText}>Orbit AI</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Me")}>
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

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryContent}
          >
            {categories.map(cat => (
              <TouchableOpacity 
                key={cat} 
                style={[
                  styles.categoryButton, 
                  activeCategory === cat && styles.categoryButtonActive
                ]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[
                  styles.categoryText,
                  activeCategory === cat && styles.categoryTextActive
                ]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {filteredDeals.map((deal) => (
            <TouchableOpacity key={deal.id} onPress={() => navigation.navigate("QR", { merchant: deal })}>
              <Card style={styles.dealCard}>
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
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          {recentActivities.map((activity) => (
            <TouchableOpacity key={activity.id} onPress={() => navigation.navigate("QR", { merchant: activity })}>
              <Card style={styles.activityCard}>
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
            </TouchableOpacity>
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
  categoryScroll: {
    marginBottom: Spacing.lg,
    marginHorizontal: -Spacing.lg,
  },
  categoryContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    color: Colors.text.secondary,
    fontWeight: "600",
    fontSize: 14,
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  statsCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: 0,
    overflow: "hidden",
    borderRadius: 24,
    elevation: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  statsGradient: {
    padding: Spacing.xl,
  },
  statsTitle: {
    fontSize: FontSize.md,
    color: Colors.text.primary,
    opacity: 0.7,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  statsAmount: {
    fontSize: 56,
    fontWeight: "800",
    color: Colors.text.primary,
    marginVertical: Spacing.sm,
    letterSpacing: -1,
  },
  statsSubtext: {
    fontSize: FontSize.sm,
    color: Colors.text.primary,
    opacity: 0.6,
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    marginTop: Spacing.xl,
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text.primary,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.text.primary,
    opacity: 0.6,
    marginTop: 4,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  glowOverlay: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.6,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  seeAllText: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: "700",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionButton: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  actionText: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontWeight: "700",
  },
  dealCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dealContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  dealLogo: {
    width: 64,
    height: 64,
    borderRadius: 16,
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
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: -0.3,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
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
    fontSize: 13,
    color: Colors.text.tertiary,
    fontWeight: "500",
  },
  activityCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: 16,
    backgroundColor: Colors.surface,
  },
  activityContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: `${Colors.success}15`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityMerchant: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 13,
    color: Colors.text.tertiary,
    fontWeight: "500",
  },
  activityAmount: {
    alignItems: "flex-end",
  },
  activitySaved: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.success,
    marginBottom: 2,
  },
  activityDiscount: {
    fontSize: 12,
    color: Colors.text.tertiary,
    fontWeight: "600",
  },
})
