import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'; 
import Login from './src/pages/Login';
import Index from './src/pages/Index';
import Usuario from './src/pages/Usuario';
import Notas from './src/pages/Notas';
import Faltas from './src/pages/Faltas';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Usuario" component={Usuario} />
        <Stack.Screen name="Notas" component={Notas} />
        <Stack.Screen name="Faltas" component={Faltas} />
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}

