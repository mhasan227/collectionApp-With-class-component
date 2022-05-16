import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
export default StyleSheet.create({
  root: {
    paddingVertical: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 30,
    color: colors.white  // Extra
  },
  iconTextInputWrapper: {
    width: '80%',
    // backgroundColor: '#fdecf5',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  iconTextInputIcon: {
    width: 20,
    height: 20,
  },
  iconTextInputIconWrapper: {},
  iconTextInput: {
    height: 40,
    color: colors.white,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingHorizontal: 32,
    paddingVertical: 6,
  },
  submitButtonText: {
    fontSize: 18,
    color: colors.white,
  },
});
