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

class MMCashout extends React.Component {  
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
          amount: '',
          agentIndex: '',
          reference: '',
          comments: '',
          pin: '',
          currency: '',
          agent: [],
          getAllagent: [],
          MMCashoutLoading: false,
        }

      }
        setInputValue(property, val) {
          this.setState({ [property]: val });
        }
        onScreenFocus = () => {
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
              this.getAllAgentListDataMM();
            });
          });
        }
       async componentDidMount() {
          //this.props.navigation.addListener('focus', this.onScreenFocus);
          this.getAsyncStorage();
        }
        
        sendvalue=(key , value) => {
          this.setState({[key]: value});
        }
        getAllAgentListDataMM = async () => {
          
          let body={"accountId": this.state.authUserId,
                   };
          let path='authorization-service/endpoint/user/agent';
          console.log("transfer 2",this.state.authUserId);
          let res = await ApiCall.api(body,this.state.token,path);
          console.log(res.result.response[0]);
          console.log(res);
          this.setState({agent: res.result.response[0]});
          let Agents= res.result.response[0].map((val,index)=>({label: val.name + ' (' + val.userId + ')',
          value: `${index}`,}));
          console.log(Agents);
          this.setState({getAllagent: Agents});
        }
        handleSubmit = async () => {
          this.setState({MMCashoutLoading: true});
          let token=this.state.token;
          const { amount,
                  agentIndex,
                  pin,
                  authUserId,
                  agent,
                 }= this.state;
                 //Alert.alert(agent[agentIndex].userId);
          if (amount && pin && authUserId && agentIndex){
              //Alert.alert(token);
              let body={
                        agentId:agent[agentIndex].userId,
                        merchantId: authUserId,
                        cashoutMerchantRequestAmount: amount,
                        merchantWalletPIN: pin
                   };
              
              let path='collection-service/endpoint/cashout';
              let res = await ApiCall.api(body,token,path);
              this.setState({MMCashoutLoading: false});
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
                Get Cash
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
                <Text style={style.formInputLabel}>Agent</Text>
                <SearchablePicker
                  updateKey="agentIndex"
                  defaultValue={this.state.agentIndex}
                  items={this.state.getAllagent}
                  onChangeItem={this.sendvalue}
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
                  disabled={this.state.MMCashoutLoading}>
                  {this.state.MMCashoutLoading ? (
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

export default MMCashout