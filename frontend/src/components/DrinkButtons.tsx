import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

type DrinkButtonsProps = {
  onAdd: (amount: number) => void;
  onCustom: () => void;
};

export default function DrinkButtons({ onAdd, onCustom }: DrinkButtonsProps) {
  const { colors } = useTheme();

  return (
    <>
      <Text style={[styles.question, { color: colors.text }]}>
        How much did you drink?
      </Text>

      <View style={styles.buttons}>
        {[150, 250, 500].map((amount) => (
          <Pressable
            key={amount}
            style={[styles.button, { backgroundColor: colors.button }]}
            onPress={() => onAdd(amount)}
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>
              +{amount} ml
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.customButton} onPress={onCustom}>
        <Text style={[styles.customText, { color: colors.accent }]}>
          ＋ Custom amount
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  question: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 14,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
  },
  customButton: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 4,
  },
  customText: {
    fontWeight: "600",
  },
});
