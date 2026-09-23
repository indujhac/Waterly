import { useTheme } from "@/src/context/ThemeContext";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../context/authContext";

export default function RegisterScreen() {
  const { colors } = useTheme();
  const { handleRegister } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(false);

  const handleSubmit = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim() || !email.trim() || !password) {
      Alert.alert("Missing details", "Please fill in all fields.");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Password too short",
        "Password must be at least 8 characters.",
      );
      return;
    }

    try {
      setLoading(true);

      // Registration API will be connected in the next step.

      await handleRegister(name, email, password);
      Alert.alert("Account created", "Your account has been created.");

      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert(
        "Registration failed",
        "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            Create your account 💧
          </Text>

          <Text style={[styles.subtitle, { color: colors.mutedText }]}>
            Start building a better water habit with Waterly
          </Text>

          <View style={styles.form}>
            <Text style={[styles.label, { color: colors.text }]}>Name</Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={colors.mutedText}
              autoCapitalize="words"
              style={[
                styles.input,
                {
                  borderWidth: 1,
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.inputBorder,
                  color: colors.text,
                },
              ]}
            />

            <Text style={[styles.label, { color: colors.text }]}>Email</Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={colors.mutedText}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                styles.input,
                {
                  borderWidth: 1,
                  backgroundColor: colors.inputBackground,
                  borderColor: colors.inputBorder,
                  color: colors.text,
                },
              ]}
            />

            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderRadius: 14,
                backgroundColor: colors.inputBackground,
                borderColor: colors.inputBorder,
              }}
            >
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="At least 8 characters"
                placeholderTextColor={colors.mutedText}
                secureTextEntry={!view}
                style={[
                  styles.input,
                  {
                    flex: 1,
                  },
                ]}
              />
              <Pressable onPress={() => setView((previous) => !previous)}>
                <Entypo
                  name={view === true ? "lock-open" : "lock"}
                  size={24}
                  color="black"
                  style={{ paddingHorizontal: 14, paddingVertical: 12 }}
                />
              </Pressable>
            </View>

            <Pressable
              onPress={handleSubmit}
              disabled={loading}
              style={[
                styles.registerButton,
                {
                  backgroundColor: colors.primaryButton,
                  opacity: loading ? 0.6 : 1,
                },
              ]}
            >
              <Text style={[styles.registerText, { color: colors.white }]}>
                {loading ? "Creating account..." : "Create account"}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.replace("/login")}
              style={styles.loginLink}
            >
              <Text style={[styles.loginText, { color: colors.mutedText }]}>
                Already have an account?{" "}
                <Text style={{ color: colors.text, fontWeight: "700" }}>
                  Log in
                </Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 15,
    marginTop: 6,
    marginBottom: 32,
  },

  form: {
    gap: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },

  input: {
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },

  registerButton: {
    marginTop: 14,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  registerText: {
    fontSize: 16,
    fontWeight: "700",
  },

  loginLink: {
    alignItems: "center",
    marginTop: 18,
  },

  loginText: {
    fontSize: 14,
  },
});
