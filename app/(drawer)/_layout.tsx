import 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { ActivityIndicator, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '@/context/authContext';
import { useContext } from 'react';
import { Redirect, useRouter } from 'expo-router';


export default function DrawerLayout() {

  const auth = useContext(AuthContext);

  if (!auth || auth.loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!auth.isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#ffffff' },
        drawerActiveBackgroundColor: '#6B46C1',
        drawerActiveTintColor: '#FFFFFF',
        headerTintColor: '#000000',
        drawerInactiveTintColor: '#000000',

        drawerStyle: {
          backgroundColor: '#ffffff',
        },
        drawerContentStyle: {
          backgroundColor: '#ffffff',
        },
      }}

      drawerContent={(props) => {
        const router = useRouter();

        const handleLogout = async () => {
          await auth?.logout();
          router.replace('/login');
        };

        return (
          <DrawerContentScrollView {...props}>
            <View style={styles.linkContainer}>
              <DrawerItemList {...props} />
            </View>

            <View style={styles.logoutContainer}>
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{ title: 'Dashboard' }}
      />

      <Drawer.Screen
        name="daily-log-sheet"
        options={{ title: 'Daily Log Sheet', drawerLabel: 'Daily Log Sheet', }}
      />


    </Drawer>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    marginTop: 40,
  },

  logoutContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },

  logoutButton: {
    marginTop: 16,
    paddingVertical: 12,
  },

  logoutText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '600',
  },
});
