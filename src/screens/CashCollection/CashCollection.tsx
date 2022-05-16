import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';

import style from './style';
import colors from '../../config/colors';
import DialogContent from '../../component/DialogContent';
import {CommonActions, useNavigation} from '@react-navigation/native';
import ApiCall from '../../networking/ApiCall';
import SearchablePicker from '../../component/SearchablePicker';
//import { WebView } from 'react-native-webview';
import HomeLayer from '../HomeLayer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from "react-native-custom-dropdown";


interface FormData {
  merchantId?: string;
  payeeId?: string;
  collectionType?: string;
  invoiceNo?: string;
  amount?: string;
  walletType?: string;
  reference1?: string;
  reference2?: string;
  reference3?: string;
  collectionPin?: string;
  payeePin?: string;
}

//let urlMM='https://okwalletpayment.onebank.com.bd/okwalletepay/okepay/';

class CashCollection extends React.Component {  
    constructor(props) {
        super(props);
        console.log(this.props);
        const data = this.props.route.params;
        const filterWallet= data.uID.walletName;
        //Alert.alert(filterWallet);
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
          merchantId: undefined,
          payeeId: undefined,
          collectionType: undefined,
          invoiceNo: undefined,
          amount: undefined,
          walletType: undefined,
          reference1: undefined,
          reference2: undefined,
          reference3: undefined,
          collectionPin: undefined,
          payeePin: undefined,
          open: false,
          merchant: [],
          getAllMerchant:[],
          payee: [],
          getAllPayee: [],
          walletTypes: [{"label":"MyCash", "value":"MyCash"},
                         {"label":"Ok", "value":"Ok"},
                         {"label":"General", "value":"General"}],
          getAllCollection: [],
          collectionLoading: false,
        }

      }
        setInputValue(property, val) {
          this.setState({ [property]: val });
        }
        onScreenFocus = () => {
          //Alert.alert(this.props.route.params.uID.walletName);
          this.setInputValue('walletType',this.props.route.params.uID.walletName);
        }
        componentDidMount() {
          this.props.navigation.addListener('focus', this.onScreenFocus);
          this.setInputValue('walletType',this.props.route.params.uID.walletName);
          this.getAllMerchantListData();
          this.getAllPayeeListData();
          this.getAllCollectionListData();
        }
        
        sendvalue=(key , value) => {
          this.setState({[key]: value});
        }
        getAllMerchantListData = async () => {
          let token;
          let user;
          AsyncStorage.getItem('isLoggedInn').then((value2) => {
            AsyncStorage.getItem('userId').then((userId) => {
              this.setState({token: JSON.parse(value2)});
              this.setState({authUserId: JSON.parse(userId)});
              token= JSON.parse(value2);
              user= JSON.parse(userId);
              
            });
          });
          let body={"accountId": this.state.authUserId,
                   };
          let path='authorization-service/endpoint/user/merchant';
          console.log(this.state.token);
          let res = await ApiCall.api(body,token,path);
          this.setState({merchant: res.result.response[0]}); // sudhu prothom tar list ana hoise 
          let merchants= res.result.response[0].map((val)=>({label: `${val.name} (${val.userId})`,
            value: val.userId,}));
          this.setState({getAllMerchant: merchants});
        }
        getAllPayeeListData = async () => {
          let token;
          let user;
          AsyncStorage.getItem('isLoggedInn').then((value2) => {
            AsyncStorage.getItem('userId').then((userId) => {
              this.setState({token: JSON.parse(value2)});
              this.setState({authUserId: JSON.parse(userId)});
              token= JSON.parse(value2);
              user= JSON.parse(userId);
              
            });
          });
          let body={"accountId": this.state.authUserId,
                   };
          let path='authorization-service/endpoint/user/payee';
          console.log(this.state.token);
          let res = await ApiCall.api(body,token,path);
          this.setState({payee: res.result.response[0]}); // sudhu prothom tar list ana hoise 
          let payees= res.result.response[0].map((val)=>({label: `${val.name} (${val.userId})`,
            value: val.userId,}));
          this.setState({getAllPayee: payees});
        }
        getAllCollectionListData = async () => {
          let token;
          let user;
          AsyncStorage.getItem('isLoggedInn').then((value2) => {
            AsyncStorage.getItem('userId').then((userId) => {
              this.setState({token: JSON.parse(value2)});
              this.setState({authUserId: JSON.parse(userId)});
              token= JSON.parse(value2);
              user= JSON.parse(userId);
              
            });
          });
          let body={};
          let path='collection-service/endpoint/collection/type';
          console.log(this.state.token);
          let res = await ApiCall.apiget(token,path);
          this.setState({collection: res.result.data}); // sudhu prothom tar list ana hoise 
          let collections= res.result.data.map((val)=>({label: `${val.collectionType}`,
            value: val.id}));
          this.setState({getAllCollection: collections});
        }

        handleSubmit = async () => {
          this.setState({collectionLoading : true});
          let urlMM='https://okwalletpayment.onebank.com.bd/okepay/okbtbepay/';
          let token=this.state.token;
          const {amount, 
                 merchantId,
                 payeeId,
                 collectionType, 
                 invoiceNo, 
                 walletType, 
                 authUserId,
                 reference1,
                 reference2,
                 reference3,
                 collectionPin,
                 payeePin,
                 }= this.state;
          if (amount && merchantId && payeeId && collectionType && walletType){
              
              let body={
                        merchantId,
                        payeeId, 
                        cashPointId: authUserId,
                        currency: walletType, 
                        collectionType, 
                        invoiceNo, 
                        amount,
                        reference1,
                        reference2,
                        reference3,
                        document: 'n/a',
                        collectionPin,
                        payeePin,
                        decision: 'pending',
                        transactionEngineId: '',
                        transactionEngineReply: '',
                   };
              let path='collection-service/endpoint/collection';
              let res = await ApiCall.api(body,token,path);
              console.log(res);
              this.setState({collectionLoading : false});
              if (res.result.result== 'Success'){
                Alert.alert("Transfer successful");
                this.props.navigation.goBack();
              }
              else{
                Alert.alert("Transfer Failed");
              }
              if(walletType == "Ok"){

                if (res){
                  urlMM=urlMM + res.result.message;
                  //Alert.alert(urlMM);
                  this.props.navigation.navigate("WebViewUn",{urlMM});
                }else if(res.error){
                  urlMM=urlMM + res.result.message;
                  
                  navigation.navigate("WebViewUn",{urlMM});
                }
              }
          }

        }
		render() {   
          //const { open, value, items } = this.state;
          let wallett= [{"label":"MyCash", "value":"MyCash"},
          {"label":"Ok", "value":"Ok"},
          {"label":"General", "value":"General"}];

          const filterWallet= this.props.route.params.uID.walletName;
          //Alert.alert(filterWallet);
          wallett = wallett.filter(function(item){
                return item.value ==filterWallet;
            }).map(function({label, value}){
                return {label, value};
            });
	        return (
            <DialogContent>
              
              <View style={style.formBody}>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Merchant</Text>
                  <SearchablePicker
                    updateKey="merchantId"
                    defaultValue={this.state.merchantId}
                    items={this.state.getAllMerchant}
                    onChangeItem={this.sendvalue}
                    searchablePlaceholder={'Select Merchant'}
                  />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Payee ID</Text>
                  <SearchablePicker
                    updateKey="payeeId"
                    defaultValue={this.state.payeeId}
                    items={this.state.getAllPayee}
                    onChangeItem={this.sendvalue}
                    searchablePlaceholder={'Select Payee'}
                  />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Wallet</Text>
                  <SearchablePicker
                    updateKey="walletType"
                    defaultValue={wallett[0].value}
                    items={wallett}
                    onChangeItem={this.sendvalue}
                    searchablePlaceholder={'Select Wallet'}
                  />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Collection type</Text>
                  <SearchablePicker
                    updateKey="collectionType"
                    defaultValue={this.state.collectionType}
                    items={this.state.getAllCollection}
                    onChangeItem={this.sendvalue}
                    searchablePlaceholder={'Select Collection'}
                  />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Invoice No</Text>
                  <TextInput
                    style={style.formInput}
                    value={this.state.invoiceNo}
                    onChangeText={(text) => {
                      this.setInputValue('invoiceNo', text);
                    }}
                  />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Amount</Text>
                  <TextInput
                    style={style.formInput}
                    keyboardType={'number-pad'}
                    value={this.state.amount}
                    onChangeText={(text) => {
                      this.setInputValue('amount', text);
                    }}
                  />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Reference 1</Text>
                  <TextInput
                    style={style.formInput}
                    value={this.state.reference1}
                    onChangeText={(text) => {
                      this.setInputValue('reference1', text);
                    }}
                  />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Reference 2</Text>
                  <TextInput
                    style={style.formInput}
                    value={this.state.reference2}
                    onChangeText={(text) => {
                      this.setInputValue('reference2', text);
                    }}
                  />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Reference 3</Text>
                  <TextInput
                    style={style.formInput}
                    value={this.state.reference3}
                    onChangeText={(text) => {
                      this.setInputValue('reference3', text);
                    }}
                  />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Collection PIN</Text>
                  <TextInput
                    style={style.formInput}
                    secureTextEntry={true}
                    value={this.state.collectionPin}
                    onChangeText={(text) => {
                      this.setInputValue('collectionPin', text);
                    }}
                  />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Payee PIN</Text>
                  <TextInput
                    style={style.formInput}
                    secureTextEntry={true}
                    value={this.state.payeePin}
                    onChangeText={(text) => {
                      this.setInputValue('payeePin', text);
                    }}
                  />
                </View>
                <View style={style.buttonWrapper}>
                  <TouchableOpacity
                    style={style.cancelButton}
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                    disabled={false}>
                    <Text style={style.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={style.submitButton}
                    onPress={this.handleSubmit}
                    disabled={false}>
                    {this.state.collectionLoading ? (
                      <ActivityIndicator size={'small'} color={colors.white} />
                    ) : (
                      <Text style={style.submitButtonText}>Submit</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              
            </DialogContent>

	         )  
      }
        
    }

export default CashCollection