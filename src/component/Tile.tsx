import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { color } from 'react-native-reanimated';
import colors from '../config/colors';
interface Props {
  title: string;
  subTitle?: string;
  rightHeading: string;
  rightSubHeading?: string;
  onPress?: () => void;
}
const Tile = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onPress={() => {
        if (props.onPress) {
          props.onPress();
        }
      }}>
      <View style={styles.root}>
        <View style={styles.rightSection}>
          <Text style={styles.rightSectionTitle}>{props.title}</Text>
          {!!props.subTitle && (
            <Text style={styles.rightSectionSubtitle}>{props.subTitle}</Text>
          )}
        </View>
        <View
          style={styles.verticleLine}
        />
        <View style={styles.leftSection}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.leftHeading}>{props.rightHeading}</Text>
            {!!props.rightSubHeading && (
              <Text style={[styles.rightSectionSubtitle, {paddingRight: 4}]}>
                {props.rightSubHeading}
              </Text>
            )}
          </View>
        </View>
      </View>
      {!!props.onPress && (
        <View
          style={{
            width: 40,
            borderLeftWidth: 1,
            borderColor: '#ddd',
            paddingLeft: 8,
            marginLeft: 8,
            minHeight: 35,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../assets/right-chevron.png')}
            style={{width: 16, height: 16}}
            resizeMode={'stretch'}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftHeading: {
    lineHeight: 16,
    paddingRight: 4,
    color: colors.black
  },
  rightSection: {},
  rightSectionTitle: {
    fontSize: 16,
    color: colors.black
  },
  rightSectionSubtitle: {
    color: colors.primary, //#333
    marginTop: 4,
  },
  verticleLine: {
    borderRightWidth: 1,
    borderRightColor: '#daa520',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight:35,
    paddingRight: 5,
    marginRight: 5,
    //width: 5,
  },
});
export default React.memo(Tile);
