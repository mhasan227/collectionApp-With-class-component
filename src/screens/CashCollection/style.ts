import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
export default StyleSheet.create({
  root: {
    flexDirection: 'column',
    flex: 1,
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  formBody: {
    paddingVertical: 16,
    paddingHorizontal: 28,
  },
  formBodyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  formHeaderTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  formBodyInputWrapper: {
    marginBottom: 4,
  },
  formInputLabel: {
    marginBottom: 4,
    color: colors.black,
  },
  formFooter: {
    marginTop: 60,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  formFooterText: {
    color: colors.primary,
    textAlign: 'center',
  },
  formInput: {
    backgroundColor: '#fdecf5',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    fontSize: 14,
    height: 38,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  uploadWrapper: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uploadText: {
    flex: 1,
    marginRight: 12,
    fontSize: 12,
  },
  iconTextInputWrapper: {
    width: '80%',
    backgroundColor: '#fdecf5',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  uploadButton: {
    width: 90,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uploadIcon: {
    width: 20,
    height: 20,
    transform: [{rotate: '-90deg'}],
  },
  uploadButtonText: {
    fontWeight: '700',
    color: colors.white,
  },
  buttonWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 32,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 6,
  },
  submitButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
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
