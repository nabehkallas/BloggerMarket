import { StyleSheet, TouchableOpacity} from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useSearchStore } from '../store/searchStore';

const queryClient = new QueryClient()
export default function RootLayout() {
  const toggleSearch = useSearchStore((state) => state.toggleSearch);
  return (
    <QueryClientProvider client={queryClient}>
     <Drawer screenOptions={{
             headerStyle: { 
              height: 120,
              backgroundColor: '#FAFAFA', // White background for the header
             },
             headerTitleStyle: { // Use the name you loaded in Expo
              fontFamily:'Inter',
              fontSize: 18,
             fontWeight: 'bold',},
             headerTintColor: '#34A853', // Hamburger menu color
             drawerActiveTintColor: '#34A853', // Active link color
             drawerLabelStyle: {
              color: '#1A1A1A',
              fontSize: 16,        // Standard and easily readable size
              fontWeight: '600',
        },
             drawerInactiveTintColor: '#1A1A1A'
              // Inactive link color
      }}
     >
      <Drawer.Screen
      options={{
        drawerLabel: 'Bloggers',
          title: 'Blogger Marketplace',
          
           drawerIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
  headerRight: () => (
    <TouchableOpacity onPress={toggleSearch}>
      <Ionicons name="search" size={24} color="#34A853" style={{padding:40,marginBottom:20 }} />
    </TouchableOpacity>
  ),
}}
        name="index" // This is the name of the page and must match the url from root
        
      />
      <Drawer.Screen
      options={{
        drawerLabel: 'Special Offers',
          title: 'Special Offers',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="gift" size={size} color={color} />
          ),
  
}}
        name="SpecialOffers" // This is the name of the page and must match the url from root
        
      />
    </Drawer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
