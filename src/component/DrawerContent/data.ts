/*import {
  getCollectionList,
  getEncasementList,
  getLiftingRequestsList,
  getCashoutList,
  getCashpointDSEAgentTransferList,
  getPayeeMerchantTransferList,
  getCashpointCurrencyTransferList,
  getManagerCreditTransferList,
  getMerchantCreditTransferList,
  getAttendanceList,
} from '../../redux/httpClient/api';
import {
  collectionActivitySelector,
  encasementListSelector,
  liftingRequestsListSelector,
  cashoutActivitySelector,
  cashpointDSEAgentTransferActivitySelector,
  payeeMerchantTransferActivitySelector,
  cashpointCurrencyTransferSelector,
  managerCreditTransferListSelector,
  merchantCreditTransferListSelector,
  attendanceListSelector,
} from '../../dialog/ListingView/selector';
import {ROLE} from '../../types';*/
import ListData from '../../utility/ListData';
import ApiCall from '../../networking/ApiCall';
import {ROLE} from '../../types';
/*const show = async () => {
  let vare = await ListData.getCollectionData();
  //console.log(c);
  return vare;
}
let add= show();*/
export default [
  {
    label: 'Collection Activity',
    routeKey: 'ListView',
    icon: require('../../../assets/deposit.png'),
    data: "Collection",
    roles: [ROLE.CASHPOINT, ROLE.PAYEE, ROLE.MERCHANT],
  },
  {
    label: 'Deposit Activity',
    routeKey: 'ListView',
    icon: require('../../../assets/deposit4.png'),
    data: "Deposit",
    roles: [ROLE.CASHPOINT],
  },
  {
    label: 'Encashment Activity',
    routeKey: 'ListView',
    icon: require('../../../assets/encashment.png'),
    //selector: encasementListSelector,
    //action: getEncasementList,
    roles: [ROLE.MERCHANT],
  },
  /*{
    label: 'Cashout Activity',
    routeKey: 'ListView',
    icon: require('../../../assets/atm.png'),
    selector: cashoutActivitySelector,
    action: getCashoutList,
    roles: [ROLE.AGENT, ROLE.MERCHANT],
  },
  {
    label: 'Agent Transfers',
    routeKey: 'ListView',
    icon: require('../../../assets/seller.png'),
    selector: cashpointDSEAgentTransferActivitySelector,
    action: getCashpointDSEAgentTransferList,
    roles: [ROLE.AGENT, ROLE.CASHPOINT],
  },
  {
    label: 'Currency Transfers',
    routeKey: 'ListView',
    icon: require('../../../assets/money-transfer.png'),
    selector: cashpointCurrencyTransferSelector,
    action: getCashpointCurrencyTransferList,
    roles: [ROLE.CASHPOINT],
  },
  {
    label: 'Send Money',
    routeKey: 'ListView',
    icon: require('../../../assets/send.png'),
    selector: payeeMerchantTransferActivitySelector,
    action: getPayeeMerchantTransferList,
    roles: [ROLE.PAYEE, ROLE.MERCHANT],
  },
  {
    label: 'Wallet Activation',
    routeKey: 'WalletActivation',
    icon: require('../../../assets/purse.png'),
    roles: [ROLE.CASHPOINT, ROLE.PAYEE, ROLE.MERCHANT],
  },
  {
    label: 'Change Password',
    icon: require('../../../assets/password.png'),
    routeKey: 'ChangePassword',
    roles: [ROLE.CASHPOINT, ROLE.PAYEE, ROLE.MERCHANT],
  },
  {
    label: 'Manager Credit Transfers',
    icon: require('../../../assets/manager.png'),
    selector: managerCreditTransferListSelector,
    action: getManagerCreditTransferList,
    routeKey: 'ListView',
    roles: [ROLE.CASHPOINT, ROLE.LM, ROLE.AM, ROLE.RM],
  },
  {
    label: 'Merchant Credit Transfers',
    icon: require('../../../assets/clerk.png'),
    selector: merchantCreditTransferListSelector,
    action: getMerchantCreditTransferList,
    routeKey: 'ListView',
    roles: [ROLE.CASHPOINT, ROLE.LM, ROLE.AM, ROLE.RM, ROLE.MERCHANT],
  },
  {
    label: 'Attendance List',
    routeKey: 'ListView',
    icon: require('../../../assets/attendance1.png'),
    selector: attendanceListSelector,
    action: getAttendanceList,
    roles: [ROLE.CASHPOINT, ROLE.PAYEE, ROLE.MERCHANT, ROLE.MCA],
  },*/
];
