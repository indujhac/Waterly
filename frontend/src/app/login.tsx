import { useAuth } from "@/src/context/authContext";
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
export default function LoginScreen() {
  const { colors } = useTheme();
  const { handleLogin } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(false);
  const handleSubmit = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Missing details", "Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await handleLogin(email.trim(), password);

      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert(
        "Login failed",
        "Please check your email and password and try again.",
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
            Welcome back 💧
          </Text>

          <Text style={[styles.subtitle, { color: colors.mutedText }]}>
            Log in to continue with Waterly
          </Text>

          <View style={styles.form}>
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
                  borderRadius: 14,
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
                alignItems: "center",
                backgroundColor: colors.inputBackground,
                borderColor: colors.inputBorder,
                borderWidth: 1,
                borderRadius: 14,
              }}
            >
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor={colors.mutedText}
                secureTextEntry={!view}
                style={[styles.input, { flex: 1 }]}
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
                styles.loginButton,
                {
                  backgroundColor: colors.primaryButton,
                  opacity: loading ? 0.6 : 1,
                },
              ]}
            >
              <Text style={[styles.loginText, { color: colors.white }]}>
                {loading ? "Logging in..." : "Log in"}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.replace("/register")}
              style={styles.Link}
            >
              <Text style={[styles.loginText, { color: colors.mutedText }]}>
                Don't have an account?{" "}
                <Text style={{ color: colors.text }}>Sign Up</Text>
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
  Link: {
    alignItems: "center",
    marginTop: 18,
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },

  loginButton: {
    marginTop: 14,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  loginText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
