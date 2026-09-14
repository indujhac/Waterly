import { useTheme } from "@/src/context/ThemeContext";
import { StyleSheet, Text, View } from "react-native";

export default function HistoryScreen() {
  const { colors } = useTheme();
  const weekData = [
    { day: "M", completed: true },
    { day: "T", completed: true },
    { day: "W", completed: false },
    { day: "T", completed: true },
    { day: "F", completed: true },
    { day: "S", completed: false },
    { day: "S", completed: false },
  ];
  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <Text style={[styles.title, { color: colors.text }]}>History</Text>

        <Text style={[styles.month, { color: colors.mutedText }]}>
          September 2026
        </Text>

        {/* Weekly summary */}
        <View style={[styles.card, { backgroundColor: colors.button }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            This week
          </Text>

          <Text style={[styles.amount, { color: colors.accent }]}>
            8,250 ml
          </Text>

          <Text style={[styles.description, { color: colors.mutedText }]}>
            Total water consumed
          </Text>
        </View>
        <View style={styles.weekRow}>
          {weekData.map((item, index) => (
            <View key={index} style={styles.dayItem}>
              <Text style={[styles.dayLabel, { color: colors.mutedText }]}>
                {item.day}
              </Text>

              <View
                style={[
                  styles.dayCircle,
                  {
                    backgroundColor: item.completed
                      ? colors.button
                      : colors.inputBackground,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.check,
                    {
                      color: item.completed ? colors.accent : colors.mutedText,
                    },
                  ]}
                >
                  {item.completed ? "✓" : "–"}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Recent drinks
        </Text>

        <View style={styles.drinkList}>
          <View style={styles.drinkRow}>
            <View>
              <Text style={[styles.drinkAmount, { color: colors.text }]}>
                500 ml
              </Text>

              <Text style={[styles.drinkTime, { color: colors.mutedText }]}>
                Today · 11:42 AM
              </Text>
            </View>

            <Text style={[styles.drinkIcon, { color: colors.accent }]}>💧</Text>
          </View>

          <View style={styles.drinkRow}>
            <View>
              <Text style={[styles.drinkAmount, { color: colors.text }]}>
                250 ml
              </Text>

              <Text style={[styles.drinkTime, { color: colors.mutedText }]}>
                Today · 9:15 AM
              </Text>
            </View>

            <Text style={[styles.drinkIcon, { color: colors.accent }]}>💧</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
  },

  month: {
    fontSize: 16,
    marginTop: 6,
  },

  card: {
    marginTop: 28,
    padding: 20,
    borderRadius: 24,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
  },

  amount: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 12,
  },

  description: {
    fontSize: 14,
    marginTop: 4,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
  },

  dayItem: {
    alignItems: "center",
    gap: 8,
  },

  dayLabel: {
    fontSize: 13,
    fontWeight: "600",
  },

  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  check: {
    fontSize: 18,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    marginTop: 32,
  },

  drinkList: {
    marginTop: 14,
    gap: 10,
  },

  drinkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.55)",
  },

  drinkAmount: {
    fontSize: 16,
    fontWeight: "600",
  },

  drinkTime: {
    fontSize: 13,
    marginTop: 4,
  },

  drinkIcon: {
    fontSize: 22,
  },
});
