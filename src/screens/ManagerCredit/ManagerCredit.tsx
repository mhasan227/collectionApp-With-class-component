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

class ManagerCredit extends React.Component {  
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
          toUserId: "",
          transferAmount: "",
          manager: [],
          getAllManager: [],
          transferType: 'TRANSFER_TYPE_GENERAL_DISTRIBUTOR_GENERAL_MANAGER',
          ManagerLoading: false,
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
              this.getAllMerchantListData();
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
        getAllMerchantListData = async () => {
          let path='authorization-service/endpoint/user/get-all-managers';
          console.log(this.state.token);
          let res = await ApiCall.apiget(this.state.token,path);
          this.setState({manager: res.result.response}); 
          let managers= res.result.response.map((val)=>({label: `${val.name} (${val.userId})`,
            value: val.userId,}));
          this.setState({getAllManager: managers});
        }
        
        handleSubmit = async () => {
          this.setState({BHLoading: true});
          let token=this.state.token;
          const { toUserId,
                  transferAmount,
                  authUserId,
                  transferType
                 }= this.state;
          if (transferAmount&& authUserId && toUserId){
              //Alert.alert(token);
              let body={userId: authUserId,
                        toUserId,
                        transferAmount,
                        transferType
                   };
              let path='collection-service/endpoint/wallet/transfer-by-type';
              let res = await ApiCall.api(body,token,path);
              this.setState({BHLoading: false});
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
                Maxis Manager Credit Point Transfer
              </Text>
              <View style={style.formBodyInputWrapper}>
                <Text style={style.formInputLabel}>Manager</Text>
                <SearchablePicker
                  updateKey="toUserId"
                  defaultValue={this.state.toUserId}
                  items={this.state.getAllManager}
                  onChangeItem={this.sendvalue}
                  searchablePlaceholder={'Select Manager'}
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
                  disabled={this.state.ManagerLoading}>
                  {this.state.ManagerLoading ? (
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

export default ManagerCredit