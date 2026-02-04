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


export default function Login({ embedded = false }) {

  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, embedded && { backgroundColor: 'transparent' }]}>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.loginHeading}>
              Login
            </Text>

            <TextInput
              placeholder="User name"
              placeholderTextColor="#9ca3af"
              style={styles.input}
              keyboardType="email-address"
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
              style={styles.loginButton}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3ff',
  },
  content: {
  flex: 1,
  justifyContent: 'center',
  paddingHorizontal: 20,
},

  loginHeading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#7c3aed',
    marginBottom: 8,
    textAlign: 'center',
    marginEnd: 10,
  },

  header: {
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  welcome: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: '#e9d5ff',
    lineHeight: 20,
  },

  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: -40,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
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
