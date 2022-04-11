import React from 'react' ;
import { RefreshControl,
          View,
          Text ,
          StyleSheet,
          Pressable,
          StatusBar,
          TouchableOpacity,
          TouchableHighlight,
          Modal,
          DrawerLayoutAndroid,
          FlatList,
          ScrollView, 
          Alert,
          LogBox,
          BackHandler,
          ToastAndroid,
          Button } from 'react-native' ;

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
		"title": "Transfer",
		"icon": require("../../../assets/money-transfer.png"),
		"routeKey": "Transfer",
		"transfer": true,
	},
	{
		"title": "Deposit",
		"icon": require("../../../assets/deposit4.png"),
		"routeKey": "Deposit",
		"transfer": false,
	},
];

const menusDSE = [
	{
		"title": "Transfer",
		"icon": require("../../../assets/money-transfer.png"),
		"routeKey": "Transfer",
		"modal" : 'true',
		"transfer": true,
	},
	{
		"title": "Collection",
		"icon": require("../../../assets/deposit.png"),
		"routeKey": "CashCollection",
		"modal" : true,
		"Collection": true,
		"transfer": false
	},
];

const menusOkDSR = [
	/*{
		"title": "Transfer",
		"icon": require("../../../assets/money-transfer.png"),
		"routeKey": "Transfer",
		"modal" : 'true',
		"transfer": true,
	},*/
	{
		"title": "Collection",
		"icon": require("../../../assets/deposit.png"),
		"routeKey": "CashCollection",
		"modal" : true,
		"Collection": true,
		"transfer": false
	},
];

const menusOkDistributor = [
	{
		"title": "Transfer",
		"icon": require("../../../assets/money-transfer.png"),
		"routeKey": "Transfer",
		"modal" : 'true',
		"transfer": true,
	},
	{
		"title": "Deposit",
		"icon": require("../../../assets/deposit4.png"),
		"routeKey": "Deposit",
		"transfer": false,
	},
];

const modalDSETransfer = [
	{
		"title": "Agent",
		"icon": require("../../../assets/seller.png"),
		"routeKey": "Transfer",
		"id" : "Agent",
	},
	{
		"title": "Payee",
		"icon": require("../../../assets/seller.png"),
		"routeKey": "Transfer",
		"id" : "Payee"
	},
];
const modalDSEMyCashTransfer = [
	{
		"title": "MyCash Distributor",
		"icon": require("../../../assets/seller.png"),
		"routeKey": "Transfer",
		"id" : "MyCashDistributor",
	},
];

const modalDSEOkTransfer = [
	{
		"title": "Ok B2B Distributor",
		"icon": require("../../../assets/seller.png"),
		"routeKey": "Transfer",
		"id" : "OkDistributor",
	},
];

const modalDSECollection = [

	{
		"title": "Payee",
		"icon": require("../../../assets/seller.png"),
		"routeKey": "CashCollection",
		"id" : "Payee",
	},
	{
		"title": "Merchant",
		"icon": require("../../../assets/manager.png"),
		"routeKey": "CashCollectionDseMyCash",
		"id" : "Merchant",
	},
];

const modalMyDisTransfer = [
	{
		"title": "Ledger",
		"icon": require("../../../assets/seller.png"),
		"routeKey": "Transfer",
		"id" : "Ledger",
	},
	{
		"title": "DSE",
		"icon": require("../../../assets/seller.png"),
		"routeKey": "Transfer",
		"id" : "DSE"
	},
];

const modalOkDisTransfer = [
	{
		"title": "Ok B2B DSR",
		"icon": require("../../../assets/seller.png"),
		"routeKey": "Transfer",
		"id" : "OkB2BDSR",
	},
];

const modalMyLocalMerchantTransfer = [
	{
		"title": "Merchant",
		"icon": require("../../../assets/seller.png"),
		"routeKey": "PayeeSendMoney",
		"id" : "Merchant",
	},

];

const modalMyMotherMerchantCashoutMyCash = [
	{
		"title": "MyCash Corporate Agent",
		"icon": require("../../../assets/seller.png"),
		"routeKey": "MMPull",
		"id" : "MycashCAgent",
	},

];
const modalMyMotherMerchantCashoutOk = [
	{
		"title": "OK Corporate Agent",
		"icon": require("../../../assets/seller.png"),
		"routeKey": "MMPull",
		"id" : "okCAgent",
	},

];
const modalLedgerTransfer = [

	{
		"title": "MyCash Distributor",
		"icon": require("../../../assets/seller.png"),
		"routeKey": "Transfer",
		"id" : "MyCashDistributor",
	},
	/*{
		"title": "Merchant",
		"icon": require("../../../assets/manager.png"),
		"routeKey": "CashCollectionDseMyCash",
		"id" : "Merchant",
	},*/
];

const menusLedger = [
	{
		"title": "Transfer",
		"icon": require("../../../assets/money-transfer.png"),
		"routeKey": "Transfer",
		"modal" : 'true',
		"transfer": true
	},
	{
		"title": "Deposit",
		"icon": require("../../../assets/deposit4.png"),
		"routeKey": "Deposit",
		"modal" : true,
		"Deposit": true,
		"transfer": false
	},
];

