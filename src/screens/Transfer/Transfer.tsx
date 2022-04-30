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
  transferAmount?: string;
  walletPin?: string;
  transferWalletId?: string;
  transferType?: string;
}

//let urlMM='https://okwalletpayment.onebank.com.bd/okwalletepay/okepay/';

class Transfer extends React.Component {  
    constructor(props) {
        super(props);
        console.log(this.props);
        const data = this.props.route.params;
        //const filterWallet= data.uID.walletName;
        //Alert.alert(filterWallet);
        let wallets = [];
        
        console.log("working",data);
        this.setInputValue = this.setInputValue.bind(this);
        //this.getAllWallet = this.getAllWallet.bind(this);
        //this.setInputValue = this.setInputValue.bind(this);
        this.state = {
          token:'',
          data: '',
          authUserId: '',
          userName: '',
          authResponse: '',
          transferAmount: undefined,
          walletPin: undefined,
          transferWalletId: "",
          transferType: undefined,
          open: false,
          wallets: [],
          transferLoading: false,
        }

      }
        setInputValue(property, val) {
          this.setState({ [property]: val });
        }
        onScreenFocus = () => {
          let transferTypes = this.filterTransferTypes();
          this.setInputValue('transferType',transferTypes[0].value);
        }
        getAsyncStorage = async () =>{
          let token;
          let user;
          AsyncStorage.getItem('isLoggedInn').then((value2) => {
            AsyncStorage.getItem('userId').then((userId) => {
              this.setState({token: JSON.parse(value2)});
              this.setState({authUserId: JSON.parse(userId)});
              token= JSON.parse(value2);
              user= JSON.parse(userId);
              console.log("transfer",this.state.token);
              this.getAllWalletListData();
            });
          });
        }
       async componentDidMount() {
          this.props.navigation.addListener('focus', this.onScreenFocus)
          //this.setInputValue('currency',this.props.route.params.uID.walletName);
          this.getAsyncStorage();
          //this.getAllWalletListData();
          //this.getAllPayeeListData();
          //this.getAllCollectionListData();
        }
        
        sendvalue=(key , value) => {
          this.setState({[key]: value});
        }
        getAllWalletListData = async () => {
          
          let body={"accountId": this.state.authUserId,
                   };
          let path='collection-service/endpoint/wallet/accountId';
          
            console.log("transfer 2",this.state.authUserId);
          
          let res = await ApiCall.api(body,this.state.token,path);
          console.log(res.result.data);
          console.log(res);
          this.setState({wallets: res.result.data});
          let wallets= res.result.data;
          
        }

        getTransferTypes = (walletListPrimary: any) => {
          
          console.log("====walletListPrimary====");
          console.log(walletListPrimary);
            let optionOkDistributorDSE = '{"label": "From Ok Distributor [Ok_WALLET_DISTRIBUTOR] --> To Ok DSE [Ok_WALLET_DSE]", "value": "TRANSFER_TYPE_Ok_DISTRIBUTOR_DSE"}';
            let optionMyCashDistributorDSE = '{"label": "From MyCash Distributor [MYCASH_WALLET_DISTRIBUTOR] --> To MyCash DSE [MYCASH_WALLET_DSE]", "value": "TRANSFER_TYPE_MYCASH_DISTRIBUTOR_DSE"}';
            let optionMyCashDSEDistributor = '{"label": "From MyCash DSE [MYCASH_WALLET_DSE] --> To MyCash Distributor [MYCASH_WALLET_DISTRIBUTOR]", "value": "TRANSFER_TYPE_MYCASH_DSE_DISTRIBUTOR"}';
            let optionGeneralMyCashDistributor = '{"label": "From Lifting Balance --> To MyCash Distributor [MYCASH_WALLET_DISTRIBUTOR]", "value": "TRANSFER_TYPE_GENERAL_MYCASH_DISTRIBUTOR"}';
            let optionMyCashDistributorGeneral = '{"label": "From MyCash Distributor [MYCASH_WALLET_DISTRIBUTOR] --> To Lifting Balance", "value": "TRANSFER_TYPE_MYCASH_DISTRIBUTOR_GENERAL"}';

            let transferTypeCurrent = [];

            for (let index = 0; walletListPrimary !== undefined && walletListPrimary !== null && index < walletListPrimary.length; index++)
            {
              let ele = walletListPrimary[index];
              if (ele.walletType.toUpperCase() === "DSE" && ele.walletName.toUpperCase() === "MYCASH")
              {
                optionMyCashDistributorDSE = optionMyCashDistributorDSE.replace("MYCASH_WALLET_DSE", ele.walletId);
                optionMyCashDSEDistributor = optionMyCashDSEDistributor.replace("MYCASH_WALLET_DSE", ele.walletId);
              }
              else if (ele.walletType.toUpperCase() === "DISTRIBUTOR" && ele.walletName.toUpperCase() === "MYCASH")
              {
                optionMyCashDistributorDSE = optionMyCashDistributorDSE.replace("MYCASH_WALLET_DISTRIBUTOR", ele.walletId);
                optionMyCashDSEDistributor = optionMyCashDSEDistributor.replace("MYCASH_WALLET_DISTRIBUTOR", ele.walletId);
                optionGeneralMyCashDistributor = optionGeneralMyCashDistributor.replace("MYCASH_WALLET_DISTRIBUTOR", ele.walletId);
                optionMyCashDistributorGeneral = optionMyCashDistributorGeneral.replace("MYCASH_WALLET_DISTRIBUTOR", ele.walletId);
              }

              else if (ele.walletType.toUpperCase() === "DSE" && ele.walletName.toUpperCase() === "OK")
              {
                optionOkDistributorDSE = optionOkDistributorDSE.replace("Ok_WALLET_DSE", ele.walletId);
                
              }
              else if (ele.walletType.toUpperCase() === "DISTRIBUTOR" && ele.walletName.toUpperCase() === "OK")
              {
                optionOkDistributorDSE = optionOkDistributorDSE.replace("Ok_WALLET_DISTRIBUTOR", ele.walletId);
                
              }
            }
            transferTypeCurrent.push(JSON.parse(optionOkDistributorDSE));
            transferTypeCurrent.push(JSON.parse(optionMyCashDistributorDSE));
            transferTypeCurrent.push(JSON.parse(optionMyCashDSEDistributor));
            transferTypeCurrent.push(JSON.parse(optionGeneralMyCashDistributor));
            transferTypeCurrent.push(JSON.parse(optionMyCashDistributorGeneral));
            
            return transferTypeCurrent;
  
        }
        

