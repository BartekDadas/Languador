import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { auth } from './src/lib/firebase';
import { useGameStore } from './src/store/gameStore';
import { Home } from './src/screens/Home';
import { Login } from './src/screens/Login';
import { BattleArena } from './src/screens/BattleArena';
import { Admin } from './src/screens/Admin';

const Stack = createNativeStackNavigator();

export default function App() {
  const initializePlayer = useGameStore((state) => state.initializePlayer);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        initializePlayer();
      }
    });

    return () => unsubscribe();
  }, [initializePlayer]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Practice" component={BattleArena} />
        <Stack.Screen name="Learn" component={BattleArena} />
        <Stack.Screen name="Admin" component={Admin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}