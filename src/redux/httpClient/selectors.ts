import get from 'lodash.get';

import {createSelector} from '@reduxjs/toolkit';
export const selectHttp = (state: any) => state.httpReducer;

export const selectLogin = createSelector([selectHttp], (httpState) =>
	get(httpState, 'login', {}),
);
export const selectResetPassword = createSelector([selectHttp], (httpState) =>
	get(httpState, 'resetPassword', {}),
);
export const selectSubmitOtp = createSelector([selectHttp], (httpState) =>
	get(httpState, 'submitOtp', {}),
);
export const selectChangePassword = createSelector([selectHttp], (httpState) =>
	get(httpState, 'changePassword', {}),
);
export const selectGetWalletByUserId = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getWalletByUserId', {}),
);
export const selectGetWalletBalanceByTransactionAccountId = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getWalletByUserId', {}),
);
export const selectGetBankList = createSelector([selectHttp], (httpState) =>
	get(httpState, 'getBankList', {}),
);
export const selectGetAgentList = createSelector([selectHttp], (httpState) =>
	get(httpState, 'getAgentList', {}),
);
export const selectGetAgentListMM = createSelector([selectHttp], (httpState) =>
	get(httpState, 'getAgentListMM', {}),
);
export const selectGetAllMerchantList = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getAllMerchantList', {}),
);
export const selectGetAllRiderList = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getAllRiderList', {}),
);
export const selectGetAllManagerList = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getAllManagerList', {}),
);
export const selectGetAllPayeeList = createSelector([selectHttp], (httpState) =>
	get(httpState, 'getAllPayeeList', {}),
);
export const selectSetWalletPIN = createSelector([selectHttp], (httpState) =>
	get(httpState, 'setWalletPIN', {}),
);
export const selectSetWalletOTP = createSelector([selectHttp], (httpState) =>
	get(httpState, 'setWalletOTP', {}),
);
export const selectGetAlCollectionType = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getAlCollectionType', {}),
);
export const selectcollectionServiceCreateCPAgentTransferRequest = createSelector(
	[selectHttp],
	(httpState) =>
		get(httpState, 'collectionServiceCreateCPAgentTransferRequest', {}),
);
export const selectCashoutRequest = createSelector(
	[selectHttp],
	(httpState) =>
		get(httpState, 'selectCashoutRequest', {})
);
export const selectcollectionServiceCreateAgentCPTransferRequest = createSelector(
	[selectHttp],
	(httpState) =>
		get(httpState, 'collectionServiceCreateAgentCPTransferRequest', {})
);
export const selectCollectionServiceCreateLiftingRequest = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'collectionServiceCreateLiftingRequest', {}),
);
export const selectCollectionServiceCollection = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'collectionServiceCollection', {}),
);
export const selectWalletTransfer = createSelector([selectHttp], (httpState) =>
	get(httpState, 'walletTransfer', {}),
);
export const selectGetEncasementList = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getEncasementList', {}),
);
export const selectGtCollectionList = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getCollectionList', {}),
);
export const selectGetLiftingRequestsList = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getLiftingRequestsList', {}),
);
export const selectGetCashpointDSEAgentTransferList = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getCashpointDSEAgentTransferList', {}),
);
export const selectGetCashoutList = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getCashoutList', {}),
);
export const selectCollectionServiceCreatePayeeMerchantTransferRequest = createSelector(
	[selectHttp],
	(httpState) =>
		get(httpState, 'collectionServiceCreatePayeeMerchantTransferRequest', {})
);
export const selectGetPayeeMerchantTransferList = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getPayeeMerchantTransferList', {}),
);
export const selectGetCashpointCurrencyTransferList = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getCashpointCurrencyTransferList', {}),
);
export const selectGetManagerCreditTransferList = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getManagerCreditTransferList', {}),
);
export const selectGetMerchantCreditTransferList = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getMerchantCreditTransferList', {}),
);
export const selectCashpointManagerTransferRequest = createSelector(
	[selectHttp],
	(httpState) =>
		get(httpState, 'cashpointManagerTransferRequest', {})
);
export const selectTopupBHRequest = createSelector(
	[selectHttp],
	(httpState) =>
		get(httpState, 'topupBHRequest', {})
);
export const selectTopupRiderRequest = createSelector(
	[selectHttp],
	(httpState) =>
		get(httpState, 'topupRiderRequest', {})
);
export const selectAttandanceSystem = createSelector(
	[selectHttp],
	(httpState) =>
		get(httpState, 'attandanceSystem', {})
);
export const selectGetAttendanceList = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getAttendanceList', {}),
);
export const selectGetMerchantPayeeList = createSelector(
	[selectHttp],
	(httpState) =>
		get(httpState, 'getMerchantPayeeList', {})
);
export const selectPullRequest = createSelector(
	[selectHttp],
	(httpState) =>
		get(httpState, 'pullRequest', {})
);
export const selectPullSubmit = createSelector(
	[selectHttp],
	(httpState) =>
		get(httpState, 'pullSubmit', {})
);
export const selectGetPayeeWalletByMerchantId = createSelector(
	[selectHttp],
	(httpState) => get(httpState, 'getPayeeWalletByMerchantId', {}),
);
