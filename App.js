import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from "react-query";


import Curriculo from './Pages/curriculo';
import Model from './Pages/Model';

const queryClient = new QueryClient();

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Curriculo" component={Curriculo} />
        <Stack.Screen name="Alterar" component={Model} />
      </Stack.Navigator>
    </NavigationContainer>
  </QueryClientProvider>
  );
}


