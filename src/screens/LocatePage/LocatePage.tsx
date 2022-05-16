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

//let urlMM='https://okwalletpayment.onebank.com.bd/okwalletepay/okepay/';

class LocatePage extends React.Component {  
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
          status: '',
          photo: '',
          transportationMode: '',
          fare: '',
          area: '',
          longitude: '',
          latitude: '',
          pictureB64: '',
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
              this.requestLocationPermission();
            });
          });
        }
       async componentDidMount() {
          //this.props.navigation.addListener('focus', this.onScreenFocus)
          //this.setInputValue('currency',this.props.route.params.uID.walletName);
          this.requestLocationPermission();
          this.requestCameraPermission();
          this.getAsyncStorage();
          //this.getAllWalletListData();
          //this.getAllPayeeListData();
          //this.getAllCollectionListData();
        }
        
        sendvalue=(key , value) => {
          this.setState({[key]: value});
        }
        setLocationStatus = (visible) => {
          this.setState({ status: visible });
        }
        setCurrentLongitude = (visible) => {
          this.setState({ longitude: visible });
        }
        setCurrentLatitude = (visible) => {
          this.setState({ latitude: visible });
        }
        requestCameraPermission = async () => {
        
          try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            //getOneTimeLocation();
            //subscribeLocationLocation();
            } else {
            //setLocationStatus('Permission Denied');
            }
          } catch (err) {
            console.warn(err);
          }
          
        };
        requestLocationPermission = async () => {
      
          try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            this.getOneTimeLocation();
            this.subscribeLocationLocation();
            } else {
              this.setLocationStatus('Permission Denied');
            }
          } catch (err) {
            console.warn(err);
          }
          
        };

        subscribeLocationLocation = () => {
          watchID = Geolocation.watchPosition(
            (position) => {
            //Will give you the location on location change
            
            this.setLocationStatus('You are Here');
            console.log(position);
        
            //getting the Longitude from the location json        
            const longitude =
              JSON.stringify(position.coords.longitude);
        
            //getting the Latitude from the location json
            const latitude = 
              JSON.stringify(position.coords.latitude);
        
            //Setting Longitude state
            this.setCurrentLongitude(longitude);
        
            //Setting Latitude state
            this.setCurrentLatitude(latitude);
            },
            (error) => {
            //setLocationStatus(error.message);
            Alert.alert("please turn on your GPS");
            },
            {
            enableHighAccuracy: false,
            maximumAge: 1000
            },
          );
          };

        getOneTimeLocation = () => {
          let longWeb;
          let latWeb;
          
          this.setLocationStatus('Getting Location ...');
          Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
            this.setLocationStatus('You are Here');
        
            //getting the Longitude from the location json
            const longitude = 
              JSON.stringify(position.coords.longitude);
        
            //getting the Latitude from the location json
            const latitude = 
              JSON.stringify(position.coords.latitude);
        
            //Setting Longitude state
            this.setCurrentLongitude(longitude);
            
            //Setting Longitude state
            this.setCurrentLatitude(latitude);
            },
            (error) => {
            //setLocationStatus("");
            Alert.alert("please turn on your GPS");
            },
            {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
            },
          );
            
            //const urlMap='http://maps.google.com/maps/place/28.69875679999999,77.29257710000002';
            //const test= 'geo:'+latWeb+','+longWeb;
            //Linking.openURL(urlMap);
            //Alert.alert(urlMap);
            //navigation.navigate("WebView",{urlMap});
          };

          getMapViewLocation = () => {
            let longWeb=this.state.longitude;
            let latWeb=this.state.latitude;
            const urlMap="https://www.google.com/maps?q="+latWeb+","+longWeb; 
            Linking.openURL(urlMap);
          }
          launchCamera = () => {
            let options = {
              includeBase64: true,
              maxWidth: 300, 
              maxHeight: 300,
              quality: 0.8,
              videoQuality: 'low',
              mediaType: "photo",
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
            };
            ImagePicker.launchCamera(options, (response) => {
              console.log('Response = ', response);
        
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
              } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                this.setState({
                  filePath: response,
                  fileData: response.data,
                  fileUri: response.assets[0].uri,
                  photo: response.assets[0].base64,
                  pictureB64: `data:image/jpeg;base64,${response.assets[0].base64}`,
                });
                //this.state.allSavedImage.push(this.state.fileUri);
                //console.log('allData', this.state.allSavedImage);
              }
            });
        
          }
          
        handleSubmit = async () => {
          
          this.setState({attandanceloading: true});
          let token=this.state.token;
          const { transportationMode,
                  fare,
                  area,
                  longitude,
                  latitude,
                  pictureB64,
                  authUserId,
                 }= this.state;
          console.log("imp",authUserId);
          console.log("imp",transportationMode);

          //Alert.alert(transferType);
          if (transportationMode && fare && area && longitude && authUserId){
              //Alert.alert(token);
              let body={
                        transportationMode,
                        fare,
                        area,
                        userId: authUserId,
                        pictureB64,
                        longitude,
                        latitude
                        };
              //Alert.alert(walletPin);
              let path='collection-service/endpoint/attendance/new-entry-app';
              let res = await ApiCall.api(body,token,path);
              this.setState({attandanceloading: false});
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

        renderFileUri() {
          if (this.state.photo) {
            return <Image
              source={{ uri: `data:image/jpeg;base64,${this.state.photo}` }}
              style={{ width: 200, height: 200 }}
            />
          } else {
            return <Image
            source={require('../../../assets/dummy.png')}
            style={{ width: 200, height: 200 }}
            />
          }
        }
    
		  render() {         
        const transport = [
          { label: "Bus", value: 'Bus' },
          { label: "Bike", value: 'Bike' },
          { label: "Walk", value: 'Walk' },
          { label: "Rickshaw", value: 'Rickshaw' }];
	        return (
            <DialogContent>  
              <View style={style.formBody}>
                <Text style={style.formBodyTitle}>
                  Save Attendance
                </Text>
                {/*<TouchableOpacity
                        style={style.submitButton}
                        onPress={selectOneFile}
                        disabled={topUpRider.loading}>
                        {topUpRider.loading ? (
                          <ActivityIndicator size={'small'} color={colors.white} />
                        ) : (
                          <Text style={style.submitButtonText}>Choose a File</Text>
                        )}
                  </TouchableOpacity>

                  <TouchableOpacity
                        style={style.submitButton}
                        onPress={uploadFile}
                        disabled={topUpRider.loading}>
                        {topUpRider.loading ? (
                          <ActivityIndicator size={'small'} color={colors.white} />
                        ) : (
                          <Text style={style.submitButtonText}>upload</Text>
                        )}
                  </TouchableOpacity>
                        
                  {<Text style={styles.textStyle}>
                  File Name: {fileUploadRes.fileName ? fileUploadRes.fileName : ''}
                  {'\n'}
                  Time: {fileUploadRes.createdLocalDateTime ? fileUploadRes.createdLocalDateTime : ''}
                  {'\n'}
                  File code: {fileUploadRes.fileCode ? fileUploadRes.fileCode : ''}
                  {'\n'}
                  URI: {fileUploadRes.fileURL ? fileUploadRes.fileURL : ''}
                  {'\n'}
                        </Text>*/}
                  <TouchableOpacity
                     style={style.submitButton}
                     onPress={this.launchCamera}
                  >
                     <Text style={style.submitButtonText}>Camera</Text>  
                  </TouchableOpacity>
                  <View style={{marginTop: 10,marginBottom: 10, alignItems: 'center'}}>
                        
                      {this.renderFileUri()}
                          {/*<Image
                          source={{ uri: `data:image/jpeg;base64,${this.state.photo}`}}
                          style={ { width: 200, height: 200,  } }
                      />*/}
                     
                  </View>
                  <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Veichle</Text>
                  <SearchablePicker
                    updateKey="transportationMode"
                    defaultValue={this.state.transportationMode}
                    items={transport}
                    onChangeItem={this.sendvalue}
                    searchablePlaceholder={'Select Options'}
                  />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Fare</Text>
                  <TextInput
                    style={style.formInput}
                    placeholder='Enter Amount'
                    keyboardType={'number-pad'}
                    value={this.state.fare}
                    onChangeText={(text) => this.setInputValue('fare', text)}
                  />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Area</Text>
                  <TextInput
                    style={style.formInput}
                    placeholder='Enter Area'
                    //keyboardType={'number-pad'}
                    value={this.state.area}
                    onChangeText={(text) => this.setInputValue('area', text)}
                  />
                </View>
                      <Text
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 16,
                        }}>
                        Longitude: {this.state.longitude}
                      </Text>
                  <Text
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 16,
                    }}>
                    Latitude: {this.state.latitude}
                  </Text>
                  
                  <View style={{marginTop: 20,flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{width: "40%"}}>
                        <Button
                          title="Locate"
                          onPress={this.getOneTimeLocation}
                          color={colors.primary}
                          
                        />
                    </View>
                    <View style={{width: "40%"}}>
                        <Button
                          title="Map View"
                          onPress={this.getMapViewLocation}
                          color={colors.primary}
                        />
                    </View>
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
                    disabled={this.state.attandanceloading}>
                    {this.state.attandanceloading ? (
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

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      boldText: {
        fontSize: 25,
        color: 'red',
        marginVertical: 16,
      },
      textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        color: 'black',
      },
      });

export default LocatePage