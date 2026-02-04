
import { View, StyleSheet, Animated, Dimensions, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Login from './login';
import { useEffect, useRef, useState } from 'react';

const { height } = Dimensions.get('window');

export default function Splash() {
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveUpAnim = useRef(new Animated.Value(0)).current;
  const loginOpacity = useRef(new Animated.Value(0)).current;

  const brandOpacity = useRef(new Animated.Value(1)).current;
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      Animated.timing(brandOpacity, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }).start();
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      Animated.timing(brandOpacity, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);


  useEffect(() => {
    // ORIGINAL splash animation (UNCHANGED)
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

    // TRANSITION TO LOGIN
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(moveUpAnim, {
          toValue: -height * 0.28,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(loginOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>

      <Animated.View style={{ flex: 1, opacity: brandOpacity }}>
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


      {/* LOGIN */}
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: loginOpacity,
            paddingTop: height * 0.45,
          },
        ]}
      >
        <Login embedded />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
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
