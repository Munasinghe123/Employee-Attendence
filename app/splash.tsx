import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

const { height } = Dimensions.get('window');

export default function Splash() {
  const router = useRouter();

  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveUpAnim = useRef(new Animated.Value(0)).current;

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
        router.replace('/login');
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
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
    elevation: 10,
  },
  logo: {
    width: '75%',
    height: '75%',
  },
});
