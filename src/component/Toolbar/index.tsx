import React, { useState } from 'react';
import {Image, Text, View,Alert,TouchableOpacity} from 'react-native';
import style from './style';
import {useSelector} from 'react-redux';
import {selectAuth} from '../../redux/auth/selectors';
import { Switch } from 'react-native-switch';
import get from 'lodash.get';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ToolBarProps {
  authResponse: object;
}

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.alertFun= this.alertFun.bind(this);
    this.state = {
      token:'',
      data: '',
      authUserId: '',
      userName: '',
      authResponse: '',
    }
  }

  alertFun() { Alert.alert('Profile  ' + '                                               ' 
  + 'Name : '+ this.state.authResponse.userName,'userId : '+this.state.authResponse.userId); } // right side image press Show data

  componentDidMount() {
            
    AsyncStorage.getItem('isLoggedInn').then((value2) => {
      AsyncStorage.getItem('userId').then((id) => {
        AsyncStorage.getItem('userName').then((userName) => {
          AsyncStorage.getItem('userPhone').then((userPhone) => {
            AsyncStorage.getItem('userImage').then((userImage) => {
              AsyncStorage.getItem('roleListName').then((roleListName) => {
                this.setState({token: JSON.parse(value2)});/// start from here
                this.setState({authUserId: JSON.parse(id)});
                this.setState({userName: JSON.parse(userName)});
                this.setState({authResponse :{
                  "token": JSON.parse(value2),
                  "userId": JSON.parse(id),
                  "userName": JSON.parse(userName),
                  "userPhone": JSON.parse(userPhone),
                  "userImage": JSON.parse(userImage),
                  "roleListName": JSON.parse(roleListName)
                }});
              })
            })
          })
        })
      })
    })
  }
   
  //const authData = useSelector(selectAuth);
  //const {userName, userPhone, userImage, roleList, userId} = authData || {};
  //const role = get(roleList, '[0].displayName', '');
  //const [balanceVisible, setbalanceVisible] = useState(false);
  //Alert.alert("Helob"+props.dataWallet.balance);
      render(){
        return (
          <View style={style.toolBar}>
            <View style={style.toolBarLogoWrapper}>
              <Image
                resizeMode={'contain'}
                source={require('../../../assets/logo.png')}
                style={style.logo}
              />
            </View>
            <View style={style.toolBarProfile}>
              <View style={style.toolBarProfileTextSection}>
                <Text style={style.toolBarProfileText} numberOfLines={1}>
                  {this.state.authResponse.userName}
                </Text>
                  <Text style={style.toolBarProfileText}>
                  {/*role*/}
                </Text>
                
                <View style={style.toolBarProfileWalletSection}>
                  {/*<Switch
                    //style={style.toolBarProfileWalletSection}
                    value={balanceVisible}
                    onValueChange={() => setbalanceVisible(!balanceVisible)}//{(val) => console.log(val)}
                    disabled={false}
                    activeText={props.dataWallet?props.dataWallet.balance+"BDT": ""}
                    inActiveText={'Balance'}
                    barHeight={30}
                    switchWidthMultiplier={4}
                    circleSize={25}
                    backgroundActive={'gray'}
                    backgroundInactive={'gray'}
                    circleActiveColor={'#30a566'}
                    circleInActiveColor={'#000000'}/>*/}
                  {/*<Image
                    resizeMode={'contain'}
                    style={style.toolBarWalletImg}
                    source={require('../../../assets/wallet-filled-money-tool.png')}
                  />
                <Text style={style.toolBarWalletText}>{userPhone}</Text>*/}
                </View>
              </View>
            
              <TouchableOpacity
                onPress={this.alertFun}   
              > 
              <Image
                style={style.toolBarProfilePic}
                resizeMode={'cover'}
                source={
                  this.state.authResponse.userImage ? {uri: this.state.authResponse.userImage} : require('../../../assets/man.png')
                }
              />
              </TouchableOpacity>
            </View>
          </View>
        );
      }
};

export default ToolBar;
