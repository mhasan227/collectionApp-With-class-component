import React from 'react' ;
import { View, Text, Button, ScrollView,Image, TextInput, TouchableOpacity} from 'react-native' ;
import style from "./style";
import DialogContent from "../../component/DialogContent";
import {IconButton} from '../../component/IconButton';
class SignUpFirstStep extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);  
        }
    render() {   
        return (
            <ScrollView contentContainerStyle={style.formRoot}>
            <View>
              <View style={style.formHeader}>
                <Text style={style.formHeaderTitle}>
                  Please share some more information
                </Text>
                <Image
                  source={require('../../../assets/logo.png')}
                  style={style.headerLogo}
                  resizeMode={'contain'}
                />
              </View>
              <View style={style.formBody}>
                <Text style={style.formBodyTitle}>Fill Information:</Text>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Business Name:</Text>
                  <TextInput style={style.formInput} />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Business Address:</Text>
                  <TextInput style={style.formInput} />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Estimated Monthly Income:</Text>
                  <TextInput style={style.formInput} keyboardType={'number-pad'} />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>
                    Estimated Monthly Transaction:
                  </Text>
                  <TextInput style={style.formInput} keyboardType={'number-pad'} />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Trade License Number:</Text>
                  <TextInput style={style.formInput} keyboardType={'number-pad'} />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>TIN Number:</Text>
                  <TextInput style={style.formInput} keyboardType={'number-pad'} />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>BIN Number:</Text>
                  <TextInput style={style.formInput} keyboardType={'number-pad'} />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Bank Account Name:</Text>
                  <TextInput style={style.formInput} />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Bank Account Number:</Text>
                  <TextInput style={style.formInput} />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Bank Name:</Text>
                  <TextInput style={style.formInput} />
                </View>
                <View style={style.formBodyInputWrapper}>
                  <Text style={style.formInputLabel}>Branch Name:</Text>
                  <TextInput style={style.formInput} />
                </View>
                <View style={style.uploadWrapper}>
                  <Text style={style.uploadText}>
                    Upload Trade License, TIN, BIN, Bank Cheque Scan Copy in JPG or
                    PDF.
                  </Text>
                  <TouchableOpacity style={style.uploadButton}>
                    <Image
                      source={require('../../../assets/right-arrow.png')}
                      style={style.uploadIcon}
                    />
                    <Text style={style.uploadButtonText}>Upload</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={style.formFooter}>
              <Text style={style.formFooterText}>
                Please ensure above all information are correct
              </Text>
              <View style={[style.buttonFooterRow, {marginTop: 32}]}>
                <IconButton
                  title="Back"
                  onPress={() => {
                    this.props.navigation.navigate('SignUpSecondStep');
                  }}
                  variant="outlined"
                  color="primary"
                  icon="prev-arrow"
                />
                <IconButton
                  title="Next"
                  onPress={() => {
                    this.props.navigation.navigate('SignUpFourthStep');
                  }}
                  variant="contained"
                  color="primary"
                  icon="next-arrow"
                />
              </View>
            </View>
          </ScrollView>
       )
    }
}

export default SignUpFirstStep