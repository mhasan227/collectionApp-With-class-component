import React from 'react' ;
import { DarkTheme,NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/signInScreen';
import ListingViewDetails from '../screens/ListingViewDetails';
import colors from '../config/colors';
import DrawerNavigator from './DrawerNavigator';
const Stack = createNativeStackNavigator();
class Navigation extends React.Component {
    
    render() {
        return (
            <NavigationContainer >
                <Stack.Navigator screenOptions={{headerShown: false}} >
                    <Stack.Screen name="SignInScreen" component={SignInScreen} />
                    <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
                    <Stack.Screen
                        name="ListingViewDetails"
                        component={ListingViewDetails}
                        screenOptions={{headerShown: true}}
                        options={{
                            headerShown: true,
                            title: 'Details',
                            headerStyle: {
                            backgroundColor: colors.primary,
                            },
                            headerTintColor: '#fff',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            
       )
    }
}

export default Navigation