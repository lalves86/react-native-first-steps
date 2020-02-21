import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

Stack.screenOptions = {
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={Stack.screenOptions}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={Main.NavigationOptions}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={User.NavigationOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
