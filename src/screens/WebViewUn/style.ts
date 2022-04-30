import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
export default StyleSheet.create({
  cancelButton: {
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
});
