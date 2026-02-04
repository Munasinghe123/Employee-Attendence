import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function Login({ embedded = false }) {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        
       

        <View style={styles.content}>
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
              onPress={() => router.replace('/dashboard')}
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
  container: {
  flex: 1,
  backgroundColor: 'transparent',
},


  wavyBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
    zIndex: 0,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },

  loginHeading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#7c3aed',
    marginBottom: 8,
    textAlign: 'center',
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
  },

  loginText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});