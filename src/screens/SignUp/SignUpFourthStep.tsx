import React from 'react' ;
import { View, Text, Button, ScrollView,Image, TextInput, TouchableOpacity, Alert} from 'react-native' ;
import style from "./style";
import DialogContent from "../../component/DialogContent";

class SignUpFourthStep extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);  
        this.state = {
            password: '',
            confirmPassword: '',
            loading: false,
          }
        }

        setPassword = (text) => {
            this.setState({ password: text });
          }
        setConfirmPassword = (text) => {
            this.setState({ confirmPassword: text });
          }
          setLoading = (text) => {
            this.setState({ loading: text });
          }
        handleSubmit = async () => {
            const {password,
                   confirmPassword
                  }= this.state
            if (password && confirmPassword && password === confirmPassword) {
                this.setLoading(true);
                const rawResponse = await fetch('https://httpbin.org/post', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({password}),
                });
                const content = await rawResponse.json();
                this.setLoading(false);
                Alert.alert('Response', JSON.stringify(content, null, 4));
              } else {
                Alert.alert('Failed', "You've entered wrong value");
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
                <Text style={style.title}>Set Password</Text>
                <Text style={[style.subTitle, {width: '50%', textAlign: 'center'}]}>
                    Set your Maxis password Don't share with anyone
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
                    placeholder="New Password"
                    onChangeText={(text) => this.setPassword(text)}
                    secureTextEntry={true}
                    />
                </View>
                <View style={style.iconTextInputWrapper}>
                    <View style={style.iconTextInputIconWrapper}>
                    <Image
                        style={style.iconTextInputIcon}
                        source={require('../../../assets/padlock.png')}
                    />
                    </View>
                    <TextInput
                    style={style.iconTextInput}
                    placeholder="Confirm Password"
                    onChangeText={(text) => this.setConfirmPassword(text)}
                    secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity
                    style={style.submitButton}
                    onPress={this.handleSubmit}
                    disabled={this.state.loading}>
                    {this.state.loading ? (
                    <ActivityIndicator size={'small'} color={colors.white} />
                    ) : (
                    <Text style={style.submitButtonText}>Submit</Text>
                    )}
                </TouchableOpacity>
                <View style={style.contactUsSection}>
                    <Text style={style.contactUsSectionTitle}>Contact Us</Text>
                    <View style={style.contactUsItemWrapper}>
                    <TouchableOpacity style={style.contactUsItem}>
                        <Image
                        style={style.contactUsItemImage}
                        source={require('../../../assets/headphones.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.contactUsItem}>
                        <Image
                        style={style.contactUsItemImage}
                        source={require('../../../assets/headphones.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.contactUsItem}>
                        <Image
                        style={style.contactUsItemImage}
                        source={require('../../../assets/headphones.png')}
                        />
                    </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
       )
    }
}

export default SignUpFourthStep