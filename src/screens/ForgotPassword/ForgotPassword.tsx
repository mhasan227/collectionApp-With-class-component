import React from 'react' ;
import { ScrollView,View, Text , TextInput, Button,Image,TouchableOpacity,DrawerLayoutAndroid, Alert,BackHandler} from 'react-native' ;
import style from "./style";
import ApiCall from '../../networking/ApiCall';
class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);  
        this.state = {
            username: '',
            rsLoading: false,
          }

        }
    setUsername = (text) => {
        this.setState({ username: text });
     }
    handleSubmit = async () => {
        this.setState({ rsLoading: true });
        const {username}= this.state;
        if (username) {
            let body={
                userId: username,
           };
            let path='authorization-service/endpoint/generate-otp';
            let res = await ApiCall.apiNoToken(body,path);
            console.log(res);
            let otpValidationId= res.result.otpValidationId;
            this.setState({ rsLoading: false });
            if(res.result.otpValidationId){
                this.props.navigation.navigate("Verification",{otpValidationId});
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
                <Text style={style.title}>Forgot Password</Text>
                <Text
                    style={[
                    style.subTitle,
                    {width: '80%', textAlign: 'center', marginTop: 16},
                    ]}>
                    Please provide a valid userid to reset your password
                </Text>
                <View style={style.iconTextInputWrapper}>
                    <View style={style.iconTextInputIconWrapper}>
                    <Image
                        style={style.iconTextInputIcon}
                        source={require('../../../assets/padlock.png')}
                    />
                    </View>
                    <TextInput
                    style={style.iconTextInput}
                    placeholder="Username"
                    onChangeText={(text) => this.setUsername(text)}
                    />
                </View>
                <TouchableOpacity
                    style={style.submitButton}
                    onPress={this.handleSubmit}
                    disabled={this.state.rsLoading}>
                    {this.state.rsLoading ? (
                    <ActivityIndicator size={'small'} color={colors.white} />
                    ) : (
                    <Text style={style.submitButtonText}>Next</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
       )
    }
}

export default ForgotPassword