import React, {ReactNode} from 'react';
import {Alert, View} from 'react-native';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import style from './style';
import ToolBar from '../Toolbar';
import config from '../../../config';
import {getWalletByUserId} from '../../redux/httpClient/api';
import {selectAuth} from '../../redux/auth/selectors';
import get from 'lodash.get';
import Icon from 'react-native-vector-icons/Ionicons';
import {selectGetWalletByUserId} from '../../redux/httpClient/selectors';
import {
  DrawerActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';

interface Props {
  disableScroll?: boolean;
  children: ReactNode;
  authResponse: object
}

const DialogContent = (props: Props) => {
  const dispatch = useDispatch();
  const authData = useSelector(selectAuth);

  useEffect(() => {
    if (authData?.userId) {
      dispatch(getWalletByUserId(authData?.userId));
    }
  }, [authData.userId, dispatch]);

  const getWalletByUserIdData = useSelector(selectGetWalletByUserId);
  const wallets = get(getWalletByUserIdData, 'response.result.data', []).filter(
    (ele: any) => ele.walletType === 'General',
  );


  async function handleOnClickOfWallet ()
  {
    const walletPin = "";
    const transactionAccountId = wallets[0].transactionAccountId;
    const token = get(authData, 'authResponse.id_token', '');
    if (transactionAccountId && token) {
      const rawResponse = await fetch(
        `${config.API_HOST}/collection-service/endpoint/wallet/balance`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: `Bearer ${token}`,
          },
          body: JSON.stringify({transactionAccountId, walletPin}),
        },
      );
      const content = await rawResponse.json();
      Alert.alert('Wallet Balance', content?.result?.message);
    }
    else
    {
      Alert.alert('Wallet ', wallets[0].transactionAccountId, wallets[0].walletPin);
    }

  };

  const navigation = useNavigation();
  return (
    <View style={style.root}>
      <ToolBar authResponse={props.authResponse} /> 
      {props.disableScroll ? (
        <View style={{flex: 1}}>{props.children}</View>
      ) : (
        <ScrollView>{props.children}</ScrollView>
      )}
      <View style={style.bottomToolbar}>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}>
          <Image
            style={style.bottomToolbarIcon}
            source={require('../../../assets/menu.png')}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          //style={style.bottomToolbarImageWrapper}
          onPress={() => {navigation.dispatch(StackActions.push('DrawerStack', {}));}}
        >
          {/*<Image
            style={style.bottomToolbarImage}
            source={require('../../../assets/home-page.png')}
            resizeMode={'contain'}
          />*/}
                        <Icon 
                          name='home'
                          size={30}
                          color='#fff'
                    
                          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {handleOnClickOfWallet(); }}   
        > 

                        <Icon 
                          name='md-wallet-outline'
                          size={30}
                          color='#fff'
                    
                          />
          {/*<Image
            style={style.bottomToolbarIcon}
            source={require('../../../assets/mail-inbox-app.png')}
            resizeMode={'contain'}
          />*/}
        </TouchableOpacity>

      </View>
    </View>
  );
};
export default DialogContent;
