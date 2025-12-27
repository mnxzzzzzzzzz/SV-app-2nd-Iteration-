"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Colors, Spacing, FontSize, BorderRadius } from "../../constants/Colors"
import Card from "../ui/Card"
import Badge from "../ui/Badge"
import type { Merchant } from "../../types"

interface MerchantListScreenProps {
  onMerchantSelect: (merchant: Merchant) => void
}

const MOCK_MERCHANTS: Merchant[] = [
  {
    id: "1",
    name: "Campus Coffee House",
    logo: "https://via.placeholder.com/60",
    discount: 20,
    distance: "0.3 km",
    location: "Student Union Building",
    usesPerDay: 1,
    expiresAt: "23:59",
  },
  {
    id: "2",
    name: "UniBooks & Supplies",
    logo: "https://via.placeholder.com/60",
    discount: 15,
    distance: "0.5 km",
    location: "Main Campus",
    usesPerDay: 1,
    expiresAt: "23:59",
  },
  {
    id: "3",
    name: "Tech Store",
    logo: "https://via.placeholder.com/60",
    discount: 25,
    distance: "0.8 km",
    location: "Tech Hub",
    usesPerDay: 1,
    expiresAt: "23:59",
  },
  {
    id: "4",
    name: "Campus Gym & Fitness",
    logo: "https://via.placeholder.com/60",
    discount: 30,
    distance: "1.2 km",
    location: "Sports Complex",
    usesPerDay: 1,
    expiresAt: "23:59",
  },
]

export default function MerchantListScreen({ onMerchantSelect }: MerchantListScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMerchants = MOCK_MERCHANTS.filter((merchant) =>
    merchant.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderMerchant = ({ item }: { item: Merchant }) => (
    <TouchableOpacity onPress={() => onMerchantSelect(item)} activeOpacity={0.7}>
      <Card style={styles.merchantCard}>
        <View style={styles.merchantHeader}>
          <Image source={{ uri: item.logo }} style={styles.merchantLogo} />
          <View style={styles.merchantInfo}>
            <View style={styles.merchantTitleRow}>
              <Text style={styles.merchantName}>{item.name}</Text>
              <Badge variant="success" style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}% OFF</Text>
              </Badge>
            </View>
            <View style={styles.merchantDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="location" size={14} color={Colors.text.tertiary} />
                <Text style={styles.detailText}>{item.distance}</Text>
              </View>
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>
        </View>
        <View style={styles.merchantFooter}>
          <Text style={styles.footerText}>
            {item.usesPerDay} use/day • Expires {item.expiresAt}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Merchant Discounts</Text>
        <Text style={styles.subtitle}>Select a merchant to activate your discount</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.text.tertiary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search merchants..."
          placeholderTextColor={Colors.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredMerchants}
        renderItem={renderMerchant}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: FontSize.md,
    color: Colors.text.primary,
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  merchantCard: {
    marginBottom: Spacing.md,
  },
  merchantHeader: {
    flexDirection: "row",
    marginBottom: Spacing.md,
  },
  merchantLogo: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
    backgroundColor: Colors.surfaceLight,
  },
  merchantInfo: {
    flex: 1,
  },
  merchantTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.xs,
  },
  merchantName: {
    fontSize: FontSize.lg,
    fontWeight: "600",
    color: Colors.text.primary,
    flex: 1,
  },
  discountBadge: {
    marginLeft: Spacing.sm,
  },
  discountText: {
    color: Colors.success,
    fontWeight: "700",
  },
  merchantDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: FontSize.sm,
    color: Colors.text.tertiary,
  },
  locationText: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
  merchantFooter: {
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerText: {
    fontSize: FontSize.sm,
    color: Colors.text.tertiary,
  },
})
