import * as React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import style from './style';
import {useNavigation} from '@react-navigation/native';
interface Props {
  title: string;
  icon: any;
  onPress?: () => void;
  routeKey?: string;
  id : string;
  modalId : string;
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
        if (props.routeKey && props.id && props.modalId) {
          navigation.navigate(props.routeKey,{uID : props.id, mID: props.modalId});
        }
        else if (props.routeKey && props.id) {
          navigation.navigate(props.routeKey,{uID : props.id});
        }
        else if (props.routeKey) {
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
