// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/app/Home/Home'; // Import your screen components
import SignIn from './src/app/SignIn/SignIn';
import Scanner from './src/app/Scanner/Scanner'
import CanisterList from './src/app/CanisterList/CanisterList';
import ReplenishCanister from './src/app/Replenish Canister/ReplenishCanister';
import SkipModal from './src/utils/Modals/SkipModal';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="List of Canisters" component={CanisterList} />
        <Stack.Screen name="ReplenishCanister" component={ReplenishCanister} />
        <Stack.Screen name="SkipModal" component={SkipModal} />
      </Stack.Navigator>
      <Toast/>
    </NavigationContainer>
  );
}
