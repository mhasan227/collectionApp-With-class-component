import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
export default StyleSheet.create({
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
  submitButtonText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.white,
  },
  root: {
    // flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    padding: 8,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.primary,
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  body: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  section: {
    marginBottom: 16,
    overflow: 'visible',
  },
  sectionHeader: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sectionHeaderTitle: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 8,
  },
  sectionBody: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputWrapper: {
    flex: 1,
    paddingLeft: 16,
  },
  formInput: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    fontSize: 14,
    height: 38,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  formInputLabel: {
    width: 84,
    fontSize: 14,
    color: colors.primary,
  },
});
