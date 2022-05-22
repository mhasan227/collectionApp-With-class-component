import React from 'react' ;
import {ActivityIndicator, View, Text , TextInput, TouchableOpacity, Image ,StyleSheet,ScrollView,Alert} from 'react-native' ;
import { withRouter } from 'react-router-dom'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native'
import colors from '../../config/colors';
import style from './style';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from "react-native-push-notification";
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/httpClient/api';
import ApiCall from '../../networking/ApiCall'
import * as Utility from '../../utility/utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
//import {useState} from 'react';
let cResult;


class SignInScreen extends React.Component {
    
    
    constructor(props) {
      
        super(props);
        //const showMeasage = this.props.route.params.responseMeasage
        this.state={
            userName: '',
            password: '',
            loginData: false,
            result: '',

            enable: '',
            text: 'LOGIN',
            responseMessage: '',
            loggedIn: false

        }
    }
    
    
    setInputValue(property, val) {
        this.setState({
            [property]: val
        })
    }
    handleSubmit = async () => {
      //const { dispatch } = this.props; //way of dispatch called
      const fcmToken = await messaging().getToken();
      let user= this.state.userName;
      let pass= this.state.password;
      //Alert.alert(fcmToken);
      //const navigation = useNavigation();
      //this.props.navigation.navigate("DrawerNavigator");
      //navigation.navigate('HomeScreen');
      //navigation.dispatch(StackActions.replace('DrawerNavigation', {}));
      if (this.state.userName && this.state.password) {
        this.setInputValue("loginData", true);
        //const setData = async () => { const dataToSet = await ApiCall.getArticles(user,pass); }
        //console.log(ApiCall.getArticles());
        let body={"username": user,
                  "password": pass,
                  "fcmToken": fcmToken
                }
        let res;
        /*ApiCall.login(body).then(async resultt => console.log(resultt) &&
             await this.setState({result: resultt})
        );
        console.log(this.state.result);*/
        console.log(await ApiCall.login(body));
        res = await ApiCall.login(body);
        console.log(res.result.result);
        //console.log(res.result.roleList[0].taggedMerchantId);
        this.setInputValue("loginData", false);
        if(res.result.result=="FAILURE"){
          Alert.alert('Failed', 'Incorrect Userid or Password Try Again');
        }else{
          Utility.setAsyncStorage(res);
          this.props.navigation.dispatch(StackActions.replace('DrawerNavigator', {}));
            //const { dispatch } = this.props;
            //this.props.navigation.dispatch(StackActions.replace('DrawerNavigator', {}));
        }
        
      } else {
        Alert.alert('Failed', 'Field can not be blank');
      }
    };
 
 
    createChannel(){
      PushNotification.createChannel(
        {
          channelId: "channel-id", // (required)
          channelName: "My channel", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }
    
    componentDidMount(){
        this.createChannel();

           // SplashScreen.hide();  //(optional)  this is done for autologin
        AsyncStorage.getItem('isLoggedIn').then((value) => {
            AsyncStorage.getItem('isLoggedInn').then((value2) => {
            
            
                if(value2 != null){
                    let result= JSON.parse(value2);
                    console.log("from componennt",+result);
                    if(value && value === 'YES') {
                        //(Hide it once you get value from this)
                     // this.props.navigation.navigate('HomeScreen',{result});
                      this.props.navigation.dispatch(StackActions.replace('DrawerNavigator', {}));
            
                    } else {
            
                      }
                }
             })
        })
    }

    render() {
        return (
            <ScrollView contentContainerStyle={style.root}>
            <Image 
              source={require('../../../assets/logo.png')}
              style={style.logo}
              resizeMode={'contain'}
            />
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  color: colors.primary,
                }}>
                &nbsp;
              </Text>
              <Text 
                style={style.apptitle}>
                COLLECTION
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  color: colors.primary,
                }}>
                &nbsp;
              </Text>
            <View style={style.iconTextInputWrapper}>
              <View style={style.iconTextInputIconWrapper}>
                <Image
                  style={style.iconTextInputIcon}
                  source={require('../../../assets/padlock.png')}
                />
              </View>
              <TextInput
                style={style.iconTextInput}
                defaultValue={this.state.userName}
                placeholder="Username"
                onChangeText={(text) => this.setState({userName: text})}
              />
            </View>
            <View style={style.iconTextInputWrapper}>
              <View style={style.iconTextInputIconWrapper}>
                <Image
                  style={style.iconTextInputIcon}
                  source={require('../../../assets/padlock.png')}
                />
              </View>
              <TextInput
                style={style.iconTextInput}
                defaultValue={this.state.password}
                placeholder="Password"
                onChangeText={(text) => this.setState({password: text})}
                secureTextEntry={true}
              />
            </View>
            <View style={{marginTop: 24}}>
              <TouchableOpacity
                style={style.submitButton}
                onPress={this.handleSubmit}
                //disabled={loginData.loading}>
                >
                {this.state.loginData ? (
                  <ActivityIndicator size={'small'} color={colors.white} />
                ) : (
                  <Text style={style.submitButtonText}>Submit</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ForgotPassword');
                }}>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  color: colors.primary,
                }}>
                &nbsp;
              </Text>
                <Text style={style.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginBottom: 24}}>
                <Text style={style.forgotPassword}>v: 685</Text>
            </View>
          </ScrollView>
       )
    }
}

export default SignInScreen