const menusTM = [
	{
		"title": "Credit Point",
		"icon": require("../../../assets/wallet-filled-money-tool.png"),
		"routeKey": "BHCredit",
	},
];
const menusAM = [
	{
		"title": "BH Credit",
		"icon": require("../../../assets/wallet-filled-money-tool.png"),
		"routeKey": "BHCredit",
	},
];
const menusRM = [
	{
		"title": "BH Credit",
		"icon": require("../../../assets/wallet-filled-money-tool.png"),
		"routeKey": "BHCredit",
	},
];
const menusMM = [
	{
		"title": "Cashout",
		"icon": require("../../../assets/atm.png"),
		"routeKey": "MMCashout",
		"Cashout" : true
	}
];
const menusA = [
	{
		"title": "CP Return",
		"icon": require("../../../assets/cashpoint.png"),
		"routeKey": "CPSell",
	}
];
const menusP = [
	{
		"title": "Send Money",
		"icon": require("../../../assets/send.png"),
		"routeKey": "PayeeSendMoney",
		"transfer": true,
	}
];

class HomeLayer extends React.Component {  
    constructor(props) {
        super(props);
        console.log(this.props);
        
        const data = this.props.route.params.wallet;
        console.log(data);
        let wallets = [];
        
        console.log("working",+data);
        this.setInputValue = this.setInputValue.bind(this);
        //this.getAllWallet = this.getAllWallet.bind(this);
        //this.setInputValue = this.setInputValue.bind(this);
        this.state = {
          token:'',
          data: '',
          authUserId: '',
          userName: '',
          authResponse: '',
          wallets: [],
          role: '',
          modalVisible: false,
          modalVisible1: false,
        }
    }   

        setInputValue(property, val) {
          this.setState({ [property]: val });
        }
        checkToken = async () => {
          let token;
          AsyncStorage.getItem('isLoggedInn').then((value2) => {
            AsyncStorage.getItem('userId').then((userId) => {
              AsyncStorage.getItem('roleListName').then((roleListName) => {
                //this.setState({setrole: JSON.parse(userName)});
                this.setState({role: JSON.parse(roleListName)});
                this.setState({token: JSON.parse(value2)});
                this.setState({authUserId: JSON.parse(userId)});
                token= JSON.parse(value2);
                //console.log(JSON.parse(value2));
              })
            });
          });
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
               console.log("token",fcmToken);
               let body={"userId": this.state.authUserId,
                         "token": fcmToken
                }
               let res = await ApiCall.setfcmToken(body,this.state.token);
               console.log(res);
               messaging().onNotificationOpenedApp(this.onNotificationHandler);
               messaging().onMessage(this.onNotificationHandler);
               messaging().setBackgroundMessageHandler(this.onNotificationHandler);
            }else{
               console.log("Fcm token not available");
            } 
//
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
        load = async () =>{
         await this.checkToken();
         this.getAllWallet();

          

        }
        setModalVisible = (visible) => {
          this.setState({ modalVisible: visible });
        }
        ModalForDse(props) {
          const {transfer, collection}= props
          const { modalVisible } = this.state;
          if (transfer) {
            return <View style={styles.centeredView}>
                      <Modal
                      animationType='slide'
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                      //Alert.alert("Modal has been closed.");
                      this.setModalVisible(!modalVisible);
                      }}
                        >
                      <View style={styles.centeredViewInside}>
                        <View style={styles.modalView}>
                          
                        {modalDSEMyCashTransfer.map((menu) => (
                              <Menu
                                title={menu.title}
                                icon={menu.icon}
                                //id={menu.id}
                                id={data}
                                modalId={menu.title}
                                key={menu.title}
                                routeKey={menu.routeKey}
                                onPress= {() => this.setModalVisible(!modalVisible)}
                              />
                            ))}
                          <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => this.setModalVisible(!modalVisible)}
                          >
                          <Text style={styles.textStyle}>Close</Text>
                          </Pressable>
                        </View>
                      </View>
                    </Modal>
                  </View>
                  }else if(collection){
                  return null;
                  }
          }
        componentDidMount() {
          this.load();
            /*messaging().onMessage(async remoteMessage => {
                Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
              });*/ // its working shows a alert with data
        }

        handleOnClickOfWalletRedirrect = (wallet:any,balance:any) => async () => {
          console.log("from param"+balance);
          if(wallet.walletType=== "Distributor" || "DSE" || "Local Merchant" || "Mother Merchant"){
          navigation.navigate("HomeLayer",{wallet,balance});
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
                {this.state.role === ROLE.CASHPOINT && 
                  this.props.route.params.wallet.walletName=== "MyCash" &&
                  this.props.route.params.wallet.walletType=== "DSE" &&(
                  <View>
                    <View style={style.bodySection}>
                      {menusDSE.map((menu , index: any) => (
                        //menu.routeKey=== "Transfer" &&
                        <View key={index}>
                        <Menu
                          title={menu.title}
                          icon={menu.icon}
                          id={data}//only for without modal homelayer like (collection,deposit)
                          key={menu.title}
                          routeKey={menu.transfer?null:menu.routeKey}
                          onPress={menu.transfer?() => this.setState({modalVisible:true}):menu.Collection?() => this.setState({modalVisible1:true}):() => this.setState({modalVisible:false})}
                          
                        />
								{/*<ModalForDse isTransfer={menu.transfer} isCollection={menu.Collection} />*/}
                    {this.ModalForDse(menu)}

								        </View>
							        ))}
						        </View>
					        </View>
				          )}
                
                
	                  {/*<Text style={style.temp}>Hello homepage 1{this.state.authUserId}</Text>
                    <Button style={style.button} title='PressRoute' onPress={()=>this.props.navigation.navigate("InformationScreen")}></Button>*/}
	            </View>
            </DialogContent>
	       )
    }
        
    }

    const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        //width: 50,
      },
      centeredViewInside: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 65,
        //width: 1000,
        },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        width: "90%",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
      });

export default HomeLayer