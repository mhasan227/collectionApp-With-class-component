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

//import { WebView } from 'react-native-webview';

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

class ChangePassword extends React.Component {  
    constructor(props) {
        super(props);
        console.log(this.props);

        this.setInputValue = this.setInputValue.bind(this);
        this.state = {
          token:'',
          data: '',
          authUserId: '',
          userName: '',
          authResponse: '',
          password: '',
          confirmPassword: '',
          changePasswordDataLoading: false,
        }

      }
        setInputValue(property, val) {
          this.setState({ [property]: val });
        }
        componentDidMount() {
          this.getAsyncStorage();
        }
        
        getAsyncStorage = async () =>{
          let token;
          let user;
          let role;
          this.setState({test: []});
          console.log('focus');
          AsyncStorage.getItem('isLoggedInn').then((value2) => {
            AsyncStorage.getItem('userId').then((userId) => {
              AsyncStorage.getItem('roleListName').then((roleListName) => {
                this.setState({token: JSON.parse(value2)});
                this.setState({authUserId: JSON.parse(userId)});
                this.setState({role: JSON.parse(roleListName)});
                token= JSON.parse(value2);
                user= JSON.parse(userId);
                role= JSON.parse(roleListName);
                //console.log("transfer",this.state.role);
                this.setState({test: ""});
                
              });
            });
          });
        }
        
        handleSubmit = async () => {
          let token=this.state.token;
          const {authUserId,
                 password,
                 confirmPassword
                }= this.state;
          if (authUserId && password && confirmPassword){
              Alert.alert(password);
              let body={
                      userId : authUserId,
                      newPassword : password
                   };
              let path='authorization-service/endpoint/user/password-update';
              let res = await ApiCall.api(body,token,path);
              console.log(res);
              if (res.result.result== 'Success'){
                Alert.alert("successful");
                this.props.navigation.goBack();
              }
              else{
                Alert.alert("Failed");
              }
              
          }else {
            Alert.alert('Failed', 'Field can not be blank');
          }

        }
		render() {   
          
	        return (
            <DialogContent>
              
              <View style={style.root}>
                <Image
                  source={require('../../../assets/logo.png')}
                  style={style.logo}
                  resizeMode={'contain'}
                />
                <Text style={style.title}>Change Password</Text>
                <Text
                  style={[
                    style.subTitle,
                    {width: '80%', textAlign: 'center', marginTop: 16},
                  ]}>
                  Please provide the new password
                </Text>
                <View style={style.iconTextInputWrapper}>
                  <View style={style.iconTextInputIconWrapper}>
                    <Image
                      style={style.iconTextInputIcon}
                      source={require('../../../assets/padlock.png')}
                    />
                  </View>
                  <TextInput
                    style={style.iconTextInput}
                    placeholder="Password"
                    placeholderTextColor={colors.white} //extra
                    onChangeText={(text) => {
                      this.setInputValue('password', text);
                    }}
                    secureTextEntry={true}
                  />
                </View>
                <View style={style.iconTextInputWrapper}>
                  <View style={style.iconTextInputIconWrapper}>
                    <Image
                      style={style.iconTextInputIcon}
                      source={require('../../../assets/padlock.png')}
                    />
                  </View>
                  <TextInput
                    style={style.iconTextInput}
                    placeholder="Confirm Password"
                    placeholderTextColor={colors.white} //extra
                    onChangeText={(text) => {
                      this.setInputValue('confirmPassword', text);
                    }}
                    secureTextEntry={true}
                  />
                </View>
                <TouchableOpacity
                  style={style.submitButton}
                  onPress={this.handleSubmit}
                  disabled={false}>
                  {this.state.changePasswordDataLoading ? (
                    <ActivityIndicator size={'small'} color={colors.white} />
                  ) : (
                    <Text style={style.submitButtonText}>Change</Text>
                  )}
                </TouchableOpacity>
              </View>
              
            </DialogContent>

	         )  
      }
        
    }

export default ChangePassword