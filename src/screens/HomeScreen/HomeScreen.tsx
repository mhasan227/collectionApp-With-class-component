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
import {Menu} from "./Menu";
import {ROLE} from "../../types";
const notifService = new NotifService();
const menusCP = [
	{
		"title": "Deposit",
		"icon": require("../../../assets/deposit4.png"),
		"routeKey": "Deposit",
	},
	{
		"title": "Agent Sell",
		"icon": require("../../../assets/seller.png"),
		"routeKey": "AgentSell",
	},
	{
		"title": "Transfer",
		"icon": require("../../../assets/money-transfer.png"),
		"routeKey": "Transfer",
	},
	{
		"title": "Collection",
		"icon": require("../../../assets/deposit.png"),
		"routeKey": "CashCollection",
	},
	{
		"title": "Send Money",
		"icon": require("../../../assets/send.png"),
		"routeKey": "PayeeSendMoney",
	},
	{
		"title": "Manager Credit",
		"icon": require("../../../assets/manager.png"),
		"routeKey": "ManagerCredit",
	},
	{
		"title": "BH Credit",
		"icon": require("../../../assets/BH.png"),
		"routeKey": "BHCredit",
	},
	{
		"title": "Rider Credit",
		"icon": require("../../../assets/rider.png"),
		"routeKey": "RiderCredit",
	},
];
class HomeScreen extends React.Component {  
    constructor(props) {
        super(props);
        console.log(this.props);
        const data = this.props.route.params;
        let wallets = [];
        
        console.log("working",+data);
        this.setInputValue = this.setInputValue.bind(this);
        this.state = {
          token:'',
          data: '',
          authUserId: '',
          userName: '',
          authResponse: '',
          wallets: [],
        }
    }   

        setInputValue(property, val) {
          this.setState({ [property]: val });
        }
        checkToken = () => {
          let token;
          let userId;
          AsyncStorage.getItem('isLoggedInn').then((value2) => {
            AsyncStorage.getItem('userId').then((userId) => {
              this.setState({token: JSON.parse(value2)});
              this.setState({authUserId: JSON.parse(userId)});
              token= JSON.parse(value2);
              userId= JSON.parse(userId);
              this.getAllWallet();
            });
          });
          messaging().onNotificationOpenedApp(this.onNotificationHandler);
          messaging().onMessage(this.onNotificationHandler);
          messaging().setBackgroundMessageHandler(this.onNotificationHandler);
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
            /*if(remoteMessage.data.title== "Lifting request rejected"){
              this.props.navigation.navigate("InformationScreen");
            }*/
        };
        load = async () =>{
         this.checkToken();
        }
        componentDidMount() {
          this.load();
        }

        handleOnClickOfWalletRedirrect = (wallet:any,balance:any) => async () => {
          console.log("from param"+balance);
          if(wallet.walletType=== "Distributor" || "DSE" || "Local Merchant" || "Mother Merchant"){
          this.props.navigation.navigate("HomeLayer",{wallet,balance});
          }
          console.log('antu test');
          console.log(wallet);
        }; 

        getAllWallet = async () => {
          let body={"accountId": this.state.authUserId,
                   };
          let path='collection-service/endpoint/wallet/accountId';
          console.log(this.state.token);
          let res = await ApiCall.api(body,this.state.token,path);
          //console.log("data",+res.result.result);
          this.setState({wallets: res.result.data});
        }
		render() {   
	        return (
            <DialogContent style={{flex : 1, backgroundColor: 'red'}}>
	            <View style={{padding: 16}}>
                
                <View style={style.bodySection}>
                  
                  {this.state.wallets.map((wallet: any, index: any) =>  (
                    
                    <Menu
                      key={index}
                      onPress={this.handleOnClickOfWalletRedirrect(wallet)}
                      title={wallet.walletName === "MyCash"? wallet.walletType === "Distributor"? "MyCash Distributor"
                        : wallet.walletType === "DSE"? "MyCash DSE" : wallet.walletType ==="Local Merchant"?"MyCash Agent":
                        wallet.walletType ==="Mother Merchant"?"MyCash Partner":""  : wallet.walletName === "Ok"? 
                        wallet.walletType=== "Distributor"? "Ok B2B Distributor\n"+wallet.walletId:wallet.walletType === "DSE"? 
                        "Ok B2B DSR\n"+wallet.walletId: wallet.walletType ==="Local Merchant"?"Ok Agent": 
                        wallet.walletType ==="Mother Merchant"?"Ok Partner":""  : "Ledger" }
                      icon={wallet.walletName === "MyCash"?require("../../../assets/mycash.jpg"):
                          wallet.walletName === "Ok"?require("../../../assets/ok.png"):
                          wallet.walletName === "BDT"?require("../../../assets/logo.png"):""}
                      //routeKey={wallet.walletType === "Distributor"? "RiderCredit" : wallet.walletType === "DSE"? "Deposit" : "BHCredit" }
                    />
                  ))}
                </View>
	            </View>
            </DialogContent>
	       )
    }
        
    }

export default HomeScreen