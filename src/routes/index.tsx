import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { SignIn } from '../screens/SignIn';
import { Profile } from '../screens/Profile';
import { Confirmation } from '../screens/Confirmation';
import { AppRoutes } from './app.routes';

import { Splash } from '../screens/Splash';
// import { createStackNavigator } from '@react-navigation/stack';

// const RootStack = createStackNavigator<RootStackParamList>();


export const Routes = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
        <Stack.Navigator
            initialRouteName='SignIn'
           screenOptions={{headerShown: false}}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="AppRoutes" component={AppRoutes} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="SignUpFirstStep" component={SignUpFirstStep} />
          <Stack.Screen name="SignUpSecondStep" component={SignUpSecondStep} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Confirmation" component={Confirmation} />
        </Stack.Navigator>
        </NavigationContainer>
    );
}
 
export type RootStackParamList = {
    Splash: undefined,
    SignUpFirstStep: undefined,
    SignIn: undefined,
    Profile: undefined,
    SignUpSecondStep: undefined,
    AppRoutes: undefined,
    Confirmation: undefined
} 