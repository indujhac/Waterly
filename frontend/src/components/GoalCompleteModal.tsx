import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

type GoalCompleteModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function GoalCompleteModal({
  visible,
  onClose,
}: GoalCompleteModalProps) {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <View
          style={[styles.modal, { backgroundColor: colors.modalBackground }]}
        >
          <Text style={styles.celebration}>🎉</Text>

          <Text style={[styles.title, { color: colors.text }]}>
            You did it!
          </Text>

          <Text style={[styles.message, { color: colors.mutedText }]}>
            Your 2000 ml goal is complete.
            {"\n"}
            You can keep logging if you drink more 💧
          </Text>

          <Pressable
            style={[styles.button, { backgroundColor: colors.primaryButton }]}
            onPress={onClose}
          >
            <Text style={[styles.buttonText, { color: colors.white }]}>
              Keep going
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  modal: {
    width: "100%",
    borderRadius: 28,
    padding: 28,
    alignItems: "center",
  },
  celebration: {
    fontSize: 46,
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  message: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 22,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 15,
  },
});
