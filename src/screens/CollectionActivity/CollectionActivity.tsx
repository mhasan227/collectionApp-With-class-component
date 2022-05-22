import React from 'react' ;
import { View, Text , TextInput, ScrollView,Image,TouchableOpacity,DrawerLayoutAndroid, Alert} from 'react-native' ;
import style from "./style";
import DialogContent from "../../component/DialogContent";
import ToolBar from '../../component/Toolbar';
import colors from '../../config/colors';
import {Table, TableWrapper, Row} from 'react-native-table-component';
class CollectionActivity extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            tableHead: [
                'Date',
                'Wallet',
                'Amount',
                'Merchant Name',
                'Merchant ID',
                'CashPoint Name',
                'CashPoint ID',
              ],
              widthArr: [80, 100, 60, 120, 80, 140, 100],
          }  
        }
    handleSubmit = async () => {}
    render() {   
        return (
            <View style={style.root}>
                <DialogContent title="Collection Activity">
                    <ScrollView horizontal={true}>
                    <View style={{backgroundColor: colors.white}}>
                        <Table borderStyle={{borderWidth: 1, borderColor: colors.primary}}>
                        <Row
                            data={this.state.tableHead}
                            widthArr={this.state.widthArr}
                            textStyle={style.headerText}
                        />
                        </Table>
                        <ScrollView>
                        <Table
                            style={{marginTop: -1}}
                            borderStyle={{borderWidth: 1, borderColor: colors.primary}}>
                            <Row
                            data={[
                                '1/1/2000',
                                'saa@sss.co',
                                1000,
                                'name',
                                122,
                                'aass',
                                12211,
                            ]}
                            textStyle={style.bodyText}
                            widthArr={this.state.widthArr}
                            />
                        </Table>
                        </ScrollView>
                    </View>
                    </ScrollView>
                </DialogContent>
            </View>
       )
    }
}

export default CollectionActivity