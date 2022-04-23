import * as React from 'react';
import {Text, ViewStyle} from 'react-native';
import DropDownPicker from "react-native-custom-dropdown";
import colors from '../config/colors';
interface Props {
  items: Array<{label: string; value: any}>;
  updateKey: string;
  defaultValue: any;
  onChangeItem: (key: string, value: any) => void;
  searchablePlaceholder?: string;
  disabled?: boolean;
  style?: ViewStyle;
  value?: string;
}
const SearchablePicker = (props: Props) => {
  return (
    <DropDownPicker
      disabled={props.disabled}
      items={props.items}
      defaultValue={props.defaultValue}
      containerStyle={{height: 40}}
      style={{
        backgroundColor: '#fdecf5',
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 6,
        height: 38,
        paddingHorizontal: 8,
        justifyContent: 'center',
        ...(props.style ? {...props.style} : {}),
      }}
      itemStyle={{
        justifyContent: 'flex-start',
      }}
      dropDownStyle={{backgroundColor: '#fafafa'}}
      labelStyle={{
        fontSize: 14,
        textAlign: 'left',
        color: '#000',
      }}
      onChangeItem={(item) => props.onChangeItem(props.updateKey, item.value)}
      searchable={true}
      placeholder={props.searchablePlaceholder || 'Search for an item'}
      searchablePlaceholder={
        props.searchablePlaceholder || 'Search for an item'
      }
      searchablePlaceholderTextColor="gray"
      searchableError={() => <Text>Not Found</Text>}
    />
  );
};

export default React.memo(SearchablePicker);
