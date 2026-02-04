import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Keyboard,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Login from './login';
import { useEffect, useRef, useState } from 'react';

const { height } = Dimensions.get('window');

export default function Splash() {
  // Brand / splash animations
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveUpAnim = useRef(new Animated.Value(0)).current;
  const brandOpacity = useRef(new Animated.Value(1)).current;

  // Login visibility (STATE, NOT ANIMATION)
  const [showLogin, setShowLogin] = useState(false);

  /* -------------------------------
     Keyboard → hide / show branding
     (visual only)
  -------------------------------- */
  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, () => {
      Animated.timing(brandOpacity, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }).start();
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      Animated.timing(brandOpacity, {
        toValue: 1,
        duration: 140,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  /* -------------------------------
     Splash animation (runs once)
  -------------------------------- */
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(moveUpAnim, {
        toValue: -height * 0.28,
        duration: 700,
        useNativeDriver: true,
      }).start(() => {
        //  Login becomes visible ONCE and forever
        setShowLogin(true);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.root}>
      {/* SPLASH / BRAND LAYER */}
      <Animated.View style={[styles.brandLayer, { opacity: brandOpacity }]}>
        <LinearGradient
          colors={['#8b5cf6', '#4c1d95']}
          style={styles.container}
        >
          <Animated.View
            style={{
              transform: [{ translateY: moveUpAnim }],
            }}
          >
            <View style={styles.logoHalo}>
              <View style={styles.logoCard}>
                <Animated.Image
                  source={require('../assets/images/logo.png')}
                  style={[
                    styles.logo,
                    {
                      transform: [{ scale: scaleAnim }],
                      opacity: fadeAnim,
                    },
                  ]}
                  resizeMode="contain"
                />
              </View>
            </View>
          </Animated.View>
        </LinearGradient>
      </Animated.View>

      {/* LOGIN (STATE-DRIVEN, NEVER ANIMATED) */}
      {showLogin && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { paddingTop: height * 0.45 },
          ]}
        >
          <Login embedded />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  brandLayer: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoHalo: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoCard: {
    width: 150,
    height: 150,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },

  logo: {
    width: '75%',
    height: '75%',
  },
});
