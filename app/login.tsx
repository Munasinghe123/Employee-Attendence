import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';


export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [item, setItem] = useState("");
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('AuthContext must be used within AuthProvider');
  }

  const { login } = auth;

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        alert('Please enter username and password');
        return;
      }

      const response = await axios.post(
        'http://localhost:7000/auth/login',
        {
          name: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { accessToken } = response.data;

      await login(accessToken);

      console.log('Login successful');

      router.replace('/dashboard');

    } catch (error: any) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message || 'Login failed');
      } else {
        alert('Server not reachable');
      }
    }
  };
  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#a78bfa', '#7c3aed', '#5b21b6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoHalo}>
            <View style={styles.logoCard}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.appName}>Employee Management</Text>
        </View>

        {/* Login Card */}
        <View style={styles.centerContainer}>
          <View style={styles.card}>
            <Text style={styles.heading}>Welcome Back</Text>
            <Text style={styles.subHeading}>Sign in to continue</Text>

            {/* Username Input */}
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={22} color="#6b7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color="#6b7280"
                style={styles.inputIcon}
              />

              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#9ca3af"
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={22}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

          </View>
        </View>
      </LinearGradient>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logoSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },

  logoHalo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoCard: {
    width: 95,
    height: 95,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },

  logo: {
    width: '70%',
    height: '70%',
  },

  appName: {
    marginTop: 16,
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.5,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 32,
    padding: 36,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.28,
    shadowRadius: 24,
    elevation: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: '#5b21b6',
    marginBottom: 8,
    textAlign: 'center',
  },

  subHeading: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
    textAlign: 'center',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
    width: '100%',
  },

  inputIcon: {
    paddingLeft: 16,
  },

  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#111827',
  },

  eyeIcon: {
    paddingHorizontal: 16,
  },
  passwordInput: {
    paddingRight: 48, // reserve space for eye icon
  },

  eyeButton: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },

  forgotText: {
    color: '#6d28d9',
    fontWeight: '600',
    fontSize: 14,
  },

  loginButton: {
    backgroundColor: '#7c3aed',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },

  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  signupText: {
    color: '#4b5563',
    fontSize: 15,
  },

  signupLink: {
    color: '#7c3aed',
    fontWeight: '700',
    fontSize: 15,
  },
});