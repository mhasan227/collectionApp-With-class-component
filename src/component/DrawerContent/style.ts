import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
export default StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#e5e5e5'  //extra //#324057 #F3F4F3
  },
  drawerItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  drawerItemLabel: {
    color: colors.primary,
    fontSize: 16,
  },
  drawerItemImage: {
    marginRight: 8,
    height: 20,
    width: 20,
  },
  drawerHeader: {
    height: 40,
    paddingHorizontal: 8,
  },
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    paddingBottom: 4,
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
    maxWidth: '70%',
  },
  drawerFooter: {
    height: 60,
    justifyContent: 'flex-end',
  },
  drawerFooterColor: {
    backgroundColor: '#324057'
  },
});
