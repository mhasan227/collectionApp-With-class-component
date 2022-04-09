import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
export default StyleSheet.create({
  toolBar: {
    backgroundColor: colors.primaryy,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    //borderColor: '#90EE90', //#ed254d
    //borderTopWidth: 2,
    //borderTopColor: '#4DA3DC',
    //borderBottomWidth: 2
  },
  toolBarLogoWrapper: {
    backgroundColor: '#fff',
    borderRadius: 6,
    width: 78,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 60,
  },
  toolBarProfile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  toolBarProfilePic: {
    marginLeft: 8,
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  toolBarProfileWalletSection: {
    //backgroundColor: '#fff',  // off for balance
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  toolBarProfileText: {
    maxWidth: 180,
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  toolBarProfileTextSection: {
    alignItems: 'flex-end',
  },
  toolBarWalletText: {
    color: colors.black,
  },
  toolBarWalletImg: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
});
