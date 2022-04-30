import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import style from './style';
import colors from '../../config/colors';
import DialogContent from '../../component/DialogContent';
import {CommonActions, useNavigation} from '@react-navigation/native';
import data from '../../component/DrawerContent/data';
import { WebView } from 'react-native-webview';
class WebViewUn extends React.Component {  
    constructor(props) {
        super(props);
        console.log(this.props);
        const data = this.props.route.params;   
        console.log("working",+data);
        
        //this.getAllWallet = this.getAllWallet.bind(this);
        //this.setInputValue = this.setInputValue.bind(this);
        this.state = {
            ref: null,
            //data : this.props.route.params.urlMM, 
        }
    }   
     closeButton = () => {
      this.props.navigation.goBack();
    }
   
		render() {   
	        return (
            <View style={{flex : 1}}>
      
              <WebView
                ref={this.state.ref}
                source={{ uri: this.props.route.params.urlMM }}
                style={{ marginTop: 20 }}
                originWhitelist={['*']}
                //injectedJavaScript={INJECTED_JAVASCRIPT}
                javaScriptEnabled={true}
                mixedContentMode={'always'}
                //allowFileAccessFromFileURLs= {true}
                //sharedCookiesEnabled={true}
                //onLoadEnd={INJECTED_JAVASCRIPT}
                //onLoadEnd={handleLoadEnd}
                
              />
              <Button title="Close" onPress={this.closeButton}/>
            </View>
	       )
    }
        
    }

export default WebViewUn