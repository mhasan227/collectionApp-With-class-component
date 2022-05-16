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
  StyleSheet,
  Button,
  PermissionsAndroid,
  Linking,
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
import * as ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import {Picker} from '@react-native-picker/picker';

interface FormData {
  transportationMode: string,
  fare: double,
  area: string,
  userId: string,
  pictureB64: string,
  longitude: string,
  latitude : string,
  payeeId?: string,
};

class WalletActivation extends React.Component {  
    constructor(props) {
        super(props);
        console.log(this.props);
        const data = this.props.route.params;
 
        let wallets = [];
        
        console.log("working",data);
        this.setInputValue = this.setInputValue.bind(this);
        this.state = {
          token:'',
          data: '',
          authUserId: '',
          userName: '',
          authResponse: '',
          AllWallets: [],
          Wallets: [],
          pinWalletId:'',
          walletPin: '',
          otpWalletId: '',
          walletOTP: '',
          attandanceloading: false,
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
          //this.props.navigation.addListener('focus', this.onScreenFocus)
          this.getAsyncStorage();
          
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
          let wallets= res.result.data.map((val)=>({label: val.walletId,
          value: val.walletId}));
          this.setState({AllWallets: wallets});
        }
        sendvalue=(key , value) => {
          this.setState({[key]: value});
        }
        
        handleSetPin = async () => {
          
          const { walletPin,
                  pinWalletId,
                  token,
               }= this.state;
               
          if (walletPin && pinWalletId ){
                //Alert.alert(token);
                let body={
                          walletId: pinWalletId,
                          walletPin,
                          };
                //Alert.alert(walletPin);
                let path='collection-service/endpoint/wallet/pin-setup';
                let res = await ApiCall.api(body,token,path);
                console.log(res);
                if (res.result.code== '201'){
                    Alert.alert("successful");
                    this.props.navigation.goBack();
                }
                else{
                  Alert.alert("Failed");
                }
            }else{
              Alert.alert('Failed', 'Field can not be blank');
            }
        }
        handleSetOtp = async () => {
          const { walletOTP,
                  otpWalletId,
                  token,
                }= this.state;
         
          if (walletOTP && otpWalletId ){
                //Alert.alert(token);
                let body={
                          walletId: otpWalletId,
                          walletOTP,
                          };
                //Alert.alert(walletPin);
                let path='collection-service/endpoint/wallet/otp-setup';
                let res = await ApiCall.api(body,token,path);
                console.log(res);
                if (res.result.code== '201'){
                    Alert.alert("successful");
                    this.props.navigation.goBack();
                }
                else{
                  Alert.alert("Failed");
                }
            }else{
              Alert.alert('Failed', 'Field can not be blank');
            }
        }

		  render() {         
	        return (
            <DialogContent>  
              <View style={style.root}>
                <View style={style.header}>
                  <Text style={style.headerTitle}> Wallet Activation</Text>
                </View>
                <View style={[style.body, {zIndex: 6}]}>
                  <View style={[style.section, {zIndex: 9}]}>
                    <View style={style.sectionHeader}>
                      <Image
                        source={require('../../../assets/right-arrow.png')}
                        style={style.headerIcon}
                      />
                      <Text style={style.sectionHeaderTitle}>PIN SET</Text>
                    </View>
                    <View style={style.sectionBody}>
                      <View style={style.inputRow}>
                        <Text style={style.formInputLabel}>Select Wallet</Text>
                        <View style={style.inputWrapper}>
                          <View style={style.formInput}>
                            <Picker
                              selectedValue={this.state.pinWalletId}
                              onValueChange={(itemValue) => {
                                this.setInputValue('pinWalletId', itemValue);
                              }}>
                              <Picker.Item label="Select Wallet" value={undefined} />
                              {this.state.AllWallets.map((ele: any) => (
                                <Picker.Item
                                  label={ele.label}
                                  value={ele.value}
                                  key={ele.value}
                                />
                              ))}
                            </Picker>
                          </View>
                        </View>
                      </View>
                      <View style={style.inputRow}>
                        <Text style={style.formInputLabel}>Select PIN</Text>
                        <View style={style.inputWrapper}>
                          <TextInput
                            style={style.formInput}
                            defaultValue={this.state.walletPin}
                            value={this.state.walletPin}
                            secureTextEntry={true}
                            keyboardType={'number-pad'}
                            onChangeText={(text) =>
                              this.setInputValue('walletPin', text)
                            }
                          />
                        </View>
                      </View>
                      <View
                        style={[
                          style.inputRow,
                          {marginBottom: 0, justifyContent: 'flex-end'},
                        ]}>
                        <TouchableOpacity
                          onPress={this.handleSetPin}
                          style={style.submitButton}>
                          <Text style={style.submitButtonText}>Set</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={[style.section, {marginBottom: 0, zIndex: 9}]}>
                    <View style={style.sectionHeader}>
                      <Image
                        source={require('../../../assets/right-arrow.png')}
                        style={style.headerIcon}
                      />
                      <Text style={style.sectionHeaderTitle}>OTP SET</Text>
                    </View>
                    <View style={style.sectionBody}>
                      <View style={style.inputRow}>
                        <Text style={style.formInputLabel}>Select Wallet</Text>
                        <View style={style.inputWrapper}>
                          <View style={style.formInput}>
                            <Picker
                              selectedValue={this.state.otpWalletId}
                              onValueChange={(itemValue) => {
                                this.setInputValue('otpWalletId', itemValue);
                              }}>
                              <Picker.Item label="Select Wallet" value={undefined} />
                              {this.state.AllWallets.map((ele: any) => (
                                <Picker.Item
                                  label={ele.label}
                                  value={ele.value}
                                  key={ele.value}
                                />
                              ))}
                            </Picker>
                          </View>
                        </View>
                      </View>
                      <View style={style.inputRow}>
                        <Text style={style.formInputLabel}>Select OTP</Text>
                        <View style={style.inputWrapper}>
                          <TextInput
                            defaultValue={this.state.walletOTP}
                            value={this.state.walletOTP}
                            style={style.formInput}
                            secureTextEntry={true}
                            keyboardType={'number-pad'}
                            onChangeText={(text) =>
                              this.setInputValue('walletOTP', text)
                            }
                          />
                        </View>
                      </View>
                      <View
                        style={[
                          style.inputRow,
                          {marginBottom: 0, justifyContent: 'flex-end'},
                        ]}>
                        <TouchableOpacity
                          onPress={this.handleSetOtp}
                          style={style.submitButton}>
                          <Text style={style.submitButtonText}>Set</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </DialogContent>

	         )  
      }
        
    }


export default WalletActivation