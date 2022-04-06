import React from 'react' ;
import { DarkTheme,NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/signInScreen';
import DrawerNavigator from './DrawerNavigator';
const Stack = createNativeStackNavigator();
class Navigation extends React.Component {
    
    render() {
        return (
            <NavigationContainer >
                <Stack.Navigator screenOptions={{headerShown: false}} >
                    <Stack.Screen name="SignInScreen" component={SignInScreen} />
                    <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />

                </Stack.Navigator>
            </NavigationContainer>
            
       )
    }
}

export default Navigation