import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import {ActivityIndicator } from 'react-native';
import { AppRoutes } from './src/routes/app.routes';
import { SignIn } from './src/screens/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded) {
    return <ActivityIndicator />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <SignIn />
      </NavigationContainer>
    </ThemeProvider>
  );
}

