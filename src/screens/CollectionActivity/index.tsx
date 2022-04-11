import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import style from './style';
import ToolBar from '../../component/Toolbar';
import DialogContent from '../../component/DialogContent';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import colors from '../../config/colors';

interface Props {}
const CollectionActivity = (props: Props) => {
  const state = {
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
  };
  return (
    <View style={style.root}>
      <ToolBar />
      <DialogContent title="Collection Activity">
        <ScrollView horizontal={true}>
          <View style={{backgroundColor: colors.white}}>
            <Table borderStyle={{borderWidth: 1, borderColor: colors.primary}}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
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
                  widthArr={state.widthArr}
                />
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </DialogContent>
    </View>
  );
};

export default CollectionActivity;
