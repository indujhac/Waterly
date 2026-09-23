import { useTheme } from "@/src/context/ThemeContext";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { setOnboardingCompleted } from "../utils/tokenStorage";
export default function OnboardingScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const handleGetStarted = async () => {
    await setOnboardingCompleted();
    router.replace("/login");
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Top branding */}
        <View style={styles.header}>
          <Text style={[styles.logo, { color: colors.text }]}>Waterly</Text>

          <Text style={styles.logoDrop}>💧</Text>
        </View>

        {/* Main content */}
        <View style={styles.main}>
          <Text style={[styles.title, { color: colors.text }]}>
            Drink water.
            {"\n"}
            Build the habit.
          </Text>

          <Text style={[styles.description, { color: colors.mutedText }]}>
            Keep track of what you drink and stay consistent without making
            hydration complicated.
          </Text>

          {/* Illustration area */}
          <View
            style={[
              styles.illustration,
              { backgroundColor: colors.inputBackground },
            ]}
          >
            <Text style={styles.waterDrop}>💧</Text>

            <View style={styles.cup}>
              <View style={styles.cupWater} />
              <Text style={styles.cupFace}>•ᴗ•</Text>
            </View>

            <View style={styles.sparkleOne}>
              <Text>✦</Text>
            </View>

            <View style={styles.sparkleTwo}>
              <Text>✦</Text>
            </View>
          </View>
        </View>

        {/* Bottom action */}
        <View style={styles.bottom}>
          <Pressable
            onPress={handleGetStarted}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: colors.primaryButton,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: colors.white }]}>
              Get Started
            </Text>

            <Text style={[styles.arrow, { color: colors.white }]}>→</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 24,
  },

  logo: {
    fontSize: 22,
    fontWeight: "700",
  },

  logoDrop: {
    fontSize: 20,
    marginLeft: 5,
  },

  main: {
    flex: 1,
    paddingTop: 55,
  },

  title: {
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    maxWidth: 330,
  },

  illustration: {
    flex: 1,
    minHeight: 280,
    maxHeight: 360,
    borderRadius: 32,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },

  waterDrop: {
    position: "absolute",
    top: 35,
    right: 45,
    fontSize: 30,
  },

  cup: {
    width: 150,
    height: 190,
    borderWidth: 4,
    borderColor: "#7AB8F5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
    position: "relative",
  },

  cupWater: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "65%",
    backgroundColor: "#8FD3FF",
    opacity: 0.8,
  },

  cupFace: {
    fontSize: 28,
    color: "#24518A",
    marginBottom: 55,
    zIndex: 2,
  },

  sparkleOne: {
    position: "absolute",
    left: 45,
    top: 80,
  },

  sparkleTwo: {
    position: "absolute",
    right: 45,
    bottom: 70,
  },

  bottom: {
    paddingTop: 20,
    paddingBottom: 30,
  },

  button: {
    height: 58,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 17,
    fontWeight: "700",
  },

  arrow: {
    fontSize: 24,
    marginLeft: 10,
    marginTop: -2,
  },
});
