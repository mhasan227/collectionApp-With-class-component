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
import HomeLayer from '../HomeLayer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from "react-native-custom-dropdown";

class CPSell extends React.Component {  
    constructor(props) {
        super(props);
        console.log(this.props);
        //const data = this.props.route.params;
        this.setInputValue = this.setInputValue.bind(this);
        
        this.state = {
          token:'',
          data: '',
          authUserId: '',
          userName: '',
          authResponse: '',
          pin: "",
          amount: "",
          CPSellLoading: false,
        }

      }
        setInputValue(property, val) {
          this.setState({ [property]: val });
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
            });
          });
        }
        componentDidMount() {
          this.getAsyncStorage();
        }
        
        sendvalue=(key , value) => {
          this.setState({[key]: value});
        }
        
        handleSubmit = async () => {
          this.setState({CPSellLoading: true});
          let token=this.state.token;
          const { pin,
                  amount,
                  authUserId,
                 }= this.state;
          console.log("imp",authUserId);
          if (amount&& authUserId && pin){
              let body={agentId: authUserId,
                        transferAmount: amount,
                        walletPin: pin
                   };
              let path='collection-service/endpoint/wallet/transfer/agent-dse';
              let res = await ApiCall.api(body,token,path);
              this.setState({CPSellLoading: false});
              console.log(res);
              if (res.result.result== 'Success'){
                  Alert.alert("Successful");
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
            <View style={style.formBody}>
              <Text style={style.formBodyTitle}>
                Return to Cashpoint
              </Text>
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
                <Text style={style.formInputLabel}>PIN</Text>
                <TextInput
                  style={style.formInput}
                  value={this.state.pin}
                  onChangeText={(text) => this.setInputValue('pin', text)}
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
                    disabled={this.state.CPSellLoading}>
                    {this.state.CPSellLoading ? (
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

export default CPSell