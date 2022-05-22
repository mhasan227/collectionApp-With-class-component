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
        this.state = {
          token:'',
          data: '',
          authUserId: '',
          userName: '',
          authResponse: '',
          merchantId: '',
	        payeeId: '',
	        transferAmount: '',
	        currency: '',
	        merchantPullOTP: '',
	        comment: '',
	        id: '',
	        otp: '',
	        amountGive: '',
          open: false,
          merchant: [],
          getAllMerchant:[],
          payee: [],
          getAllPayee: [],
          walletTypes: [{"label":"MyCash", "value":"MyCash"},
                         {"label":"Ok", "value":"Ok"},
                        ],
          getAllCollection: [],
          submitButtonText: 'Request OTP',
          MMPullLoading: false,
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
          this.getAllPayeeListData();
        }
        
        sendvalue=(key , value) => {
          if (key === "id")
            {
              console.log("pull id:", value);
            }
            else if (key === "transferAmount")
            {
              let amountGive = Math.floor(Number(value.replace(",", "")) * 0.992);
              let amountGiveString = amountGive + "";
              this.setInputValue("amountGive", amountGive);
              this.setState({[key]: value});
              return;
            }
          this.setState({[key]: value});
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
          let payees= res.result.response[0].filter((val: any) => {
            const isFound = val?.taggedMerchantIds?.find(
              (merchant: any) => merchant?.merchantId === this.state.authUserId,
            );
            return !!isFound;
          })
          .map((val: any) => {
            if (val) {
              return {
                label: `${val.name} (${val.userId})`,
                value: val.userId,
              };
            }
            return {};
          });
          this.setState({getAllPayee: payees});
        }
        setSubmitButtonText = (text) => {
          this.setState({ submitButtonText: text });
        }
        cancelAction = () => {
          this.props.navigation.goBack();
          this.setSubmitButtonText("Request OTP");		
        }
        handleSubmit = async () => {
          this.setState({MMPullLoading : true});
          let token=this.state.token;
          const {amount, 
                 merchantId,
                 payeeId,
	               transferAmount,
	               currency,
	               merchantPullOTP,
	               comment,
	               id,
	               //otp,
	               amountGive,
                 authUserId,
                 submitButtonText,
                 }= this.state;
          if (submitButtonText === "Request OTP"){
            if	(
              authUserId &&
              transferAmount !== undefined && transferAmount !== "" && (Number(transferAmount) - 20) >= 0 && 
              payeeId !== undefined && payeeId !== "" && 
              currency !== undefined && currency !== "" 
             ) 
            {
              this.setSubmitButtonText("Requesting...");
              let body={
                  merchantId: authUserId,
                  payeeId,
                  transferAmount,
                  currency,
                  comment
              };
              let path='collection-service/endpoint/wallet/transfer/payee-merchant-pull';
              let res = await ApiCall.api(body,token,path);
              console.log(res);
              this.setState({collectionLoading : false});
              if (res &&
                  res.result && 
                  res.result.data &&  
                  res.result.data.id
              ) {
                this.setInputValue("id", res.result.data.id);
                if (res.result.data.id !== undefined && res.result.data.id !== "" && res.result.data.id !== "-1")
                {
                  this.setSubmitButtonText("Submit OTP");		
                } 
                else if (res.result.data.id !== undefined && res.result.data.id !== "" && res.result.data.id === "-1")
                {
                  this.setSubmitButtonText("Request OTP");
                  Alert.alert("Failure", res.result.data.apiMessage);			
                } 
                else
                {
                  this.setSubmitButtonText("Request OTP");
                  Alert.alert("Failure", "Operation failed");			
                }
              }
              else if (res == null && !pullRequestData.loading && submitButtonText === "Requesting..." && res !== undefined)
              {
                Alert.alert("Failure (2)", "Operation failed 2");			
                this.setSubmitButtonText("Request OTP");
              }
              else if (res == null && ! submitButtonText === "Requesting")
              {
                Alert.alert("Failure (3)", "Operation failed");			
                this.setSubmitButtonText("Request OTP");
              }
              else{
                Alert.alert("Failed");
              }
            }
            else if (payeeId === undefined || payeeId === "")
            {
              Alert.alert("Failure", "Payee is not acceptable.");			
            }
            else if (currency === undefined || currency === "")
            {
              Alert.alert("Failure", "Currency is not acceptable.");
            }
            else if (transferAmount === undefined || transferAmount === "" || (Number(transferAmount) - 20) < 0)
            {
              Alert.alert("Failure", "Balance is not acceptable.");			
            }   
          }
          else if (submitButtonText === "Submit OTP")
          {
            this.setSubmitButtonText("OTP Submitted");
            if (
                id !== undefined && id !== "" && 
                merchantPullOTP !== undefined && merchantPullOTP !== ""
            ) {
                  let body={
                    id,
                    otp: merchantPullOTP
                  };
                  let path='collection-service/endpoint/wallet/transfer/payee-merchant-pull-confirm';
                  let res = await ApiCall.api(body,token,path);
                  console.log(res);
                  this.setState({collectionLoading : false});
                  if (res &&
                      res.result && 
                      res.result.data &&  
                      res.result.data.id
                  ) {
                      if (submitButtonText !== "Submit OTP")
                      {
                        this.setInputValue("id", res.result.data.id);	
                      }
                      else if(submitButtonText !== "OTP Submitted")
                      {
                        return;
                      }
                    
                      //console.log(res);
                      else if (res &&
                              res.result && 
                              res.result.result &&  
                              res.result.result === "Success"
                      ) {
                        this.setSubmitButtonText("Request OTP");		
                        Alert.alert("Success", "Operation successful");
                      }
                      else if (res &&
                              res.result && 
                              res.result.result &&  
                              res.result.result !== "Success"
                      ) {
                          this.setSubmitButtonText("Request OTP");		
                          Alert.alert("Failure", "Operation failed");
                      }
                      else if (res.error &&
                              res.error
                      ) {
                          this.setSubmitButtonText("Request OTP");		
                          Alert.alert("Failure", "Operation failed");
                      }
                  }
                  else{
                    Alert.alert("Failed");
                  }
              }
          }
          else if (submitButtonText === "OTP Submitted")
          {
            return;
          }

        }
		render() {   
          //const { open, value, items } = this.state;
          let wallett= [{"label":"MyCash", "value":"MyCash"},
                          {"label":"Ok", "value":"Ok"},
                        ];

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
                <Text style={style.formBodyTitle}>
                  Cashout
                </Text>
                    <View style={style.formBodyInputWrapper}>
                      <Text style={style.formInputLabel}>Payee</Text>
                      <SearchablePicker
                        updateKey="payeeId"
                        defaultValue={this.state.payeeId}
                        items={this.state.getAllPayee}
                        onChangeItem={this.sendvalue}
                        searchablePlaceholder={'Select Payee'}
                        disabled={this.state.submitButtonText !== "Request OTP"}
                      />
                    </View>
                    <View style={style.formBodyInputWrapper}>
                      <Text style={style.formInputLabel}>Wallet Type</Text>
                      <SearchablePicker
                        updateKey="currency"
                        defaultValue={this.state.currency}
                        items={wallett}
                        onChangeItem={this.sendvalue}
                        searchablePlaceholder={'Select Wallet Type'}
                        disabled={this.state.submitButtonText !== "Request OTP"}
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
                    <View style={style.formBodyInputWrapper}>
                      <Text style={style.formInputLabel}>Cashout Amount</Text>
                      <TextInput
                        style={style.formInput}
                        keyboardType={'number-pad'}
                        value={this.state.transferAmount}
                        onChangeText={(text) => this.sendvalue("transferAmount", text)}
                        editable={this.state.submitButtonText === "Request OTP"}
                      />
                    </View>
                    <View style={style.formBodyInputWrapper}>
                      <Text style={style.formInputLabel}>Handover Amount: {this.state.amountGive}</Text>
                      <TextInput
                        style={style.formInput}
                        value={this.state.amountGive}
                        editable={false}
                      />
                    </View>
                    {	this.state.id !== undefined && this.state.id !== "" && this.state.submitButtonText === "Submit OTP" && 
                      <View style={style.formBodyInputWrapper}>
                        <Text style={style.formInputLabel}>OTP</Text>
                        <TextInput
                          style={style.formInput}
                          value={this.state.merchantPullOTP}
                          onChangeText={(text) => this.setInputValue('merchantPullOTP', text)}
                        />
                      </View>
                    }
                    <View style={style.buttonWrapper}>
                      <TouchableOpacity
                        style={style.cancelButton}
                        onPress={() => {
                          this.cancelAction();
                        }}
                        disabled={false}>
                        <Text style={style.cancelButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={style.submitButton}
                        onPress={this.handleSubmit}
                        disabled={this.state.MMPullLoading}>
                        {this.state.MMPullLoading ? (
                          <ActivityIndicator size={'small'} color={colors.white} />
                        ) : (
                          <Text style={style.submitButtonText}>{this.state.submitButtonText}</Text>
                        )}
                      </TouchableOpacity>
                    </View>
			        </View>
              
            </DialogContent>

	         )  
      }
        
    }

export default CashCollection