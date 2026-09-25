import BobaCup from "@/src/components/BobaCup";
import DrinkButtons from "@/src/components/DrinkButtons";
import GoalCompleteModal from "@/src/components/GoalCompleteModal";
import { useAuth } from "@/src/context/authContext";
import { useHydration } from "@/src/context/HydrationContext";
import { useTheme } from "@/src/context/ThemeContext";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
export default function HomeScreen() {
  const { colors } = useTheme();
  const { handleLogout, user } = useAuth();
  const { waterAmount, dailyGoal, addDrink } = useHydration();
  const [customVisible, setCustomVisible] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [goalPopupVisible, setGoalPopupVisible] = useState(false);
  const router = useRouter();
  const progress = useMemo(
    () => Math.min(waterAmount / dailyGoal, 1),
    [waterAmount],
  );
  const goalReached = waterAmount >= dailyGoal;

  const HandleAddWater = (amount: number) => {
    const wasBelowGoal = waterAmount < dailyGoal;
    addDrink(amount);
    const willReachGoal = waterAmount + amount >= dailyGoal;
    if (wasBelowGoal && willReachGoal) {
      setGoalPopupVisible(true);
    }
  };

  const getTodayDate = () => {
    const now = new Date();

    const indiaDate = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
    }).format(now);

    return indiaDate;
  };

  const date = getTodayDate();

  const addCustomAmount = () => {
    const amount = Number(customAmount);

    if (!amount || amount <= 0) {
      Alert.alert("Invalid amount", "Please enter a valid amount.");
      return;
    }

    HandleAddWater(amount);
    setCustomAmount("");
    setCustomVisible(false);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>
          Hey {user?.name}! 💧
        </Text>
        <Text style={[styles.date, { color: colors.mutedText }]}>{date}</Text>
      </View>

      <Pressable
        onPress={() => {
          handleLogout();
        }}
      >
        <Text style={{ color: colors.text }}>logout</Text>
      </Pressable>

      <View style={styles.cupArea}>
        <BobaCup progress={progress} goalReached={goalReached} />
      </View>

      <View style={styles.progressArea}>
        <Text style={[styles.amount, { color: colors.text }]}>
          {waterAmount} ml
        </Text>

        <Text style={[styles.goal, { color: colors.mutedText }]}>
          {goalReached ? `${dailyGoal} ml goal ✓` : `of ${dailyGoal} ml`}
        </Text>
      </View>

      <DrinkButtons
        onAdd={HandleAddWater}
        onCustom={() => setCustomVisible(true)}
      />

      <GoalCompleteModal
        visible={goalPopupVisible}
        onClose={() => setGoalPopupVisible(false)}
      />

      <Modal
        visible={customVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCustomVisible(false)}
      >
        <View
          style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}
        >
          <View
            style={[styles.modal, { backgroundColor: colors.modalBackground }]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Add water
            </Text>

            <Text style={[styles.modalSubtitle, { color: colors.mutedText }]}>
              How many ml did you drink?
            </Text>

            <TextInput
              value={customAmount}
              onChangeText={setCustomAmount}
              placeholder="e.g. 350"
              keyboardType="numeric"
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.inputBorder,
                  color: colors.text,
                },
              ]}
              autoFocus
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={[
                  styles.cancelButton,
                  { backgroundColor: colors.cancelButton },
                ]}
                onPress={() => {
                  setCustomAmount("");
                  setCustomVisible(false);
                }}
              >
                <Text style={[styles.cancelText, { color: colors.cancelText }]}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.addButton,
                  { backgroundColor: colors.primaryButton },
                ]}
                onPress={addCustomAmount}
              >
                <Text style={[styles.addText, { color: colors.white }]}>
                  Add
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 55,
  },

  header: {
    flexShrink: 0,
  },

  greeting: {
    fontSize: 28,
    fontWeight: "700",
  },

  date: {
    fontSize: 14,
    marginTop: 4,
  },

  cupArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 0,
    marginTop: 1,
    marginBottom: -60,
  },

  progressArea: {
    flexShrink: 0,
    alignItems: "center",
  },

  amount: {
    fontSize: 32,
    fontWeight: "700",
  },

  goal: {
    fontSize: 14,
    marginTop: 2,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  modal: {
    width: "100%",
    borderRadius: 24,
    padding: 24,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
  },

  modalSubtitle: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 18,
  },

  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 17,
  },

  modalButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },

  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  cancelText: {
    fontWeight: "600",
  },

  addButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  addText: {
    fontWeight: "700",
  },
});
