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
import get from 'lodash.get';
import ApiCall from '../../networking/ApiCall';
import SearchablePicker from '../../component/SearchablePicker';
//import { WebView } from 'react-native-webview';
import HomeLayer from '../HomeLayer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from "react-native-custom-dropdown";


interface FormData {
  amount?: string;
  bankIndex?: number;
  reference?: string;
  comments?: string;
  currencyType?: string;
  currency?: string;
}

//let urlMM='https://okwalletpayment.onebank.com.bd/okwalletepay/okepay/';

class Deposit extends React.Component {  
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
          amount: undefined,
          bankIndex: undefined,
          reference: undefined,
          comments: undefined,
          currencyType: 'MFS',
          currency: undefined,
          open: false,
          merchant: [],
          getAllBank:[],
          getAllBankRaw: [],
          payee: [],
          getAllPayee: [],
          depositLoading: false,
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
          this.props.navigation.addListener('focus', this.onScreenFocus)
          this.setInputValue('currency',this.props.route.params.uID.walletName);
          this.getAllBankListData();
        }
        
        sendvalue=(key , value) => {
          this.setState({[key]: value});
        }
        getAllBankListData = async () => {
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
          let path='collection-service/endpoint/wallet/banks';
          console.log(this.state.token);
          let res = await ApiCall.apiget(token,path);
          console.log(res.result.result);
          //this.setState({merchant: res.result.response[0]});
          let banks= res.result.data.map((val: any,index: number)=>(
            {label: val.walletId + ' (' + val.walletAccountId.replace('COLLECTION_Maxis_', '').replace(val.walletId, '').replace('_', ' ').replace('_', ' ') + ')',
            value: index,}));
            //console.log(banks[2].label);
          this.setState({getAllBank: banks});
          this.setState({getAllBankRaw: res.result.data});
        }
        handleSubmit = async () => {
          this.setState({depositLoading: true});
          let token=this.state.token;
          const {amount, 
                 bankIndex,
                 reference,
                 comments,
                 currencyType,
                 currency,
                 authUserId,
                 }= this.state;
          /*let path='collection-service/endpoint/wallet/banks';
          console.log(this.state.token);
          let res = await ApiCall.apiget(this.state.token,path);
          console.log(res.result.result);*/
          const banksData= this.state.getAllBankRaw;
          if (authUserId && bankIndex !== undefined && amount && currency){
              //Alert.alert(token);
              let body={
                        cashpointId: authUserId,
                        amount,
                        depositeSlipImage: '',
                        currencyType: 'MFS',
                        currency: currency,
                        bankDetails:  banksData[bankIndex],
                        reference,
                        comments,
                        approvalDetails: {
                          approvalDecision: '',
                          decisionTime: null,
                          approvalTransactionId: '',
                          liftingAccountId: '',
                          liftingWalletId: '',
                        },
                   };
              let path='collection-service/endpoint/lifting';
              let res = await ApiCall.api(body,token,path);
              this.setState({depositLoading: false});
              if (res.result.result== 'Success'){
                  Alert.alert("Wallet Deposit successful");
                  this.props.navigation.goBack();
              }
              else{
                Alert.alert("Wallet Deposit Failed");
              }
              console.log(res);
          }

        }
		render() {   
          //const { open, value, items } = this.state;
          let wallett= [{"label":"MyCash", "value":"MyCash"},
                        {"label":"Ok", "value":"Ok"},
                        {"label":"General", "value":"General"}];

          let filterWallet= this.props.route.params.uID.walletName;
          //for convert BDT to Genaral 
          if(filterWallet=="BDT"){

            filterWallet="General";
          }// End conversion
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
                    <Text style={style.formInputLabel}>Amount</Text>
                    <TextInput
                      style={style.formInput}
                      keyboardType={'number-pad'}
                      value={this.state.amount}
                      onChangeText={(text) => this.setInputValue('amount', text)}
                    />
                  </View>
                  <View style={style.formBodyInputWrapper}>
                    <Text style={style.formInputLabel}>Bank</Text>
                    <SearchablePicker
                      updateKey="bankIndex"
                      defaultValue={this.state.bankIndex}
                      items={this.state.getAllBank}
                      onChangeItem={this.sendvalue}
                    />
                  </View>
                  <View style={style.formBodyInputWrapper}>
                    <Text style={style.formInputLabel}>Currency type</Text>
                    <TextInput
                      editable={false}
                      style={style.formInput}
                      value={this.state.currencyType}
                      onChangeText={(text) => this.setInputValue('currencyType', text)}
                    />
                  </View>
                  <View style={style.formBodyInputWrapper}>
                    <Text style={style.formInputLabel}>Currency</Text>
                    <SearchablePicker
                      updateKey="currency"
                      defaultValue={wallett[0].value}
                      items={wallett}
                      onChangeItem={this.sendvalue}
                    />
                  </View>
                  <View style={style.formBodyInputWrapper}>
                    <Text style={style.formInputLabel}>Ref/Check</Text>
                    <TextInput
                      style={style.formInput}
                      value={this.state.reference}
                      onChangeText={(text) => this.setInputValue('reference', text)}
                    />
                  </View>
                  <View style={style.formBodyInputWrapper}>
                    <Text style={style.formInputLabel}>Comment</Text>
                    <TextInput
                      style={style.formInput}
                      value={this.state.comments}
                      onChangeText={(text) => this.setInputValue('comments', text)}
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
                      disabled={this.state.depositLoading}>
                      {this.state.depositLoading ? (
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

export default Deposit