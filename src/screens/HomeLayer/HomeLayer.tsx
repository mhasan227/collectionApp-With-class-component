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
import { Switch } from 'react-native-switch';
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
//let dataWallet= undefined;
class HomeLayer extends React.Component {  
    constructor(props) {
        super(props);
        console.log(this.props);
        
        //dataWallet = this.props.route.params.wallet;
        //console.log(dataWallet);
        let wallets = [];
        
        //console.log("working",+dataWallet);
        this.setInputValue = this.setInputValue.bind(this);
        //this.getAllWallet = this.getAllWallet.bind(this);
        //this.setInputValue = this.setInputValue.bind(this);
        this.state = {
          dataWallet: this.props.route.params.wallet,
          token:'',
          data: '',
          authUserId: '',
          userName: '',
          authResponse: '',
          wallets: [],
          role: '',
          modalVisible: false,
          modalVisible1: false,
          balanceVisible: false,
          balance: '',
        }
    }   

        setInputValue(property, val) {
          this.setState({ [property]: val });
        }
        checkToken = async () => {
          let token;
          console.log("jpl",this.state.dataWallet);
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
      }
 
        load = async () =>{
         await this.checkToken();
        }
        setModalVisible = (visible) => {
          this.setState({ modalVisible: visible });
        }

        setbalanceVisible = (visible) => {
          this.setState({ balanceVisible: visible });
        }

