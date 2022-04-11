import * as React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import style from './style';
import {useNavigation} from '@react-navigation/native';
interface Props {
  title: string;
  icon: any;
  //key: string;
  onPress?: () => void;
  routeKey?: string;
}
export const Menu = (props: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={style.menu}
      onPress={() => {
        if (props.onPress) {
          props.onPress();
        }
        if (props.routeKey) {
          navigation.navigate(props.routeKey);
        }
      }}>
      <Image
        style={style.menuIcon}
        resizeMode={'contain'}
        source={props.icon}
      />
      <Text style={style.menuTitle}>{props.title}</Text>
    </TouchableOpacity>
  );
};
