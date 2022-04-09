import React from 'react' ;
import { RefreshControl,View, Text , StyleSheet, Pressable,StatusBar,TouchableOpacity,DrawerLayoutAndroid,FlatList,ScrollView, Alert,LogBox,BackHandler,ToastAndroid, Button } from 'react-native' ;

import {useNavigation} from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging';
import NotifService from '../../services/notification/notifService';
import { navigationRef } from '../../services/navigation';
import DialogContent from "../../component/DialogContent";
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../../component/DrawerContent/data';
import ApiCall from '../../networking/ApiCall';
import style from "./style";
const notifService = new NotifService();
class HomeScreen extends React.Component {  
    constructor(props) {
        super(props);
        console.log(this.props);
        const data = this.props.route.params;
        console.log("working",+data);
        this.state = {
          token:'',
          data: '',
          authUserId: '',
          userName: '',
          authResponse: '',
        }
    }
        checkToken = async () => {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
               console.log("token",fcmToken);
               let body={"userId": this.state.authUserId,
                         "token": fcmToken
                }
               let res = await ApiCall.setfcmToken(body,this.state.token);
               console.log(res);
            }else{
               console.log("Fcm token not available");
            } 
        }
         notifier = (remoteMessage: any) => {
            let title = 'Maxis Collection';
            let body = 'Action required';
          
            if (remoteMessage !== undefined && remoteMessage != null) {
              try {
                if (remoteMessage.notification !== undefined) {
                  title = remoteMessage.notification?.title;
                  body = remoteMessage.notification?.body;
                } else if (
                  remoteMessage.data !== undefined &&
                  remoteMessage.data !== null
                ) {
                  title = remoteMessage.data.title;
                  body = remoteMessage.data.body;
                }
              } catch (e: any) {
                console.log(e);
              }
            }
          
            notifService.localNotif(title, body);
        };

        onNotificationHandler = async (remoteMessage: any) => {
            this.notifier(remoteMessage);
            if(remoteMessage.data.title== "Lifting request rejected"){
              this.props.navigation.navigate("InformationScreen");
            }
        };

        componentDidMount() {
            AsyncStorage.getItem('isLoggedInn').then((value2) => {
              this.setState({token: JSON.parse(value2)});
            })
            AsyncStorage.getItem('userName').then((userName) => {
              this.setState({userName: JSON.parse(userName)});
            })
            this.checkToken();
            messaging().onNotificationOpenedApp(this.onNotificationHandler);
            messaging().onMessage(this.onNotificationHandler);
            /*messaging().onMessage(async remoteMessage => {
                Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
              });*/ // its working shows a alert with data
        }
		render() {   
	        return (
            <DialogContent style={{flex : 1, backgroundColor: 'red'}}>
	            <View>
	                <Text style={style.temp}>Hello homepage 1{this.state.userName}</Text>
                    <Button style={style.button} title='PressRoute' onPress={()=>this.props.navigation.navigate("InformationScreen")}></Button>
	            </View>
            </DialogContent>
	       )
    }
        
    }

export default HomeScreen