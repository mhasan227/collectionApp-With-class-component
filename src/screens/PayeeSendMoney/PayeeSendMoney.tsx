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

class PayeeSendMoney extends React.Component {  
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
          taggedMerchantId: '',
          payeeId: '',
	        merchantId: '',
	        transferAmount: '',
	        walletPin: '',
	        currency: '',
	        comment: '',
          merchant: [],
          getAllMerchant:[],
          backupMerchantList: [],
          payee: [],
          getAllPayee: [],
          getAllCollection: [],
          PSendMoneyLoading: false,
        }

      }
        setInputValue(property, val) {
          this.setState({ [property]: val });
        }
        onScreenFocus = () => {
          //Alert.alert(this.props.route.params.uID.walletName);
          this.setInputValue('currency',this.props.route.params.uID.walletName);
        }
        componentDidMount() {
          this.props.navigation.addListener('focus', this.onScreenFocus);
          this.setInputValue('currency',this.props.route.params.uID.walletName);
          this.getAllMerchantListData();
          //this.getAllPayeeListData();
          //this.getAllCollectionListData();
        }
        
        sendvalue=(key , value) => {
          this.setState({[key]: value});
        }
        getAllMerchantListData = async () => {
          let token;
          let user;
          AsyncStorage.getItem('isLoggedInn').then((value2) => {
            AsyncStorage.getItem('userId').then((userId) => {
              AsyncStorage.getItem('taggedMerchantId').then((taggedMerchantId) => {
                this.setState({token: JSON.parse(value2)});
                this.setState({authUserId: JSON.parse(userId)});
                this.setState({taggedMerchantId: JSON.parse(taggedMerchantId)});
                token= JSON.parse(value2);
                user= JSON.parse(userId);
                const backupMerchantList = [{"label": "Select Merchant", "value": ""}, 
                                            {"label": "My Merchant (" + this.state.taggedMerchantId + ")", "value": this.state.taggedMerchantId}
                                            ];
                this.setBackupMerchantList(backupMerchantList);
              });
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
          this.setBackupMerchantList(merchants);
        }
        setBackupMerchantList = (text) => {
          this.setState({ backupMerchantList: text });
        }
        handleSubmit = async () => {
          this.setState({PSendMoneyLoading : true});
          let urlMM='https://okwalletpayment.onebank.com.bd/okepay/okbtbepay/';
          let token=this.state.token;
          const {taggedMerchantId,
                 payeeId,
	               merchantId,
	               transferAmount,
	               walletPin,
	               currency,
	               comment,
                 authUserId,
                 }= this.state;
          if (authUserId && walletPin && transferAmount){
              
              let body={
                        payeeId: authUserId,
                        merchantId,
                        transferAmount,
                        walletPin,
                        currency,
                        comment,
                   };
              let path='collection-service/endpoint/wallet/transfer/payee-merchant';
              let res = await ApiCall.api(body,token,path);
              console.log(res);
              this.setState({PSendMoneyLoading : false});
              if (res.result.result== 'Success'){
                Alert.alert("successful");
                this.props.navigation.goBack();
              }
              else{
                Alert.alert("Failed");
              }
              if(currency == "Ok"){

                if (res){
                  urlMM=urlMM + res.result.message;
                  //Alert.alert(urlMM);
                  this.props.navigation.navigate("WebViewUn",{urlMM});
                }else if(res.error){
                  urlMM=urlMM + res.result.message;
                  
                  this.props.navigation.navigate("WebViewUn",{urlMM});
                }
              }
          }

        }
		render() {   
          //const { open, value, items } = this.state;
          let currencies= [{"label": "Select", "value": ""}, 
                           {"label": "MyCash", "value": "MyCash"}, 
                           {"label": "Ok Wallet", "value": "Ok"}
                          ];

          const filterWallet= this.props.route.params.uID.walletName;
          //Alert.alert(filterWallet);
          currencies = currencies.filter(function(item){
                return item.value ==filterWallet;
            }).map(function({label, value}){
                return {label, value};
            });
	        return (
            <DialogContent>
              
              <View style={style.formBody}>
                <Text style={style.formBodyTitle}>
                  Send Money
                </Text>
                    <View style={style.formBodyInputWrapper}>
                      <Text style={style.formInputLabel}>Merchant</Text>
                      <SearchablePicker
                        updateKey="merchantId"
                        defaultValue={this.state.merchantId}
                        items={this.state.backupMerchantList}
                        onChangeItem={this.sendvalue}
                        searchablePlaceholder={'Select Merchant'}
                      />
                    </View>
                    <View style={style.formBodyInputWrapper}>
                      <Text style={style.formInputLabel}>Currency</Text>
                      <SearchablePicker
                        updateKey="currency"
                        defaultValue={this.state.currency}
                        items={currencies}
                        onChangeItem={this.sendvalue}
                        searchablePlaceholder={'Select Currency'}
                      />
                    </View>
                    <View style={style.formBodyInputWrapper}>
                      <Text style={style.formInputLabel}>Amount</Text>
                      <TextInput
                        style={style.formInput}
                        keyboardType={'number-pad'}
                        value={this.state.transferAmount}
                        onChangeText={(text) => this.setInputValue('transferAmount', text)}
                      />
                    </View>
                    <View style={style.formBodyInputWrapper}>
                      <Text style={style.formInputLabel}>PIN</Text>
                      <TextInput
                        style={style.formInput}
                        value={this.state.walletPin}
                        onChangeText={(text) => this.setInputValue('walletPin', text)}
                      />
                    </View>
                    <View style={style.formBodyInputWrapper}>
                      <Text style={style.formInputLabel}>Comment</Text>
                      <TextInput
                        style={style.formInput}
                        value={this.state.comment}
                        onChangeText={(text) => this.setInputValue('comment', text)}
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
                        disabled={this.state.PSendMoneyLoading}>
                        {this.state.PSendMoneyLoading ? (
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

export default PayeeSendMoney