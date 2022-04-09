import React from 'react' ;
import { View, Text , StyleSheet, Button,StatusBar,TouchableOpacity,DrawerLayoutAndroid, Alert,BackHandler} from 'react-native' ;
import style from "./style";
import DialogContent from "../../component/DialogContent";

class InformationScreen extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);  
        }
    render() {   
        return (
            <DialogContent style={{flex : 1, backgroundColor: 'red'}}>
                <View>
                    <Text style={style.temp}>Hello homepage 2</Text>
                    <Button style={style.button} title='PressRoute' onPress={()=>this.props.navigation.navigate("HomeScreen")}></Button>
                </View>
            </DialogContent>
       )
    }
}

export default InformationScreen