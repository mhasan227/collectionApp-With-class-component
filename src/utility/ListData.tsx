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

  }
}