import React from 'react' ;
import { RefreshControl,View, Text , StyleSheet, Pressable,StatusBar,TouchableOpacity,DrawerLayoutAndroid,FlatList,ScrollView, Alert,LogBox,BackHandler,ToastAndroid, Button } from 'react-native' ;

import {useNavigation} from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging';
import NotifService from '../../services/notification/notifService';
import { navigationRef } from '../../services/navigation';

const notifService = new NotifService();
class HomeScreen extends React.Component {  
    constructor(props) {
        super(props);
        console.log(this.props);
        }
        checkToken = async () => {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
               console.log("token",fcmToken);
               const gwUrl = 'http://apigw-maxis.nagadpay.com/';
   
         try {
             let res = await fetch(gwUrl + 'collection-service/endpoint/firebase/set-firebase-token', {
                 method: "POST",
                 headers: {
                     'Content-Type': 'application/json',
                     //token: "Bearer " + this.state.token,
                     //userid: this.state.mydatauser
                 },
                 body: JSON.stringify({
   
                   userId: '01844615060',
                   token: fcmToken,
                 })
             });
   
             let result = await res.json();  
             console.log(result);
    
            }catch (e) {
             
                }
                
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
        async dashBoardInfo(){
           
         const gwUrl = 'http://apigw-maxis.nagadpay.com/';
   
         try {
             let res = await fetch(gwUrl + 'collection-service/endpoint/firebase/set-firebase-token', {
                 method: "POST",
                 headers: {
                     'Content-Type': 'application/json',
                     //token: "Bearer " + this.state.token,
                     //userid: this.state.mydatauser
                 },
                 body: JSON.stringify({
   
                   //userId:01844615060,
                   token: fcmToken,
                 })
             });
   
             let result = await res.json();  
             console.log(result);
    
            }catch (e) {
             
                }
   
        }
        
        componentDidMount() {
            this.checkToken();
            messaging().onNotificationOpenedApp(this.onNotificationHandler);
            messaging().onMessage(this.onNotificationHandler);
            /*messaging().onMessage(async remoteMessage => {
                Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
              });*/ // its working shows a alert with data
        }
		render() {   
	        return (
	            <View>
	                <Text style={styles.temp}>Hello homepage 1</Text>
                    <Button style={styles.button} title='PressRoute' onPress={()=>this.props.navigation.navigate("InformationScreen")}></Button>
	            </View>
	          
	       )
    }
        
    }

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#800080',
        height: 56
    },
    drawer: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    temp: {
        textAlign: 'center',
        paddingTop: 50,
        fontSize: 20,
    },
    button: {
        paddingTop: 50,
        alignItems: 'center',
        backgroundColor: "purple",
        width: 100,
        height: 100,
        justifyContent: 'center'

    }
});



export default HomeScreen