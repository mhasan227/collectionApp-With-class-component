import React from 'react' ;
import { View, Text, Button, ScrollView,Image} from 'react-native' ;
import style from "./style";
import DialogContent from "../../component/DialogContent";

class SignUpFirstStep extends React.Component {
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
                <Text style={style.title}>Sign-Up Option</Text>
                <Text style={style.subTitle}>Select your sign-up option</Text>
                <Button
                    title="MERCHANT SIGN-UP"
                    onPress={() => {
                    this.props.navigation.navigate('SignUpSecondStep');
                    }}
                    variant={'contained'}
                    color={'primary'}
                    style={style.button}
                />
                <Button
                    title="CASHPOINT SIGN-UP"
                    onPress={() => {}}
                    variant={'outlined'}
                    color={'primary'}
                    style={style.button}
                />
                <Button
                    title="CUSTOMER SIGN-UP"
                    onPress={() => {}}
                    variant={'outlined'}
                    color={'primary'}
                    style={style.button}
                />
            </ScrollView>
       )
    }
}

export default SignUpFirstStep