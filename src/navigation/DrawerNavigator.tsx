import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import InformationScreen from '../screens/InformationScreen';
import DrawerContent from '../component/DrawerContent';
const Drawer = createDrawerNavigator();
class DrawerNavigation extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    const data = this.props.route.params;
    console.log("working d",+data);
    this.state = {}
    }
    render() {
        return (
            <>
              <Drawer.Navigator screenOptions={{headerShown: false}} drawerContent={(props) => <DrawerContent {...props} />}>
                <Drawer.Screen name="HomeScreen"					component={HomeScreen} 				/>
                <Drawer.Screen name="InformationScreen"			    component={InformationScreen}			/>
              </Drawer.Navigator>
            </>
            
       )
    }
}

export default DrawerNavigation