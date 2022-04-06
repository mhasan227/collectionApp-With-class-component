import React from 'react' ;
import { View, Text , StyleSheet, Button,StatusBar,TouchableOpacity,DrawerLayoutAndroid, Alert,BackHandler} from 'react-native' ;



class InformationScreen extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);  
        }
    render() {   
        return (
            <View>
                <Text style={styles.temp}>Hello homepage 2</Text>
                <Button style={styles.button} title='PressRoute' onPress={()=>this.props.navigation.navigate("HomeScreen")}></Button>
            </View>
          
       )
    }
}
const styles = StyleSheet.create({
    temp: {
        textAlign: 'center',
        paddingTop: 50,
        fontSize: 20,
    },
});

export default InformationScreen