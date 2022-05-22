import React from 'react' ;
import { View, Text , TextInput, Button,Image,TouchableOpacity,DrawerLayoutAndroid, Alert} from 'react-native' ;
import style from "./style";
import DialogContent from "../../component/DialogContent";

class Exchange extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);  
        }
    handleSubmit = async () => {}
    render() {   
        return (
            <DialogContent>
                <View style={style.formBody}>
                    <View style={style.formBodyInputWrapper}>
                    <Text style={style.formInputLabel}>Exchange With* </Text>
                    <TextInput style={style.formInput} />
                    </View>
                    <View style={style.formBodyInputWrapper}>
                    <Text style={style.formInputLabel}>Number</Text>
                    <TextInput style={style.formInput} />
                    </View>
                    <View style={style.formBodyInputWrapper}>
                    <Text style={style.formInputLabel}>Bank</Text>
                    <TextInput style={style.formInput} />
                    </View>
                    <View style={style.formBodyInputWrapper}>
                    <Text style={style.formInputLabel}>Ref/Check</Text>
                    <TextInput style={style.formInput} keyboardType={'number-pad'} />
                    </View>
                    <View style={style.uploadWrapper}>
                    <Text style={style.uploadText}>
                        Document
                    </Text>
                    <TouchableOpacity style={style.uploadButton}>
                        <Image
                        source={require('../../../assets/right-arrow.png')}
                        style={style.uploadIcon}
                        />
                        <Text style={style.uploadButtonText}>Upload</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={style.buttonWrapper}>
                    <TouchableOpacity
                        style={style.cancelButton}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        disabled={false}>
                        <Text style={style.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.submitButton}
                        onPress={this.handleSubmit}
                        disabled={false}>
                        {false ? (
                            <ActivityIndicator size={'small'} color={colors.white} />
                        ) : (
                            <Text style={style.submitButtonText}>Submit</Text>
                        )}
                    </TouchableOpacity>
                    </View>
                </View>
            </DialogContent>
       )
    }
}

export default Exchange