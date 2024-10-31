import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calculator from './screens/Calculator';
import History from './screens/History';

const Stack = createNativeStackNavigator();

export default function App() {
  const [history, setHistory] = useState([]); // Laskuhistoria tallennetaan tähän

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calculator">
        <Stack.Screen name="Calculator">
          {(props) => <Calculator {...props} history={history} setHistory={setHistory} />}
        </Stack.Screen>
        
        <Stack.Screen name="History">
          {(props) => <History {...props} history={history} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}