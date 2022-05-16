import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import ApiCall from '../networking/ApiCall';
import numeral from 'numeral';
import moment from 'moment-timezone';
import {ROLE} from '../types';
export default {

   getCollectionData : async (token,userId,role) => {
        //let token= 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJNYXhpcyBDUCIsImV4cCI6MTY1MTA0NDAzMSwiaWF0IjoxNjUxMDQzMTMxLCJlbWFpbCI6IiJ9.a5JXKJV1_kp5HqAMYdD1WxY1-NBhu2rmhOkslvEqYnezZYXwMKaD5p9wv-ye73Go';
        let user;
        let list=[];
        let body={"accountId": userId,
                   };
          let path='collection-service/endpoint/collection/accountId';
          //console.log(this.state.token);
          let res = await ApiCall.api(body,token,path);
          //console.log("data",res.result.result);
          //this.setState({list: res.result.data});
          list= res.result.data;
          let modData= {};
          let convertList= [];
          list.map((data)=>{
            const createdAt = moment(data.dateTime).format('llll');
            let amountNumVal = numeral(data.amount).format('0,0.00');
            //let role= this.state.role;
            const roleBasedHeading = [
              role === ROLE.CASHPOINT && {
                rightHeading: `${data.merchantName}(C)`,
                rightSubHeading: `${data.payeeName}(P)`,
              },
              role === ROLE.MERCHANT && {
                rightHeading: `${data.cpName}(C)`,
                rightSubHeading: `${data.payeeName}(P)`,
              },
              role === ROLE.PAYEE && {
                rightHeading: `${data.merchantName}(M)`,
                rightSubHeading: `${data.cpName}(C)`,
              },
              {},
            ].find((i) => i);
            const roleBasedData = [
              role === ROLE.CASHPOINT && [
                {
                  label: 'Merchant Name',
                  value: data.merchantName,
                },
                {
                  label: 'Merchant ID',
                  value: data.merchantId,
                },
                {
                  label: 'Payee Name',
                  value: data.payeeName,
                },
                {
                  label: 'Payee ID',
                  value: data.payeeId,
                },
              ],
              role === ROLE.MERCHANT && [
                {
                  label: 'Cash Point Name',
                  value: data.cpName,
                },
                {
                  label: 'Cash Point ID',
                  value: data.cashPointId,
                },
                {
                  label: 'Payee Name',
                  value: data.payeeName,
                },
                {
                  label: 'Payee ID',
                  value: data.payeeId,
                },
              ],
              role === ROLE.PAYEE && [
                {
                  label: 'Merchant Name',
                  value: data.merchantName,
                },
                {
                  label: 'Merchant ID',
                  value: data.merchantId,
                },
                {
                  label: 'Cash Point Name',
                  value: data.cpName,
                },
                {
                  label: 'Cash Point ID',
                  value: data.cashPointId,
                },
              ],
              [],
            ].find((i) => i);

              modData={
                title: `BDT ${amountNumVal} (${data.decision})`,
                subTitle: moment(data.dateTime).format('llll'),
                ...roleBasedHeading,
                data: [
                  {
                    label: 'Amount',
                    value: amountNumVal,
                  },
                  {
                    label: 'Status',
                    value: data.decision,
                  },
                  {
                    label: 'Created At',
                    value: createdAt,
                  },
                  // @ts-ignore
                  ...roleBasedData,
                  {
                    label: 'Collection Type',
                    value: data.collectionTypeName,
                  },
                  {
                    label: 'Invoice / Receipt',
                    value: data.invoiceNo,
                  },
                  {
                    label: 'Reference 1',
                    value: data.reference1,
                  },
                  {
                    label: 'Reference 2',
                    value: data.reference2,
                  },
                  {
                    label: 'Reference 3',
                    value: data.reference3,
                  },
                  {
                    label: 'Transaction ID',
                    value: data.transactionEngineId,
                  },
                ],
              }
            convertList.push(modData);
          });
          return convertList;
   },
   getDepositData : async (token,userId,role) => {
    //let token= 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJNYXhpcyBDUCIsImV4cCI6MTY1MTA0NDAzMSwiaWF0IjoxNjUxMDQzMTMxLCJlbWFpbCI6IiJ9.a5JXKJV1_kp5HqAMYdD1WxY1-NBhu2rmhOkslvEqYnezZYXwMKaD5p9wv-ye73Go';
    let user;
    let list=[];
    let body={"accountId": userId,
               };
      let path='collection-service/endpoint/lifting/accountId';
      //console.log(this.state.token);
      let res = await ApiCall.api(body,token,path);

      list= res.result.data;
      let modData= {};
      let convertList= [];
      list.map((data)=>{
        //const createdAt = moment(data.dateTime).format('llll');
        //let role= this.state.role;
          modData={
            title: `BDT ${data.amount}`,
            subTitle: moment(data.approvalDetails && data.approvalDetails.decisionTime && data.approvalDetails.decisionTime != null? data.approvalDetails.decisionTime : data.createDateTime).format(
              'llll',),
            rightHeading: data.approvalDetails.approvalDecision,
            data: [
                    {
                      value: `BDT ${data.amount}`,
                      label: 'Amount',
                    },
                    {
                      value: moment(data.approvalDetails && data.approvalDetails.decisionTime && data.approvalDetails.decisionTime != null? data.approvalDetails.decisionTime : data.createDateTime).format(
                        'llll',
                      ),
                      label: (data.approvalDetails && data.approvalDetails.decisionTime && data.approvalDetails.decisionTime != null? 'Decision Time' : 'Request Time'),
                    },
                    {
                      value: (data.approvalDetails && data.approvalDetails.decisionTime && data.approvalDetails.decisionTime != null? data.approvalDetails.approvalDecision : 'Pending'),
                      label: 'Decision Status',
                    },
                    {
                      value: (data.currency),
                      label: 'Currency',
                    }
                  ],
          }
        convertList.push(modData);
      });
      return convertList;

  },

  getEnCashMentData : async (token,userId,role) => {
    //let token= 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJNYXhpcyBDUCIsImV4cCI6MTY1MTA0NDAzMSwiaWF0IjoxNjUxMDQzMTMxLCJlbWFpbCI6IiJ9.a5JXKJV1_kp5HqAMYdD1WxY1-NBhu2rmhOkslvEqYnezZYXwMKaD5p9wv-ye73Go';
    let user;
    let list=[];
    let body={"accountId": userId,
               };
      let path='collection-service/endpoint/encashment/accountId';
      //console.log(this.state.token);
      let res = await ApiCall.api(body,token,path);

      list= res.result.data;
      let modData= {};
      let convertList= [];
      list.map((data)=>{
        //const createdAt = moment(data.dateTime).format('llll');
        //let role= this.state.role;
          modData={
            title: `BDT ${data.encashmentAmount}`,
            subTitle: data.generateTime,
            rightHeading: data.decision,
            data: [
                    {
                      value: `BDT ${data.encashmentAmount}`,
                      label: 'Amount',
                    },
                    {
                      value: moment(data.generateTime).format('llll'),
                      label: 'Created At',
                    },
                    {
                      value: data.decision,
                      label: 'Decision Status',
                    },
                  ],
          }
        convertList.push(modData);
      });
      return convertList;
  },

  getCashOutData : async (token,userId,role) => {
    //let token= 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJNYXhpcyBDUCIsImV4cCI6MTY1MTA0NDAzMSwiaWF0IjoxNjUxMDQzMTMxLCJlbWFpbCI6IiJ9.a5JXKJV1_kp5HqAMYdD1WxY1-NBhu2rmhOkslvEqYnezZYXwMKaD5p9wv-ye73Go';
    let user;
    let list=[];
    let body={"accountId": userId,
               };
      let path='collection-service/endpoint/cashout/accountId';
      //console.log(this.state.token);
      let res = await ApiCall.api(body,token,path);
      //console.log("data",res.result.result);
      //this.setState({list: res.result.data});
      list= res.result.data;
      let modData= {};
      let convertList= [];
      list.map((data)=>{
        const createdAt = moment(data.requestTime).format('lll');
        let amountNumVal = numeral(data.amount).format('0,0.00');
        //let role= this.state.role;
        const roleBasedHeading = [
          role === ROLE.AGENT && {
						rightHeading: `${data.merchantName}`,
						rightSubHeading: `${data.merchantId}`,
					},
					role === ROLE.MERCHANT && {
						rightHeading: `${data.agentName}`,
						rightSubHeading: `${data.agentId}`,
					},
          {},
        ].find((i) => i);
        const roleBasedData = [
          role === ROLE.AGENT && [
						{
							label: 'Merchant Name',
							value: data.merchantId,
						},
						{
							label: 'Merchant ID',
							value: data.merchantId,
						}
					],
					role === ROLE.MERCHANT && [
						{
							label: 'Cash Point Name',
							value: data.cpName,
						},
						{
							label: 'Cash Point ID',
							value: data.cashPointId,
						}
					],
          [],
        ].find((i) => i);

          modData={
            title: `BDT ${data.cashoutMerchantRequestAmount} (${data.cashoutRequestStatus})`,
					  subTitle: createdAt,
            ...roleBasedHeading,
            data: [
              {
                label: 'Cashout date-time',
                value: createdAt,
              },
              {
                label: 'Status',
                value: data.cashoutRequestStatus,
              },
              {
                label: 'Cashout request amount',
                value: data.cashoutMerchantRequestAmount,
              },
  
              {
                label: 'Merchant',
                value: data.merchantId,
              },
              {
                label: 'Merchant name',
                value: data.merchantName,
              },
              {
                label: 'Merchant wallet',
                value: data.merchantWalletAccountId,
              },
  
              {
                label: 'Agent',
                value: data.agentId,
              },
              {
                label: 'Agent name',
                value: data.agentName,
              },
              {
                label: 'Agent wallet',
                value: data.agentWalletAccountId,
              },
  
              {
                label: 'Agent received amount',
                value: (data.cashoutAgentReceivedMainAmount == null? "-":data.cashoutAgentReceivedMainAmount),
              }
            ]
          }
        convertList.push(modData);
      });
      return convertList;
  },

  getCashpointDSEAgentTransferData : async (token,userId,role) => {
    //let token= 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJNYXhpcyBDUCIsImV4cCI6MTY1MTA0NDAzMSwiaWF0IjoxNjUxMDQzMTMxLCJlbWFpbCI6IiJ9.a5JXKJV1_kp5HqAMYdD1WxY1-NBhu2rmhOkslvEqYnezZYXwMKaD5p9wv-ye73Go';
    let user;
    let list=[];
    let body={"accountId": userId,
               };
      let path='collection-service/endpoint/wallet/cpagenttransfer/accountId';
      //console.log(this.state.token);
      let res = await ApiCall.api(body,token,path);
      //console.log("data",res.result.result);
      //this.setState({list: res.result.data});
      list= res.result.data;
      let modData= {};
      let convertList= [];
      list.map((data)=>{
        const agentName = data.agent !== null && data.agent !== undefined? data.agent.name : "";
				const agentUserId = data.agent !== null && data.agent !== undefined? data.agent.userId : "";
				const agentWallet = data.agentWallet !== null && data.agentWallet !== undefined && data.agentWallet.walletId !== null && data.agentWallet.walletId !== undefined? data.agentWallet.walletId : "";
				const cashpointWallet = data.cashpointDSEWallet !== null && data.cashpointDSEWallet !== undefined && data.cashpointDSEWallet.walletId !== null && data.cashpointDSEWallet.walletId !== undefined? data.cashpointDSEWallet.walletId : "";
        //let role= this.state.role;
        const createdAt = moment(data.requestTime).format('lll');
        const roleBasedHeading = [
          role === ROLE.AGENT && {
						rightHeading: `${data.cashpoint.name}`,
						rightSubHeading: `${data.cashpoint.userId}`,
					},
					role === ROLE.CASHPOINT && {
						rightHeading: `${agentName}`,
						rightSubHeading: `${agentUserId}`,
					},
          {},
        ].find((i) => i);
        const roleBasedData = [
          role === ROLE.AGENT && [
						{
							label: 'Cashpoint Name',
							value: data.cashpoint.name,
						},
						{
							label: 'Cashpoint ID',
							value: data.cashpoint.userId,
						}
					],
					role === ROLE.CASHPOINT && [
						{
							label: 'Agent Name',
							value: agentName,
						},
						{
							label: 'Agent ID',
							value: agentUserId,
						}
					],
          [],
        ].find((i) => i);

          modData={
            title: `BDT ${data.transferAmount} (${data.apiCallStatus})`,
					  subTitle: createdAt,
            ...roleBasedHeading,
            data: [
              {
                label: 'Transfer date-time',
                value: createdAt
              },
              {
                label: 'Status',
                value: data.apiCallStatus
              },
              {
                label: 'Amount',
                value: data.transferAmount
              },
              {
                label: 'Cashpoint',
                value: data.cashpoint.userId
              },
              {
                label: 'Cashpoint name',
                value: data.cashpoint.name
              },
              {
                label: 'Cashpoint DSE wallet',
                value: cashpointWallet
              },
              {
                label: 'Agent',
                value: agentUserId
              },
              {
                label: 'Agent name',
                value: agentName
              },
              {
                label: 'Agent wallet',
                value: agentWallet
              }
            ]
          }
        convertList.push(modData);
      });
      return convertList;
  },
  getCashpointCurrencyTransferList : async (token,userId,role) => {
    //let token= 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJNYXhpcyBDUCIsImV4cCI6MTY1MTA0NDAzMSwiaWF0IjoxNjUxMDQzMTMxLCJlbWFpbCI6IiJ9.a5JXKJV1_kp5HqAMYdD1WxY1-NBhu2rmhOkslvEqYnezZYXwMKaD5p9wv-ye73Go';
    let user;
    let list=[];
    let body={"accountId": userId,
               };
      let path='collection-service/endpoint/wallet/transfer/accountId';
      //console.log(this.state.token);
      let res = await ApiCall.api(body,token,path);
      //console.log("data",res.result.result);
      //this.setState({list: res.result.data});
      list= res.result.data;
      let modData= {};
      let convertList= [];
      list.map((data)=>{
        const currencySign =	data.walletType === "General" && data.transferDirection === "TRANSFER_TYPE_GENERAL_MYCASH_DISTRIBUTOR"? '( - Lifting)':
										(
											data.walletType === "Master Distributor" && data.transferDirection === "TRANSFER_TYPE_GENERAL_MYCASH_DISTRIBUTOR"? '( + MyCash)':
											(
												data.walletType === "Distributor" && data.transferDirection === "TRANSFER_TYPE_MYCASH_DISTRIBUTOR_GENERAL"? '( - MyCash)':
												(
													data.walletType === "Master Distributor" && data.transferDirection === "TRANSFER_TYPE_MYCASH_DISTRIBUTOR_GENERAL"? '( + Lifting)':data.walletType
												)
											)
										)
				;
				const leftHeading =	data.walletType === "General" && data.transferDirection === "TRANSFER_TYPE_GENERAL_MYCASH_DISTRIBUTOR"? data.wallet:
										(
											data.walletType === "Master Distributor" && data.transferDirection === "TRANSFER_TYPE_GENERAL_MYCASH_DISTRIBUTOR"? data.transferWallet:
											(
												data.walletType === "Distributor" && data.transferDirection === "TRANSFER_TYPE_MYCASH_DISTRIBUTOR_GENERAL"? data.wallet:
												(
													data.walletType === "Master Distributor" && data.transferDirection === "TRANSFER_TYPE_MYCASH_DISTRIBUTOR_GENERAL"? data.transferWallet:data.walletType
												)
											)
										)
				;
				const balanceBefore =	data.walletType === "General" && data.transferDirection === "TRANSFER_TYPE_GENERAL_MYCASH_DISTRIBUTOR"? data.balanceSourceBefore:
										(
											data.walletType === "Master Distributor" && data.transferDirection === "TRANSFER_TYPE_GENERAL_MYCASH_DISTRIBUTOR"? data.balanceDestinationBefore:
											(
												data.walletType === "Distributor" && data.transferDirection === "TRANSFER_TYPE_MYCASH_DISTRIBUTOR_GENERAL"? data.balanceSourceBefore:
												(
													data.walletType === "Master Distributor" && data.transferDirection === "TRANSFER_TYPE_MYCASH_DISTRIBUTOR_GENERAL"? data.balanceDestinationBefore:data.walletType
												)
											)
										)
				;
				const balanceAfter =	data.walletType === "General" && data.transferDirection === "TRANSFER_TYPE_GENERAL_MYCASH_DISTRIBUTOR"? data.balanceSourceAfter:
										(
											data.walletType === "Master Distributor" && data.transferDirection === "TRANSFER_TYPE_GENERAL_MYCASH_DISTRIBUTOR"? data.balanceDestinationAfter:
											(
												data.walletType === "Distributor" && data.transferDirection === "TRANSFER_TYPE_MYCASH_DISTRIBUTOR_GENERAL"? data.balanceSourceAfter:
												(
													data.walletType === "Master Distributor" && data.transferDirection === "TRANSFER_TYPE_MYCASH_DISTRIBUTOR_GENERAL"? data.balanceDestinationAfter:data.walletType
												)
											)
										)
				;
				const rightHeading = (data.transferDirection === "TRANSFER_TYPE_GENERAL_MYCASH_DISTRIBUTOR")? "To MyCash Distribution":(data.transferDirection === "TRANSFER_TYPE_MYCASH_DISTRIBUTOR_GENERAL"? "From MyCash Distribution":"Other");
				
				const roleBasedHeading = [
					{
						rightHeading: rightHeading,
						rightSubHeading: currencySign + ' ' + data.transferAmount,
					},
					{},
				].find((i) => i);
				const roleBasedData = [
					[
					],
					[],
				].find((i) => i);
        const createdAt = moment(data.requestTime).format('lll');
          modData={
            title: `${leftHeading}`,
					  subTitle: createdAt,
            ...roleBasedHeading,
            data: [
              {
                label: 'Date',
                value: createdAt
              },
              {
                label: 'Wallet',
                value: leftHeading
              },
              {
                label: 'Amount',
                value: currencySign + ' ' + data.transferAmount
              },
              {
                label: 'Cause',
                value: rightHeading
              },
              {
                label: 'Balance before',
                value: balanceBefore
              },
              {
                label: 'Balance after',
                value: balanceAfter
              },
            ]
          }
        convertList.push(modData);
      });
      return convertList;
  },
  getPayeeMerchantTransferList : async (token,userId,role) => {
    //let token= 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJNYXhpcyBDUCIsImV4cCI6MTY1MTA0NDAzMSwiaWF0IjoxNjUxMDQzMTMxLCJlbWFpbCI6IiJ9.a5JXKJV1_kp5HqAMYdD1WxY1-NBhu2rmhOkslvEqYnezZYXwMKaD5p9wv-ye73Go';
    let user;
    let list=[];
    let body={"accountId": userId,
               };
      let path='collection-service/endpoint/wallet/transfer/payee-merchant/accountId';
      //console.log(this.state.token);
      let res = await ApiCall.api(body,token,path);
      //console.log("data",res.result.result);
      //this.setState({list: res.result.data});
      list= res.result.data;
      let modData= {};
      let convertList= [];
      list.map((data)=>{
        const roleBasedHeading = [
					role === ROLE.PAYEE && {
						rightHeading: `${data.merchant.name}`,
						rightSubHeading: `${data.merchant.userId}`,
					},
					role === ROLE.MERCHANT && {
						rightHeading: `${data.payee.name}`,
						rightSubHeading: `${data.payee.userId}`,
					},
					{},
				].find((i) => i);
				const roleBasedData = [
					role === ROLE.PAYEE && [
						{
							label: 'Merchant Name',
							value: data.merchant.name,
						},
						{
							label: 'Merchant ID',
							value: data.merchant.userId,
						}
					],
					role === ROLE.MERCHANT && [
						{
							label: 'Payee Name',
							value: data.payee.name,
						},
						{
							label: 'Payee ID',
							value: data.payee.userId,
						}
					],
					[],
				].find((i) => i);
        const createdAt = moment(data.requestTime).format('lll');
          modData={
            title: `BDT ${data.transferAmount} (${data.apiCallStatus})`,
					  subTitle: createdAt,
            ...roleBasedHeading,
            data: [
              {
                label: 'Date-time',
                value: createdAt
              },
              {
                label: 'Status',
                value: data.apiCallStatus
              },
              {
                label: 'Amount',
                value: data.transferAmount
              },
              {
                label: 'Merchant',
                value: data.merchant.userId
              },
              {
                label: 'Merchant name',
                value: data.merchant.name
              },
              {
                label: 'Merchant wallet',
                value: data.merchantWallet.walletId
              },
              {
                label: 'Payee',
                value: data.payee.userId
              },
              {
                label: 'Payee name',
                value: data.payee.name
              },
              {
                label: 'Payee wallet',
                value: data.payeeWallet.walletId
              }
            ]
          }
        convertList.push(modData);
      });
      return convertList;
  },
  getManagerCreditTransferList : async (token,userId,role) => {
    //let token= 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJNYXhpcyBDUCIsImV4cCI6MTY1MTA0NDAzMSwiaWF0IjoxNjUxMDQzMTMxLCJlbWFpbCI6IiJ9.a5JXKJV1_kp5HqAMYdD1WxY1-NBhu2rmhOkslvEqYnezZYXwMKaD5p9wv-ye73Go';
    let user;
    let list=[];
    let body={"accountId": userId,
               };
      let path='collection-service/endpoint/wallet/cpmanagertransfer/accountId';
      //console.log(this.state.token);
      let res = await ApiCall.api(body,token,path);

      list= res.result.data;
      let modData= {};
      let convertList= [];
      list.map((data)=>{
        //const createdAt = moment(data.dateTime).format('llll');
        //let role= this.state.role;
          modData={
            title: `BDT ${data.transferAmount}`,
				    subTitle: moment(data.requestTime).format('llll'),
				    rightSubHeading: role == ROLE.CASHPOINT? data.manager.userId : data.cashpoint.userId,
				    rightHeading: role == ROLE.CASHPOINT? data.manager.name : data.cashpoint.name,
				    data: [
              {
                value: `BDT ${data.transferAmount}`,
                label: 'Amount',
              },
              {
                value: moment(data.requestTime).format('llll'),
                label: 'Created At',
              },
				    ],
          }
        convertList.push(modData);
      });
      return convertList;
  },
  getMerchantCreditTransferList : async (token,userId,role) => {
    //let token= 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJNYXhpcyBDUCIsImV4cCI6MTY1MTA0NDAzMSwiaWF0IjoxNjUxMDQzMTMxLCJlbWFpbCI6IiJ9.a5JXKJV1_kp5HqAMYdD1WxY1-NBhu2rmhOkslvEqYnezZYXwMKaD5p9wv-ye73Go';
    let user;
    let list=[];
    let body={"accountId": userId,
               };
      let path='collection-service/endpoint/wallet/bhtopup/accountId';
      //console.log(this.state.token);
      let res = await ApiCall.api(body,token,path);

      list= res.result.data;
      let modData= {};
      let convertList= [];
      list.map((data)=>{
        //const createdAt = moment(data.dateTime).format('llll');
        //let role= this.state.role;
          modData={
            title: `BDT ${data.transferAmount}`,
				    subTitle: moment(data.requestTime).format('llll'),
				    rightSubHeading: role == ROLE.MERCHANT? data.cashpoint.userId : data.merchant?data.merchant.userId: '',
			    	rightHeading: role == ROLE.MERCHANT? data.cashpoint.name : data.merchant?data.merchant.name: '',
            data: [
              {
                value: `BDT ${data.transferAmount}`,
                label: 'Amount',
              },
              {
                value: moment(data.requestTime).format('llll'),
                label: 'Created At',
              },
            ],
          }
        convertList.push(modData);
      });
      return convertList;
  },
  getAttendanceList : async (token,userId,role) => {
    //let token= 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJNYXhpcyBDUCIsImV4cCI6MTY1MTA0NDAzMSwiaWF0IjoxNjUxMDQzMTMxLCJlbWFpbCI6IiJ9.a5JXKJV1_kp5HqAMYdD1WxY1-NBhu2rmhOkslvEqYnezZYXwMKaD5p9wv-ye73Go';
    let user;
    let list=[];
    let body={"callerUserId": userId,
               };
      let path='collection-service/endpoint/attendance/get-list';
      //console.log(this.state.token);
      let res = await ApiCall.api(body,token,path);

      list= res.result.data;
      let modData= {};
      let convertList= [];
      list.map((data)=>{
        const createdAt = moment(data.generationDateTimeString).add(6,'hours').format('llll');
        //let role= this.state.role;
          modData={
            title: `BDT ${data.fare}`,
            subTitle: data.transportationMode,
            rightSubHeading: data.area,
            rightHeading: data.generationDateTimeLong,
            data: [
              {
                value: `BDT ${data.fare}`,
                label: 'Amount',
              },
              {
                value: createdAt,
                label: 'Created At',
              },
              {
                value: `${data.area}`,
                label: 'Area',
              },
              {
                value: `${data.latitude}`,
                label: 'Latitude',
              },
              {
                value: `${data.longitude}`,
                label: 'Longitude',
              },
              
				    ],
          }
        convertList.push(modData);
      });
      return convertList;
  },
}