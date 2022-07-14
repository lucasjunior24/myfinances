import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { SignIn } from '../screens/SignIn';
import { Profile } from '../screens/Profile';
import { Confirmation } from '../screens/Confirmation';
import { AppRoutes } from './app.routes';

import { Splash } from '../screens/Splash';

export const Routes = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='Splash'
           screenOptions={{headerShown: false}}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="SignUpFirstStep" component={SignUpFirstStep} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUpSecondStep" component={SignUpSecondStep} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Confirmation" component={Confirmation} />
          <Stack.Screen name="AppRoutes" component={AppRoutes} />
        </Stack.Navigator>
    );
}