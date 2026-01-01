import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import { User } from './src/types';

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log('App user state changed:', user);
  }, [user]);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    console.log("handleLogin called:", loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    console.log("handleLogout called");
  };

  return (
    // QUAN TRỌNG: Phải có GestureHandlerRootView với flex: 1 để tránh lỗi màn hình đen trên Android
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
