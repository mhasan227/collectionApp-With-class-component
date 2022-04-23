import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import HomeLayer from '../screens/HomeLayer';
import CashCollection from '../screens/CashCollection';
import Deposit from '../screens/Deposit';
import Transfer from '../screens/Transfer';
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
                <Drawer.Screen name="HomeLayer"					component={HomeLayer}				/>
                <Drawer.Screen name="CashCollection"		component={CashCollection}		/>
                <Drawer.Screen name="Deposit"		component={Deposit}		/>
                <Drawer.Screen name="Transfer"		component={Transfer}		/>
              </Drawer.Navigator>
            </>
            
       )
    }
}

export default DrawerNavigation