import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserStack from './UserStack';
import InicioSesion from './InicioSesion';
import Subir from './Subir';
import Login from './Login';
console.reportErrorsAsExceptions = false;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Registro" component={InicioSesion}  />
        <Tab.Screen name="Imagenes" component={Subir}  />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/* function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}*/