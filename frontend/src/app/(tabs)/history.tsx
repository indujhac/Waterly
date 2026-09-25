import { useTheme } from "@/src/context/ThemeContext";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getHydrationHistory } from "../../api/api";
type HydrationRecord = {
  date: string;
  waterAmount: number;
  dailyGoal: number;
};
export default function HistoryScreen() {
  const { colors } = useTheme();
  const [history, setHistory] = useState<HydrationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();

  const startOfWeek = new Date(today);
  const day = today.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  startOfWeek.setDate(today.getDate() + diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const weekData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const dateString = `${year}-${month}-${day}`;
    const record = history.find((item) => item.date === dateString);

    return {
      day: date
        .toLocaleDateString("en-US", {
          weekday: "short",
        })
        .charAt(0),
      completed: record ? record.waterAmount >= record.dailyGoal : false,
    };
  });

  const weeklyTotal = history
    .filter((item) => {
      const itemDate = new Date(item.date);

      return itemDate >= startOfWeek && itemDate <= today;
    })
    .reduce((total, item) => total + item.waterAmount, 0);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getHydrationHistory();
        setHistory(data);
      } catch (error) {
        console.error("Failed to load hydration history:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);
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
            {weeklyTotal.toLocaleString()} ml
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
          {history.map((item, index) => {
            const completed = item.waterAmount >= item.dailyGoal;

            return (
              <View
                key={index}
                style={[styles.drinkRow, { borderColor: colors.button }]}
              >
                <View style={styles.historyContent}>
                  {/* First row */}
                  <View style={styles.historyTopRow}>
                    <Text style={[styles.historyDate, { color: colors.text }]}>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    </Text>

                    <Text
                      style={[styles.historyAmount, { color: colors.text }]}
                    >
                      {item.waterAmount} ml
                    </Text>
                  </View>

                  {/* Second row */}
                  <View style={styles.historyBottomRow}>
                    <Text
                      style={[styles.historyGoal, { color: colors.mutedText }]}
                    >
                      Daily goal: {item.dailyGoal} ml
                    </Text>

                    <Text
                      style={[
                        styles.check,
                        {
                          color: completed ? colors.accent : colors.mutedText,
                        },
                      ]}
                    >
                      {completed ? "✓" : "x"}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
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
  historyContent: {
    flex: 1,
    gap: 8,
  },

  historyTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  historyBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  historyDate: {
    fontSize: 16,
    fontWeight: "600",
  },

  historyAmount: {
    fontSize: 16,
    fontWeight: "600",
  },

  historyGoal: {
    fontSize: 14,
  },

  drinkRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
});
