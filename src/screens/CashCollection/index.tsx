import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import style from './style';
import colors from '../../config/colors';
import DialogContent from '../../component/DialogContent';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../../redux/httpClient/slice';
import {
  selectGetAlCollectionType,
  selectGetAllMerchantList,
  selectGetAllPayeeList,
  selectCollectionServiceCollection,
} from '../../redux/httpClient/selectors';
import {collectionServiceCollection} from '../../redux/httpClient/api';
import get from 'lodash.get';
import {useEffect, useMemo, useState} from 'react';
import {
  getAlCollectionType,
  getAllMerchantList,
  getAllPayeeList,
} from '../../redux/httpClient/api';
import {selectAuth} from '../../redux/auth/selectors';
import SearchablePicker from '../../component/SearchablePicker';
import { WebView } from 'react-native-webview';
import HomeLayer from '../HomeLayer';

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
export default React.memo((props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data= props.route.params;
  console.log("check from cashCollection");
  console.log(data);
  const filterWallet= data.uID.walletName;
 /* if (data!=undefined || data!=null){
      const filterWallet= data.uID.walletName;
  }else {const filterWallet=""}*/

  const [formData, setFormData] = useState<FormData>({
    merchantId: undefined,
    payeeId: undefined,
    collectionType: undefined,
    invoiceNo: undefined,
    amount: undefined,
    walletType: undefined,
    reference1: undefined,
    reference2: undefined,
    reference3: undefined,
    collectionPin: undefined,
    payeePin: undefined,
  });
  
  
  const updateFormData = (key: string, value: any) => {
    setFormData((newFormData) => ({
      ...newFormData,
      [key]: value,
      ...(key === 'merchantId' ? {payeeId: undefined} : {}),
    }));
  };
  let urlMM='https://okwalletpayment.onebank.com.bd/okwalletepay/okepay/';
  const authData = useSelector(selectAuth);
  const getAllMerchantListData = useSelector(selectGetAllMerchantList);
  const getAllPayeeListData = useSelector(selectGetAllPayeeList);
  const getAlCollectionTypeData = useSelector(selectGetAlCollectionType);
  const collectionServiceCollectionData = useSelector(
    selectCollectionServiceCollection,
  );
  const merchants = get(
    getAllMerchantListData,
    'response.result.response[0]',
    [],
  ).map((ele: any) => {
    if (ele) {
      return {
        label: `${ele.name} (${ele.userId})`,
        value: ele.userId,
      };
    }
    return {};
  });
  
  const collectionType = get(
    getAlCollectionTypeData,
    'response.result.data',
    [],
  ).map((ele: any) => ({
    label: ele.collectionType,
    value: ele.id,
  }));
  const payees = useMemo(() => {
    return get(getAllPayeeListData, 'response.result.response[0]', [])
      .filter((ele: any) => {
        const isFound = ele?.taggedMerchantIds?.find(
          (merchant: any) => merchant?.merchantId === formData?.merchantId,
        );
        return !!isFound;
      })
      .map((ele: any) => ({
        label: `${ele.name} (${ele.userId})`,
        value: ele.userId,
      }));
  }, [formData.merchantId, getAllPayeeListData]);
  let walletTypes = [{"label":"MyCash", "value":"MyCash"},{"label":"Ok", "value":"Ok"},{"label":"General", "value":"General"}];
  
  /*if(filterWallet== "MyCash"){
    
    walletTypes = walletTypes.filter(function(item){
      return item.value == 'MyCash';
   }).map(function({label, value}){
       return {label, value};
   });
   console.log(walletTypes);
    console.log(walletTypes[0].value);
    formData.walletType= walletTypes[0].value;
  }
  else if(filterWallet== "Ok"){

    walletTypes = walletTypes.filter(function(item){
      return item.value == 'Ok';
   }).map(function({label, value}){
       return {label, value};
   });
   console.log(walletTypes);
    console.log(walletTypes[0].value);
    formData.walletType= walletTypes[0].value;
  }
  else {

    walletTypes = walletTypes.filter(function(item){
      return item.value == 'General';
   }).map(function({label, value}){
       return {label, value};
   });
   console.log(walletTypes);
    console.log(walletTypes[0].value);
    formData.walletType= walletTypes[0].value;
  }*/

  walletTypes = walletTypes.filter(function(item){
    return item.value == filterWallet;
 }).map(function({label, value}){
     return {label, value};
 });
 formData.walletType= walletTypes[0].value;
  useEffect(() => {
    if (authData?.userId) {
      dispatch(getAllMerchantList(authData?.userId));
      dispatch(getAlCollectionType());
      dispatch(getAllPayeeList(authData?.userId));
    }
    return () => {
      dispatch(
        actions.performDataCleanUp({
          correlationId: 'collectionServiceCollection',
        }),
      );
    };
  }, [authData, dispatch]);
  useEffect(() => {
    //Alert.alert(formData.walletType);
    if (formData.walletType != "Ok" && formData.walletType != undefined &&
      (collectionServiceCollectionData.response ||
      collectionServiceCollectionData.error)
    ) {
      const alertDef = [
        collectionServiceCollectionData.response && /*formData.walletType != "Ok" &&*/{
          title: 'Success',
          body: get(
            collectionServiceCollectionData.response,
            'result.message',
            'Cash Collection successful',
          ),
        },
        collectionServiceCollectionData.error &&{
          title: 'Failed',
          body: get(
            collectionServiceCollectionData.response,
            'result.message',             
            'Cash Collection Failed',
            
          )
        }, //Alert.alert(collectionServiceCollectionData.error.result.code),
      ].find((i) => i);
      if (alertDef) {
        Alert.alert(alertDef.title, alertDef.body);
        
      }
      if (collectionServiceCollectionData.response) {
        navigation.dispatch(CommonActions.goBack());
      }
      
    } if (formData.walletType== 'Ok' &&
    (collectionServiceCollectionData.response ||
    collectionServiceCollectionData.error)){
          if (collectionServiceCollectionData.response){
              urlMM=urlMM + collectionServiceCollectionData.response.result.message;
              Alert.alert(urlMM);
              navigation.navigate("WebView",{urlMM});
          }else{
            urlMM=urlMM + collectionServiceCollectionData.error.result.message;
            console.log(urlMM);
            navigation.navigate("WebView",{urlMM});
          }

      }
  }, [
    collectionServiceCollectionData.response,
    collectionServiceCollectionData.error,
    navigation,
    
  ]);
  const handleSubmit = () => {
    if (
      formData.merchantId &&
      formData.payeeId &&
      authData.userId &&
      formData.collectionType &&
      formData.walletType &&
      formData.invoiceNo &&
      formData.amount &&
      formData.collectionPin &&
      formData.payeePin
    ) {
      dispatch(
        collectionServiceCollection(
          formData.merchantId,
          formData.payeeId,
          authData.userId,
          formData.collectionType,
          formData.invoiceNo,
          formData.amount,
          formData.reference1 || '',
          formData.reference2 || '',
          formData.reference3 || '',
          formData.collectionPin,
          formData.payeePin,
          formData.walletType
        ),
      );
    }
    
    
  };
  return (
    <DialogContent>
      <View style={style.formBody}>
        <View style={style.formBodyInputWrapper}>
          <Text style={style.formInputLabel}>Merchant</Text>
          <SearchablePicker
            updateKey="merchantId"
            defaultValue={formData.merchantId}
            items={merchants}
            onChangeItem={updateFormData}
            searchablePlaceholder={'Select Merchant'}
          />
        </View>
        <View style={style.formBodyInputWrapper}>
          <Text style={style.formInputLabel}>Payee ID</Text>
          <SearchablePicker
            disabled={!formData.merchantId}
            updateKey="payeeId"
            defaultValue={formData.payeeId}
            items={payees}
            onChangeItem={updateFormData}
            searchablePlaceholder={'Select Payee'}
          />
        </View>
        <View style={style.formBodyInputWrapper}>
          <Text style={style.formInputLabel}>Wallet</Text>
          <SearchablePicker
            updateKey="walletType"
            defaultValue={walletTypes[0].value}
            items={walletTypes}
            onChangeItem={updateFormData}
            searchablePlaceholder={'Select Wallet'}
          />
        </View>
        <View style={style.formBodyInputWrapper}>
          <Text style={style.formInputLabel}>Collection type</Text>
          <SearchablePicker
            updateKey="collectionType"
            defaultValue={formData.collectionType}
            items={collectionType}
            onChangeItem={updateFormData}
            searchablePlaceholder={'Select Collection'}
          />
        </View>
        <View style={style.formBodyInputWrapper}>
          <Text style={style.formInputLabel}>Invoice No</Text>
          <TextInput
            style={style.formInput}
            value={formData.invoiceNo}
            onChangeText={(text) => {
              updateFormData('invoiceNo', text);
            }}
          />
        </View>
        <View style={style.formBodyInputWrapper}>
          <Text style={style.formInputLabel}>Amount</Text>
          <TextInput
            style={style.formInput}
            keyboardType={'number-pad'}
            value={formData.amount}
            onChangeText={(text) => {
              updateFormData('amount', text);
            }}
          />
        </View>
        <View style={style.formBodyInputWrapper}>
          <Text style={style.formInputLabel}>Reference 1</Text>
          <TextInput
            style={style.formInput}
            value={formData.reference1}
            onChangeText={(text) => {
              updateFormData('reference1', text);
            }}
          />
        </View>
        <View style={style.formBodyInputWrapper}>
          <Text style={style.formInputLabel}>Reference 2</Text>
          <TextInput
            style={style.formInput}
            value={formData.reference2}
            onChangeText={(text) => {
              updateFormData('reference2', text);
            }}
          />
        </View>
        <View style={style.formBodyInputWrapper}>
          <Text style={style.formInputLabel}>Reference 3</Text>
          <TextInput
            style={style.formInput}
            value={formData.reference3}
            onChangeText={(text) => {
              updateFormData('reference3', text);
            }}
          />
        </View>
        <View style={style.formBodyInputWrapper}>
          <Text style={style.formInputLabel}>Collection PIN</Text>
          <TextInput
            style={style.formInput}
            secureTextEntry={true}
            value={formData.collectionPin}
            onChangeText={(text) => {
              updateFormData('collectionPin', text);
            }}
          />
        </View>
        <View style={style.formBodyInputWrapper}>
          <Text style={style.formInputLabel}>Payee PIN</Text>
          <TextInput
            style={style.formInput}
            secureTextEntry={true}
            value={formData.payeePin}
            onChangeText={(text) => {
              updateFormData('payeePin', text);
            }}
          />
        </View>
        {/*<View style={style.uploadWrapper}>*/}
        {/*  <Text style={style.uploadText}>Upload document</Text>*/}
        {/*  <TouchableOpacity style={style.uploadButton}>*/}
        {/*    <Image*/}
        {/*      source={require('../../../assets/right-arrow.png')}*/}
        {/*      style={style.uploadIcon}*/}
        {/*    />*/}
        {/*    <Text style={style.uploadButtonText}>Upload</Text>*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
        <View style={style.buttonWrapper}>
          <TouchableOpacity
            style={style.cancelButton}
            onPress={() => {
              navigation.goBack();
            }}
            disabled={false}>
            <Text style={style.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.submitButton}
            onPress={handleSubmit}
            disabled={false}>
            {collectionServiceCollectionData.loading ? (
              <ActivityIndicator size={'small'} color={colors.white} />
            ) : (
              <Text style={style.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </DialogContent>
  );
});
