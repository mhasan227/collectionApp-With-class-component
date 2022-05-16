import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import HomeLayer from '../screens/HomeLayer';
import CashCollection from '../screens/CashCollection';
import Deposit from '../screens/Deposit';
import Transfer from '../screens/Transfer';
import ChangePassword from '../screens/ChangePassword';
import WebViewUn from '../screens/WebViewUn';
import WalletActivation from '../screens/WalletActivation';
import LocatePage from '../screens/LocatePage';
import ListView from '../screens/AllListView/ListView';
import InformationScreen from '../screens/InformationScreen';
import DrawerContent from '../component/DrawerContent';
const Drawer = createDrawerNavigator();
class DrawerNavigation extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    const data = this.props.route.params;
    this.state = {}
    }
    render() {
        return (
            <>
              <Drawer.Navigator screenOptions={{headerShown: false}} drawerContent={(props) => <DrawerContent {...props} />}>
                <Drawer.Screen name="HomeScreen"					component={HomeScreen} 				/>
                <Drawer.Screen name="InformationScreen"			    component={InformationScreen}			/>
                <Drawer.Screen name="HomeLayer"					component={HomeLayer}				/>
                <Drawer.Screen name="ChangePassword"					component={ChangePassword}				/>
                <Drawer.Screen name="CashCollection"		component={CashCollection}		/>
                <Drawer.Screen name="Deposit"		component={Deposit}		/>
                <Drawer.Screen name="Transfer"		component={Transfer}		/>
                <Drawer.Screen name="WebViewUn"				component={WebViewUn}			/>
                <Drawer.Screen name="WalletActivation"				component={WalletActivation}			/>
                <Drawer.Screen name="ListView"				component={ListView}			/>
                <Drawer.Screen name="LocatePage"				component={LocatePage}			/>
              </Drawer.Navigator>
            </>
            
       )
    }
}

export default DrawerNavigation