import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import InformationScreen from '../screens/InformationScreen';

const Drawer = createDrawerNavigator();
class DrawerNavigation extends React.Component {
    
    render() {
        return (
            <>
              <Drawer.Navigator /*drawerContent={(props) => <DrawerContent {...props} />}*/>
                <Drawer.Screen name="HomeScreen"					component={HomeScreen}				/>
                <Drawer.Screen name="InformationScreen"			    component={InformationScreen}			/>
              </Drawer.Navigator>
            </>
            
       )
    }
}

export default DrawerNavigation