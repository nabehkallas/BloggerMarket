import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Image } from 'react-native';
import { useSearchStore } from '../../store/searchStore';
import { useAuthStore } from '../../store/AuthStore';
import { Redirect } from 'expo-router';

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuthStore();
  const toggleSearch = useSearchStore((state) => state.toggleSearch);

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          height: 120,
          backgroundColor: '#FAFAFA',
        },
        headerTitleStyle: {
          fontFamily: 'Inter',
          fontSize: 18,
          fontWeight: 'bold',
        },
        headerTintColor: '#34A853',
        drawerActiveTintColor: '#34A853',
        drawerLabelStyle: {
          color: '#1A1A1A',
          fontSize: 16,
          fontWeight: '600',
        },
        drawerInactiveTintColor: '#1A1A1A',
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Bloggers',
          headerTitle: () => (
            <Image
              source={require('../../../assets/logo.png')}
              style={{ width: 130, height: 130, resizeMode: 'contain' }}
            />
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={toggleSearch}>
              <Ionicons
                name="search"
                size={24}
                color="#34A853"
                style={{ padding: 40, marginBottom: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="SpecialOffers"
        options={{
          drawerLabel: 'Special Offers',
          title: 'Special Offers',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="gift" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: 'Profile',
          title: 'Profile',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
