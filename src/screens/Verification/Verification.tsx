import React from 'react' ;
import { ScrollView,View, Text , TextInput, Button,Image,TouchableOpacity,DrawerLayoutAndroid, Alert,BackHandler} from 'react-native' ;
import style from "./style";
import ApiCall from '../../networking/ApiCall';
import ContactUsBand from '../../component/ContactUsBand';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import colors from '../../config/colors';
class Verification extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);  
        this.state = {
            pin: '',
            ref: null,
            verifyLoading: false,
          }

        }
    setPin = (text) => {
        this.setState({ pin: text });
     }
    handleSubmit = async () => {
        this.setState({ verifyLoading: true });
        const {pin}= this.state;
        if (pin.length === 4 && this.props.route.params) {
            let body={
                otpValidationId: this.props.route.params,
                otpValue: pin ,
           };
            let path='authorization-service/endpoint/submit-otp';
            let res = await ApiCall.apiNoToken(body,path);
            console.log(res);
            
            this.setState({ verifyLoading: false });
            if(res.result.result === 'Success'){
                this.props.navigation.navigate("SignIn");
            }else{
                Alert.alert("Failed");
            }
        } else {
            Alert.alert('Failed', 'Field can not be blank');
          }
    }
        
    render() {   
        return (
            <ScrollView contentContainerStyle={style.root}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={style.logo}
                    resizeMode={'contain'}
                />
                <Text style={style.title}>Verification</Text>
                <Text
                    style={[
                    style.subTitle,
                    {width: '80%', textAlign: 'center', marginTop: 16},
                    ]}>
                    Enter the verification code
                </Text>
                <SmoothPinCodeInput
                    containerStyle={{
                    marginBottom: 24,
                    }}
                    codeLength={4}
                    cellSize={54}
                    cellSpacing={18}
                    textStyle={{
                    color: '#000',
                    }}
                    cellStyle={{
                    borderWidth: 1,
                    borderColor: colors.primary,
                    backgroundColor: colors.lighterPrimary,
                    }}
                    cellStyleFocused={{
                    borderColor: '#b70255',
                    }}
                    ref={this.state.ref}
                    value={this.state.pin}
                    onTextChange={(code: any) => this.setPin(code)}
                    //onFulfill={onCheckCode}
                />
                <View style={style.resendHelper}>
                    <Text>if you didn't receive a code</Text>
                    <TouchableOpacity style={style.resendButton}>
                    <Text style={style.resendButtonText}>Resend</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={style.submitButton}
                    onPress={this.handleSubmit}
                    disabled={this.state.verifyLoading}>
                    {this.state.verifyLoading ? (
                    <ActivityIndicator size={'small'} color={colors.white} />
                    ) : (
                    <Text style={style.submitButtonText}>Verify</Text>
                    )}
                </TouchableOpacity>
                <ContactUsBand />
            </ScrollView>
       )
    }
}

export default Verification