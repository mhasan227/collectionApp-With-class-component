import React, {useEffect} from 'react';
import {Alert, FlatList, View} from 'react-native';
import Tile from '../../../component/Tile';
import DialogContent from '../../../component/DialogContent';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiCall from '../../../networking/ApiCall';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../config/colors';
import style from "./style";
import {ROLE} from '../../../types';
import numeral from 'numeral';
import moment from 'moment-timezone';
import ListData from '../../../utility/ListData';

class CollectionListView extends React.Component {  
    constructor(props) {
        super(props);
        console.log(this.props);
        const data = this.props.route.params;
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
          list: [],
          convertList: [],
          role: '',
          test: [],
        }
    }   

        setInputValue(property, val) {
          this.setState({ [property]: val });
        }
        
 
        getAsyncStorage = async () =>{
          let token;
          let user;
          let role;
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
                this.show(token,user,role);
              });
            });
          });
        }
        show = async (token,userId,role) => {
          let vare;
          if (this.props.route.params.data=='Collection'){
            vare = await ListData.getCollectionData(token,userId,role);
          }
          else if (this.props.route.params.data=='Deposit'){
            vare = await ListData.getDepositData(token,userId,role);
          }
          this.setState({test: vare});
          //return vare;
        }
       async componentDidMount() {
          this.getAsyncStorage();
          console.log( this.state.authUserId);
        }

        tileOnPress = (item: any) => {
          return () => {
            this.props.navigation.navigate('ListingViewDetails', {
              data: item?.data || [],
            });
          };
        };

        getCollectionList = async () => {
          let body={"accountId": this.state.authUserId,
                   };
          let path='collection-service/endpoint/collection/accountId';
          console.log(this.state.token);
          let res = await ApiCall.api(body,this.state.token,path);
          console.log("data",res.result.result);
          this.setState({list: res.result.data});
          this.convertForProps();
        }
          convertForProps = async () => {
            
          
            console.log("datatyffggb",this.state.list);
            let modData= {};
            this.state.list.map((data)=>{
              const createdAt = moment(data.dateTime).format('llll');
				      let amountNumVal = numeral(data.amount).format('0,0.00');
              let role= this.state.role;
              const roleBasedHeading = [
                role === ROLE.CASHPOINT && {
                  rightHeading: `${data.merchantName}(C)`,
                  rightSubHeading: `${data.payeeName}(P)`,
                },
                role === ROLE.MERCHANT && {
                  rightHeading: `${data.cpName}(C)`,
                  rightSubHeading: `${data.payeeName}(P)`,
                },
                role === ROLE.PAYEE && {
                  rightHeading: `${data.merchantName}(M)`,
                  rightSubHeading: `${data.cpName}(C)`,
                },
                {},
              ].find((i) => i);
              const roleBasedData = [
                role === ROLE.CASHPOINT && [
                  {
                    label: 'Merchant Name',
                    value: data.merchantName,
                  },
                  {
                    label: 'Merchant ID',
                    value: data.merchantId,
                  },
                  {
                    label: 'Payee Name',
                    value: data.payeeName,
                  },
                  {
                    label: 'Payee ID',
                    value: data.payeeId,
                  },
                ],
                role === ROLE.MERCHANT && [
                  {
                    label: 'Cash Point Name',
                    value: data.cpName,
                  },
                  {
                    label: 'Cash Point ID',
                    value: data.cashPointId,
                  },
                  {
                    label: 'Payee Name',
                    value: data.payeeName,
                  },
                  {
                    label: 'Payee ID',
                    value: data.payeeId,
                  },
                ],
                role === ROLE.PAYEE && [
                  {
                    label: 'Merchant Name',
                    value: data.merchantName,
                  },
                  {
                    label: 'Merchant ID',
                    value: data.merchantId,
                  },
                  {
                    label: 'Cash Point Name',
                    value: data.cpName,
                  },
                  {
                    label: 'Cash Point ID',
                    value: data.cashPointId,
                  },
                ],
                [],
              ].find((i) => i);

                modData={
                  title: `BDT ${amountNumVal} (${data.decision})`,
					        subTitle: moment(data.dateTime).format('llll'),
                  ...roleBasedHeading,
                  data: [
                    {
                      label: 'Amount',
                      value: amountNumVal,
                    },
                    {
                      label: 'Status',
                      value: data.decision,
                    },
                    {
                      label: 'Created At',
                      value: createdAt,
                    },
                    // @ts-ignore
                    ...roleBasedData,
                    {
                      label: 'Collection Type',
                      value: data.collectionTypeName,
                    },
                    {
                      label: 'Invoice / Receipt',
                      value: data.invoiceNo,
                    },
                    {
                      label: 'Reference 1',
                      value: data.reference1,
                    },
                    {
                      label: 'Reference 2',
                      value: data.reference2,
                    },
                    {
                      label: 'Reference 3',
                      value: data.reference3,
                    },
                    {
                      label: 'Transaction ID',
                      value: data.transactionEngineId,
                    },
                  ],
                }
              this.state.convertList.push(modData);
            });
            
          }
		render() {   
      //this.props.route.params?this.props.route.params.data : null
	        return (
            <DialogContent style={{flex : 1, backgroundColor: 'red'}}>
	            <View
                style={{
                  marginVertical: 16,
                  marginHorizontal: 16,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: colors.bottom,
                  borderRadius: 12,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: colors.white,
                  }}>
                  {this.props.route.params.data} Activity
                </Text>
              </View>
              <FlatList
                keyExtractor={(item, index) => `${index}`}
                ListEmptyComponent={() => (
                  <View style={{padding: 32, alignItems: 'center'}}>
                    <Text style={{fontSize: 18}}>No Activity</Text>
                  </View>
                )}
                ItemSeparatorComponent={({highlighted}) => (
                  <View
                    style={[
                      {height: 1, backgroundColor: '#ddd'}, //#ddd
                      highlighted && {marginLeft: 0},
                    ]}
                  />
                )}
                data={this.state.test}
                renderItem={  ({item}) =>  
                <Tile {...item} onPress={this.tileOnPress(item)} style={{color: colors.white}}/>}
              />
            </DialogContent>
	       )
    }
        
    }

export default CollectionListView