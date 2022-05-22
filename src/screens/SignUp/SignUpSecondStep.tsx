import React from 'react' ;
import { View, Text, Button, ScrollView,Image, TextInput} from 'react-native' ;
import style from "./style";
import DialogContent from "../../component/DialogContent";
import colors from '../../config/colors';
import {IconButton} from '../../component/IconButton';
class SignUpSecondStep extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);  
        }
    render() {   
        return (
            <ScrollView contentContainerStyle={style.root}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={style.logo}
                    resizeMode={'contain'}
                />
                <Text style={style.subTitleLarge}>Enter Mobile Number for</Text>
                <Text style={[style.title, {marginBottom: 30}]}>Sign Up</Text>
                <View style={style.numberInputWrapper}>
                    <View style={style.numberInputPrefix}>
                    <Text style={style.numberInputPrefixText}>+88</Text>
                    </View>
                    <TextInput style={style.numberInput} keyboardType="phone-pad" />
                </View>
                <Text style={style.helperText}>
                    By proceeding you agree to our{' '}
                    <Text style={{color: colors.primary, textDecorationLine: 'underline'}}>
                    Terms and Conditions
                    </Text>
                </Text>
                <View style={style.buttonFooterRow}>
                    <IconButton
                    title="Back"
                    onPress={() => {
                        this.props.navigation.navigate('SignUpFirstStep');
                    }}
                    variant="outlined"
                    color="primary"
                    icon="prev-arrow"
                    />
                    <IconButton
                    title="Next"
                    onPress={() => {
                        this.props.navigation.navigate('SignUpThirdStep');
                    }}
                    variant="contained"
                    color="primary"
                    icon="next-arrow"
                    />
                </View>
            </ScrollView>
       )
    }
}

export default SignUpSecondStep