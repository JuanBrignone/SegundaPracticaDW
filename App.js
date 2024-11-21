import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlanetsList from './PlanetList'; 
import PlanetDetails from './PlanetDetails'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PlanetsList">
        <Stack.Screen name="PlanetsList" component={PlanetsList} />
        <Stack.Screen name="PlanetDetails" component={PlanetDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
