import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
export default StyleSheet.create({
    toolbar: {
        backgroundColor: '#800080',
        height: 56
    },
    drawer: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    temp: {
        textAlign: 'center',
        paddingTop: 50,
        fontSize: 20,
    },
    button: {
        paddingTop: 50,
        alignItems: 'center',
        backgroundColor: "purple",
        width: 100,
        height: 100,
        justifyContent: 'center'

    },
    root: {
        flexDirection: 'column',
        flex: 1,
      },
      toolBar: {
        backgroundColor: colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
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
        alignItems: 'center',
        justifyContent: 'space-between',
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
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 4,
        alignItems: 'center',
        flexDirection: 'row',
      },
      toolBarProfileText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 2,
      },
      toolBarProfileTextSection: {
        alignItems: 'flex-end',
      },
      toolBarWalletText: {
        color: colors.primary,
      },
      toolBarWalletImg: {
        width: 16,
        height: 16,
        marginRight: 4,
      },
      bottomToolbar: {
        height: 44,
        backgroundColor: colors.bottom,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      bottomToolbarIcon: {
        width: 24,
      },
      bottomToolbarImageWrapper: {
        backgroundColor: '#fff',
        padding: 4,
        borderRadius: 4,
      },
      bottomToolbarImage: {
        width: 30,
        height: 26,
      },
      body: {
        paddingHorizontal: 16,
        paddingVertical: 16,
      },
      bodySection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 16,
      },
      menu: {
        backgroundColor: colors.white,
        borderRadius: 12,
        borderColor: 'black',
        width: 110,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        elevation: 20,
      },
      menu2: {
        backgroundColor: colors.white,
        borderRadius: 12,
        width: 110,
        height: 128,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
      },
      menuIcon: {
        height: 40,
        marginBottom: 8,
        
      },
      menuTitle: {
        color: colors.black,
        fontSize: 14,
        textAlign: 'center'
      },
});