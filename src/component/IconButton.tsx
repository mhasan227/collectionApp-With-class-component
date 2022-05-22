import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Image,
} from 'react-native';
import colors from '../config/colors';
interface Props {
  title: string;
  onPress: () => void;
  variant: 'contained' | 'outlined';
  color: 'primary';
  style?: ViewStyle;
  icon: 'prev-arrow' | 'next-arrow';
}
const styles = StyleSheet.create({
  commonButton: {
    textTransform: 'uppercase',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
  commonButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containedPrimaryButton: {
    backgroundColor: colors.primary,
  },
  containedPrimaryButtonText: {
    color: colors.white,
  },
  outlinedPrimaryButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  outlinedPrimaryButtonText: {
    color: colors.primary,
  },
  icon: {
    width: 25,
    height: 25,
  },
});
export const IconButton = (props: Props) => {
  const buttonStyle = {
    ...styles.commonButton,
    ...(props.variant === 'contained' && props.color === 'primary'
      ? styles.containedPrimaryButton
      : {}),
    ...(props.variant === 'outlined' && props.color === 'primary'
      ? styles.outlinedPrimaryButton
      : {}),
    ...(props.style ? props.style : {}),
  };
  const buttonTextStyle = {
    ...styles.commonButtonText,
    ...(props.variant === 'contained' && props.color === 'primary'
      ? styles.containedPrimaryButtonText
      : {}),
    ...(props.variant === 'outlined' && props.color === 'primary'
      ? styles.outlinedPrimaryButtonText
      : {}),
  };
  return (
    <TouchableOpacity onPress={props.onPress} style={buttonStyle}>
      {props.icon === 'prev-arrow' && (
        <Image
          source={require('../../assets/left-arrow.png')}
          style={[styles.icon, {marginRight: 8}]}
          resizeMethod={'scale'}
        />
      )}
      <Text style={buttonTextStyle}>{props.title}</Text>
      {props.icon === 'next-arrow' && (
        <Image
          source={require('../../assets/right-arrow.png')}
          style={[styles.icon, {marginLeft: 8}]}
          resizeMethod={'scale'}
        />
      )}
    </TouchableOpacity>
  );
};
