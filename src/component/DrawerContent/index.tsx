import React, {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import data from './data';
import style from './style';
import {StackActions, useNavigation} from '@react-navigation/native';
import {Selector, useDispatch, useSelector} from 'react-redux';
import {selectAuth, selectIsUserAuthenticate} from '../../redux/auth/selectors';
import {actions as authAction} from '../../redux/auth/slice';
import {AnyAction} from 'redux';
import get from 'lodash.get';
import {actions as fcmActions} from '../../redux/fcm/slice';
import {selectFCMToken} from '../../redux/fcm/selectors';
import {setFirebaseToken} from '../../redux/httpClient/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Utility from '../../utility/utility'

interface DrawerItemProps {
  label: string;
  icon: any;
  routeKey?: string;
  data: any;
  onPress?: () => void;
  selector?: Selector<any, any>;
  action?: (accountId: any) => AnyAction;
}

const DrawerItem = (props: DrawerItemProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={style.drawerItem}
      onPress={() => {
        if (props.routeKey) {
          navigation.navigate(props.routeKey, {
           data: props?.data ,
          });
        }
        if (props.onPress) {
          props.onPress();
        }
      }}>
      <Image
        style={style.drawerItemImage}
        resizeMode={'contain'}
        source={props.icon}
      />
      <Text style={style.drawerItemLabel}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const DrawerContent = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //const role = Utility.getAccessKey();
  const [role,setrole]=useState('');
  useEffect(() => {
    
    AsyncStorage.getItem('roleListName').then((roleListName) => {
      //this.setState({setrole: JSON.parse(userName)});
      setrole(JSON.parse(roleListName));
    })
   })
    

  console.log("hello 2",+role);
  return (
    <View style={style.root}>
      <View style={{flex: 1}}>
        <View style={style.drawerHeader}>
          <Text style={style.drawerHeaderText}>MAXIS MENU</Text>
        </View>
        <ScrollView>
          {data.map((ele) => {
            if (ele.roles.includes(role)) {
              return (
                <DrawerItem
                  label={ele.label}
                  icon={ele.icon}
                  data={ele.data}
                  key={ele.label}
                  routeKey={ele.routeKey}
                  selector={ele.selector}
                  action={ele.action}
                />
              );
            }
            return null;
          })}
        </ScrollView>
      </View>
     
      <View style={style.drawerFooter}>
      <DrawerItem
          label="Presence"
          icon={require('../../../assets/location.png')}
          routeKey="LocatePage"
          
        />
        <DrawerItem
          label="Log Out"
          icon={require('../../../assets/logout.png')}
          routeKey="SignInScreen"
          onPress={() => {
            AsyncStorage.clear();;
          }}
        />
        
      </View>
    </View>
  );
};

export default DrawerContent;