        handleSubmit = async () => {
          let urlMM='https://okwalletpayment.onebank.com.bd/okwalletepay/okepay/';
          this.setState({transferLoading: true});
          let token=this.state.token;
          const { transferAmount,
                  walletPin,
                  transferWalletId,
                  transferType,
                  authUserId,
                 }= this.state;
          console.log("imp",authUserId);
          console.log("imp",transferAmount);

          //Alert.alert(transferType);
          if (transferAmount){
              //Alert.alert(token);
              let body={userId: authUserId,
                        transferAmount,
                        walletPin,
                        transferWalletId: '',
                        transferType,
                   };
              //Alert.alert(walletPin);
              let path='collection-service/endpoint/wallet/transfer-by-type';
              let res = await ApiCall.api(body,token,path);
              this.setState({transferLoading: false});
              console.log(res);
              if (res.result.result== 'Success'){
                  Alert.alert("Transfer successful");
                  this.props.navigation.goBack();
              }
              else{
                Alert.alert("Transfer Failed");
              }

              if(transferType == "TRANSFER_TYPE_Ok_DISTRIBUTOR_DSE"){

                if (res){
                  urlMM=urlMM + res.result.data;
                  //Alert.alert(urlMM);
                  this.props.navigation.navigate("WebViewUn",{urlMM});
                }else if(res.error){
                  urlMM=urlMM + res.result.data;
                  
                  navigation.navigate("WebViewUn",{urlMM});
                }
              }
          }

        }

        filterTransferTypes = () => {
          
            let transferTypes = this.getTransferTypes(this.state.wallets);

              console.log(this.props.route.params.mID);
              console.log(this.props.route.params.uID.walletName);
            if(this.props.route.params.mID=="DSE" && this.props.route.params.uID.walletName== "MyCash"){
              transferTypes = transferTypes.filter(function(item){
                return item.value == 'TRANSFER_TYPE_MYCASH_DISTRIBUTOR_DSE';
             }).map(function({label, value}){
                 return {label, value};
             });
              console.log(transferTypes);
              console.log(transferTypes[0]);
            
            }
            else if(this.props.route.params.mID=="Ledger" && this.props.route.params.uID.walletName== "MyCash"){
              transferTypes = transferTypes.filter(function(item){
                return item.value == 'TRANSFER_TYPE_MYCASH_DISTRIBUTOR_GENERAL';
             }).map(function({label, value}){
                 return {label, value};
             });
           
            }
            else if(this.props.route.params.mID=="Ok B2B DSR" && this.props.route.params.uID.walletName== "Ok"){
              transferTypes = transferTypes.filter(function(item){
                return item.value == 'TRANSFER_TYPE_Ok_DISTRIBUTOR_DSE';
             }).map(function({label, value}){
                 return {label, value};
             });
          
            }
            else if(this.props.route.params.mID=="MyCash Distributor" && this.props.route.params.uID.walletName== "BDT"){
              transferTypes = transferTypes.filter(function(item){
                return item.value == 'TRANSFER_TYPE_GENERAL_MYCASH_DISTRIBUTOR';
             }).map(function({label, value}){
                 return {label, value};
             });
            
            }
            else if(this.props.route.params.mID=="MyCash Distributor" && this.props.route.params.uID.walletName== "MyCash"){
              transferTypes = transferTypes.filter(function(item){
                return item.value == 'TRANSFER_TYPE_MYCASH_DSE_DISTRIBUTOR';
             }).map(function({label, value}){
                 return {label, value};
             });
         
            }
            else{let transferTypes = this.getTransferTypes(this.state.wallets);}
  
            console.log(transferTypes);
            return transferTypes;
        }
        
		  render() {   
         
          let transferTypes= this.filterTransferTypes();
          
	        return (
            <DialogContent>  
              <View style={style.formBody}>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Type:</Text>
                    <SearchablePicker
                    updateKey="transferType"
                    defaultValue={transferTypes[0].value}
                    //searchablePlaceholder={transferTypes[0].label}
                    //disabled={data.uID.walletType=== "Distributor"||"DSE"?true:false}
                    items={transferTypes}
                    onChangeItem={(itemValue, itemIndex) => {
                        console.log("==== itemIndex ====");
                        console.log(itemIndex);
                        this.sendvalue('transferType', itemIndex);
                      }}
                  />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Amount:</Text>
                  <TextInput
                    style={style.formInput}
                    keyboardType={'number-pad'}
                    value={this.state.transferAmount}
                    onChangeText={(text) => this.setInputValue('transferAmount', text)}
                  />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>PIN:</Text>
                  <TextInput
                    style={style.formInput}
                    keyboardType={'number-pad'}
                    secureTextEntry={true}
                    value={this.state.walletPin}
                    onChangeText={(text) => this.setInputValue('walletPin', text)}
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
                    disabled={this.state.transferLoading}>
                    {this.state.transferLoading ? (
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

export default Transfer