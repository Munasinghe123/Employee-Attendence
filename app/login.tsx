import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import WaveBackground from '@/components/landing-page/wave';
import { Keyboard } from 'react-native';
import { useEffect, useState } from 'react';



export default function Login({ embedded = false }) {

  const router = useRouter();

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.root}>

        {/* WHITE WAVE BACKGROUND */}
        <View style={styles.waveContainer}>
          <WaveBackground />
        </View>

        {/* LOGIN CARD */}
        <View
          style={[
            styles.cardContainer,
            keyboardVisible && { paddingBottom: 20 },
          ]}
        >

          <View style={styles.card}>
            <Text style={styles.loginHeading}>Login</Text>

            <TextInput
              placeholder="User name"
              placeholderTextColor="#9ca3af"
              style={styles.input}
              autoCapitalize="none"
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              style={styles.input}
              secureTextEntry
            />

            <TouchableOpacity
              onPress={() => router.push('/dashboard')}
              style={styles.loginButton}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </KeyboardAvoidingView>
  );

}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  waveContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  cardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 60,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },

  loginHeading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#7c3aed',
    marginBottom: 16,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#c8cbd0',
    color: '#111827',
  },

  loginButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#7c3aed',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  loginText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});

