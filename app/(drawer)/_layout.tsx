import 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: '#7c3aed', 
        drawerActiveTintColor: '#FFFFFF', 
        drawerInactiveTintColor: '#000000', 
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
        
          <View style={styles.linkContainer}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="dashboard"
        options={{ title: 'Dashboard' }}
      />

      <Drawer.Screen
        name="daily-log-sheet"
        options={{ title: 'Daily Log Sheet',  drawerLabel: 'Daily Log Sheet', }}
        
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    marginTop: 40, 
  },
});
