import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
export default StyleSheet.create({
  root: {
    flex: 1,
  },
  headerText: {
    padding: 2,
    textAlign: 'center',
    color: colors.primary,
    fontWeight: '700',
  },
  bodyText: {
    textAlign: 'center',
    color: '#000',
    padding: 2,
  },
});