        setbalance = (value) => {
          this.setState({ balance: value });
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
                                id={this.props.route.params.wallet}
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

          ModalForLedger(props) {
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
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                  {modalLedgerTransfer.map((menu) => (
                        <Menu
                          title={menu.title}
                          icon={menu.icon}
                          //id={menu.id}
                          id={this.props.route.params.wallet}
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
            }
            return null;
            }

            ModalForMyCashDis(props) {
              const {transfer, collection}= props;
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
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    {modalMyDisTransfer.map((menu) => (
                        <Menu
                          title={menu.title}
                          icon={menu.icon}
                          //id={menu.id}
                          id={this.props.route.params.wallet}
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
              }else {
                return null; 
              }
            }

            ModalForMyCashLocalMerchant(props) {
              const {transfer}= props;
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
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    {modalMyLocalMerchantTransfer.map((menu) => (
                        <Menu
                          title={menu.title}
                          icon={menu.icon}
                          //id={menu.id}
                          id={this.props.route.params.wallet}
                          //modalId={menu.title}
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
              }else {
                return null; 
              }
            }

            ModalForMMPartnerMyCash(props) {
              const {Cashout}= props;
              const { modalVisible } = this.state;
              if (Cashout) {
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
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                  {modalMyMotherMerchantCashoutMyCash.map((menu) => (
                      <Menu
                        title={menu.title}
                        icon={menu.icon}
                        //id={menu.id}
                        id={this.props.route.params.wallet}
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
              }else {
                return null; 
              }
            }

            ModalForOkDistributor(props) {
              const {transfer, collection}= props;
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
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                  {modalOkDisTransfer.map((menu) => (
                      <Menu
                        title={menu.title}
                        icon={menu.icon}
                        //id={menu.id}
                        id={this.props.route.params.wallet}
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
              }else {
                return null; 
              }
            }

            ModalForMMPartnerOk(props) {
              const {Cashout}= props;
              const { modalVisible } = this.state;
              if (Cashout) {
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
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                  {modalMyMotherMerchantCashoutOk.map((menu) => (
                      <Menu
                        title={menu.title}
                        icon={menu.icon}
                        //id={menu.id}
                        id={this.props.route.params.wallet}
                        //modalId={menu.title}
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
              }else {
                return null; 
              }
            }

            
        componentDidMount() {
          this.load();
        }

        handleOnClickOfWallet = (dataWallet) => async () => {
          const { balanceVisible }= this.state;
          const {transactionAccountId, walletPin} = dataWallet;
          let body={"transactionAccountId": transactionAccountId,
                     "walletPin" : walletPin,
                   };
          if (transactionAccountId) {
            let path='collection-service/endpoint/wallet/balance';
            console.log(this.state.token);
            let res = await ApiCall.api(body,this.state.token,path);
            console.log(res);
            this.setbalance(res.result.data.balance);    
          }
          
          this.setbalanceVisible(!balanceVisible);
          setTimeout(() => {this.setbalanceVisible(false)},4000);
        }; 

      
		render() { 
          const { balanceVisible }= this.state;
          const dataWallet=this.props.route.params.wallet;
	        return (
            <DialogContent style={{flex : 1, backgroundColor: 'red'}}>
              <View style={{paddingTop: 16,paddingLeft: 16}}>
                <Switch
                value={balanceVisible}
                onValueChange={this.handleOnClickOfWallet(dataWallet)}//{balanceVisible===true?setTimeout(() => setbalanceVisible(tfp),4000):() => setbalanceVisible(trp)}//{(val) => console.log(val)}
                disabled={false}
                activeText={this.state.balance?this.state.balance+"BDT": "wait"}
                inActiveText={'Balance'}
                barHeight={30}
                switchWidthMultiplier={5}
                circleSize={25}
                backgroundActive={'#fa8072'}
                backgroundInactive={'purple'}
                circleActiveColor={'#98fb98'}
                circleInActiveColor={'#b0e0e6'}/>
			      	</View>
	            <View style={{padding: 16}}>

                {this.state.role === ROLE.CASHPOINT && 
                  (this.props.route.params.wallet.walletName=== "MyCash"&&
                  this.props.route.params.wallet.walletType=== "Distributor") &&(
                  <View style={style.bodySection}>
                    {menusCP.map((menu,index: any) => (
                      <View key={index}>
                      <Menu
                        title={menu.title}
                        icon={menu.icon}
                        id={dataWallet}
                        key={menu.title}
                        routeKey={menu.transfer?null:menu.routeKey} //for making deposit without modal 
                        onPress={menu.transfer?() => this.setModalVisible(true):() => this.setModalVisible(false)}
                      />
                      {this.ModalForMyCashDis(menu)}
                      
                      </View>
                    ))}
                
                  </View>
            
                )}

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
                          id={dataWallet}//only for without modal homelayer like (collection,deposit)
                          key={menu.title}
                          routeKey={menu.transfer?null:menu.routeKey}
                          onPress={menu.transfer?() => this.setState({modalVisible:true}):menu.Collection?() => this.setState({modalVisible1:true}):() => this.setState({modalVisible:false})}
                        />
                        {this.ModalForDse(menu)}
								        </View>
							        ))}
						        </View>
					        </View>
				          )}

                {this.state.role === ROLE.CASHPOINT && 
                    
                  this.props.route.params.wallet.walletType != "DSE" &&
                  this.props.route.params.wallet.walletType != "Distributor" &&(
                    <View style={style.bodySection}>
                      {menusLedger.map((menu , index: any) => (
                        <View key={index}>
                        <Menu
                          title={menu.title}
                          icon={menu.icon}
                          key={menu.title}
                          id={dataWallet}
                          routeKey={menu.transfer?null:menu.routeKey}
                          onPress={menu.transfer?() => this.setModalVisible(true):() => this.setModalVisible(false)}
                        />
                        {this.ModalForLedger(menu)}
                        </View>
                      ))}
                    </View>
                  )}

                  {this.state.role === ROLE.CASHPOINT && 
                    (this.props.route.params.wallet.walletName=== "Ok" &&
                    this.props.route.params.wallet.walletType=== "DSE") &&(
                    <View>
                      <View style={style.bodySection}>
                        {menusOkDSR.map((menu , index: any) => (
                          //menu.routeKey=== "Transfer" &&
                          <View key={index}>
                          <Menu
                            title={menu.title}
                            icon={menu.icon}
                            id={dataWallet}
                            key={menu.title}
                            routeKey={menu.routeKey}
                            //onPress={menu.transfer?() => setModalVisible(true):menu.Collection?() => setModalVisible1(true):() => setModalVisible(false)}
                            
                          />
                          {/*<ModalForOkDsr isTransfer={menu.transfer} isCollection={menu.Collection} />*/}

                          </View>
                        ))}
                        
                          
                      </View>
                    
                    </View>
                  )}

                  {this.state.role === ROLE.CASHPOINT && 
                    this.props.route.params.wallet.walletName=== "Ok" &&
                    this.props.route.params.wallet.walletType=== "Distributor" &&(
                    <View>
                      <View style={style.bodySection}>
                        {menusOkDistributor.map((menu , index: any) => (
                          //menu.routeKey=== "Transfer" &&
                          <View key={index}>
                          <Menu
                            title={menu.title}
                            icon={menu.icon}
                            id={dataWallet}
                            key={menu.title}
                            routeKey={menu.title==="Deposit"?menu.routeKey:""}
                            onPress={menu.transfer?() => this.setModalVisible(true):menu.Collection?() => this.setModalVisible1(true):() => this.setModalVisible(false)}
                            //onPress={() =>Gta55(menu.modal)}
                          />
                          
                          {this.ModalForOkDistributor(menu)}
                          </View>
                        ))}
                        
                          
                      </View>
                    
                    </View>
                  )}

                  {this.state.role === ROLE.MERCHANT && 
                  this.props.route.params.wallet.walletName === "MyCash" &&(
                    <View style={style.bodySection}>
                      {menusMM.map((menu , index: any) => (
                        <View key={index}>
                        <Menu
                          title={menu.title}
                          icon={menu.icon}
                          key={menu.title}
                          id={dataWallet}
                          //routeKey={menu.routeKey}
                          onPress={menu.Cashout?() => this.setModalVisible(true):() => this.setModalVisible(false)}
                        />
                        
                        {this.ModalForMMPartnerMyCash(menu)}
                        </View>
                      ))}
                    </View>
                  )}
                  {this.state.role === ROLE.MERCHANT && 
                  this.props.route.params.wallet.walletName === "Ok" &&(
                    <View style={style.bodySection}>
                      {menusMM.map((menu , index: any) => (
                        <View key={index}>
                          <Menu
                            title={menu.title}
                            icon={menu.icon}
                            key={menu.title}
                            id={dataWallet}
                            //routeKey={menu.routeKey}
                            onPress={menu.Cashout?() => this.setModalVisible(true):() => this.setModalVisible(false)}
                          />
                          
                          {this.ModalForMMPartnerOk(menu)}
                        </View>
                      ))}
                    </View>
                  )}
                  {this.state.role === ROLE.AGENT && (
                    <View style={style.bodySection}>
                      {menusA.map((menu , index: any) => (
                        <Menu
                          title={menu.title}
                          icon={menu.icon}
                          key={menu.title}
                          routeKey={menu.routeKey}
                        />
                      ))}
                    </View>
                  )}
                  {this.state.role === ROLE.PAYEE &&
                    (this.props.route.params.wallet.walletName === "Ok"||
                    this.props.route.params.wallet.walletName === "MyCash")&&(
                    <View style={style.bodySection}>
                      {menusP.map((menu , index: any) => (
                        <View key={index}> 
                          <Menu
                            title={menu.title}
                            icon={menu.icon}
                            key={menu.title}
                            //routeKey={menu.routeKey}
                            onPress={menu.transfer?() => this.setModalVisible(true):() => this.setModalVisible(false)}
                          />
                          
                          {this.ModalForMyCashLocalMerchant(menu)}
                        </View>
                      ))}
                      
                    </View>
                  )}
                  {this.state.role === ROLE.LM && (
                    <View style={style.bodySection}>
                      {menusTM.map((menu , index: any) => (
                        <Menu
                          title={menu.title}
                          icon={menu.icon}
                          key={menu.title}
                          routeKey={menu.routeKey}
                        />
                      ))}
                    </View>
                  )}
                  {this.state.role === ROLE.AM && (
                    <View style={style.bodySection}>
                      {menusAM.map((menu) => (
                        <Menu
                          title={menu.title}
                          icon={menu.icon}
                          key={menu.title}
                          routeKey={menu.routeKey}
                        />
                      ))}
                    </View>
                  )}
                  {this.state.role === ROLE.RM && (
                    <View style={style.bodySection}>
                      {menusRM.map((menu) => (
                        <Menu
                          title={menu.title}
                          icon={menu.icon}
                          key={menu.title}
                          routeKey={menu.routeKey}
                        />
                      ))}
                    </View>
                  )}
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