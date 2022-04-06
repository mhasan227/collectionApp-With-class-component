import {actions} from './slice';

export const login = (
  username: string,
  password: string,
  correlationId = 'login',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/authentication-service/endpoint/oauth/login',
      method: 'post',
      body: {username, password},
    },
  });
export const resetPassword = (
  userId: string,
  correlationId = 'resetPassword',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/authorization-service/endpoint/generate-otp',
      method: 'post',
      body: {userId},
    },
  });
export const submitOtp = (
  otpValidationId: string,
  otpValue: string,
  correlationId = 'submitOtp',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/authorization-service/endpoint/submit-otp',
      method: 'post',
      body: {otpValidationId, otpValue},
    },
  });
export const changePassword = (
  userId: string = 'shovon',
  newPassword: string,
  correlationId = 'changePassword',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/authorization-service/endpoint/user/password-update',
      method: 'post',
      body: {userId, newPassword},
    },
  });
export const logout = (correlationId = 'unAuthenticateUser') =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/users/logout/',
      method: 'get',
    },
  });
export const getWalletByUserId = (
  accountId: string,
  correlationId = 'getWalletByUserId',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/accountId',
      method: 'post',
      body: {
        accountId,
      },
    },
  });
export const getWalletBalanceByTransactionAccountId = (
  transactionAccountId: string,
  walletPin: string,
  correlationId = 'getWalletBalanceByTransactionAccountId',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/balance',
      method: 'post',
      body: {
        transactionAccountId,
        walletPin,
      },
    },
  });
export const getBankList = (correlationId = 'getBankList') =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/banks',
      method: 'get',
    },
  });
export const getAgentList = ( accountId: string, correlationId = 'getAgentList') =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/user/cpagents',
      method: 'post',
      body: {accountId},
    },
  });
export const getAgentListMM = ( accountId: string, correlationId = 'getAgentListMM') =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/authorization-service/endpoint/user/agent',
      method: 'post',
      body: {accountId},
    },
  });
export const getAllMerchantList = (
  accountId: string,
  correlationId = 'getAllMerchantList',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/authorization-service/endpoint/user/merchant',
      method: 'post',
      body: {accountId},
    },
  });

  export const getAllRiderList = (
    accountId: string,
    correlationId = 'getAllRiderList',
  ) =>
    actions.performHttpCall({
      correlationId,
      payload: {
        url: '/authorization-service/endpoint/user/rider',
        method: 'post',
        body: {accountId},
      },
    });

export const getAllPayeeList = (
  accountId: string,
  correlationId = 'getAllPayeeList',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/authorization-service/endpoint/user/payee',
      method: 'post',
      body: {accountId},
    },
  });
export const setWalletPIN = (
  walletId: string,
  walletPin: string,
  correlationId = 'setWalletPIN',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/pin-setup',
      method: 'post',
      body: {walletId, walletPin},
    },
  });
export const setWalletOTP = (
  walletId: string,
  walletOTP: string,
  correlationId = 'setWalletOTP',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/otp-setup',
      method: 'post',
      body: {walletId, walletOTP},
    },
  });
export const getAlCollectionType = (correlationId = 'getAlCollectionType') =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/collection/type',
      method: 'get',
    },
  });
export const collectionServiceCreateCPAgentTransferRequest = (
  agentId: string,
  cashpointId: string,
  transferAmount: string,
  walletPin: string,
  correlationId = 'collectionServiceCreateCPAgentTransferRequest',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/transfer/dse-agent',
      method: 'post',
      body: {
        agentId,
		cashpointId,
        transferAmount,
        walletPin
      },
    },
  });
export const CashoutRequest = (
  agentId: string,
  cashoutMerchantRequestAmount: integer,
  merchantId: string,
  merchantWalletPIN: string,
  correlationId = 'CashoutRequest',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/cashout',
      method: 'post',
      body: {
        agentId,
		cashoutMerchantRequestAmount,
        merchantId,
        merchantWalletPIN
      },
    },
  });
export const collectionServiceCreateAgentCPTransferRequest = (
  agentId: string,
  transferAmount: string,
  walletPin: string,
  correlationId = 'collectionServiceCreateCPAgentTransferRequest',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/transfer/agent-dse',
      method: 'post',
      body: {
        agentId,
        transferAmount,
        walletPin
      },
    },
  });

export const collectionServiceCreateLiftingRequest = (
  cashpointId: string,
  amount: string,
  bankDetails: {
    [key: string]: any;
  },
  reference: string,
  comments: string,
  currency: string,
  correlationId = 'collectionServiceCreateLiftingRequest',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/lifting',
      method: 'post',
      body: {
        cashpointId,
        amount,
        depositeSlipImage: '',
        currencyType: 'MFS',
        currency: currency,
        bankDetails,
        reference,
        comments,
        approvalDetails: {
          approvalDecision: '',
          decisionTime: null,
          approvalTransactionId: '',
          liftingAccountId: '',
          liftingWalletId: '',
        },
      },
    },
  });
export const collectionServiceCollection = (
  merchantId: string,
  payeeId: string,
  cashPointId: string,
  collectionType: string,
  invoiceNo: string,
  amount: string,
  reference1: string,
  reference2: string,
  reference3: string,
  collectionPin: string,
  payeePin: string,
  walletType: string,
  correlationId = 'collectionServiceCollection',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/collection',
      method: 'post',
      body: {
        merchantId,
        payeeId,
        cashPointId,
        currency: walletType,
        collectionType,
        invoiceNo,
        amount,
        reference1,
        reference2,
        reference3,
        document: 'n/a',
        collectionPin,
        payeePin,
        decision: 'pending',
        transactionEngineId: '',
        transactionEngineReply: '',
      },
    },
  });
export const walletTransfer = (
  userId: string,
  transferAmount: string,
  walletPin: string,
  transferWalletId: string,
  transferType: string,
  correlationId = 'walletTransfer',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/transfer-by-type',
      method: 'post',
      body: {
        userId,
        transferAmount,
        walletPin,
        transferWalletId,
        transferType,
      },
    },
  });
export const getEncasementList = (
  accountId: string,
  correlationId = 'getEncasementList',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/encashment/accountId',
      method: 'post',
      body: {
        accountId,
      },
    },
  });
export const getCollectionList = (
  accountId: string,
  correlationId = 'getCollectionList',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/collection/accountId',
      method: 'post',
      body: {
        accountId,
      },
    },
  });
export const getLiftingRequestsList = (
  accountId: string,
  correlationId = 'getLiftingRequestsList',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/lifting/accountId',
      method: 'post',
      body: {
        accountId,
      },
    },
  });
export const getCashpointDSEAgentTransferList = (
  accountId: string,
  correlationId = 'getCashpointDSEAgentTransferList',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/cpagenttransfer/accountId',
      method: 'post',
      body: {
        accountId,
      },
    },
  });
export const getPayeeMerchantTransferList = (
  accountId: string,
  correlationId = 'getPayeeMerchantTransferList',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/transfer/payee-merchant/accountId',
      method: 'post',
      body: {
        accountId,
      },
    },
  });
export const getCashoutList = (
  accountId: string,
  correlationId = 'getCashoutList',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/cashout/accountId',
      method: 'post',
      body: {
        accountId,
      },
    },
  });//

export const collectionServiceCreatePayeeMerchantTransferRequest = (
  payeeId: string,
  merchantId: string,
  transferAmount: string,
  walletPin: string,
  currency: string,
  comment: string,
  correlationId = 'collectionServiceCreatePayeeMerchantTransferRequest',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/transfer/payee-merchant',
      method: 'post',
      body: {
        payeeId,
        merchantId,
        transferAmount,
        walletPin,
        currency,
        comment
      },
    },
  });

export const setFirebaseToken = (
    userId: string,
    token: string,
    correlationId = 'setFirebaseToken',
) =>
    actions.performHttpCall({
        correlationId,
        payload: {
            url: '/collection-service/endpoint/firebase/set-firebase-token',
            method: 'post',
            body: {
                userId,
                token,
            },
        },
    });

export const getCashpointCurrencyTransferList = (
  accountId: string,
  correlationId = 'getCashpointCurrencyTransferList',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/transfer/accountId',
      method: 'post',
      body: {
        accountId,
      },
    },
  });
export const getManagerCreditTransferList = (
  accountId: string,
  correlationId = 'getManagerCreditTransferList',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/cpmanagertransfer/accountId',
      method: 'post',
      body: {
        accountId,
      },
    },
  });
export const getMerchantCreditTransferList = (
  accountId: string,
  correlationId = 'getMerchantCreditTransferList',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/bhtopup/accountId',
      method: 'post',
      body: {
        accountId,
      },
    },
  });

export const getAllManagerList = (correlationId = 'getAllManagerList') =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/authorization-service/endpoint/user/get-all-managers',
      method: 'get',
    },
  });

export const cashpointManagerTransferRequest = (
  toUserId: string,
  transferAmount: string,
  transferType: string,
  userId: string,
  correlationId = 'cashpointManagerTransferRequest',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/transfer-by-type',
      method: 'post',
      body: {
        toUserId,
        transferAmount,
        transferType,
        userId
      },
    },
  });
  
export const topupBHRequest = (
  toUserId: string,
  transferAmount: string,
  userId: string,
  correlationId = 'topupBHRequest',
) =>
  actions.performHttpCall({
    correlationId,
    payload: {
      url: '/collection-service/endpoint/wallet/topupbh',
      method: 'post',
      body: {
        toUserId,
        transferAmount,
        userId
      },
    },
  });

  export const topupRiderRequest = (
    toUserId: string,
    transferAmount: string,
    userId: string,
    correlationId = 'topupRiderRequest',
  ) =>
    actions.performHttpCall({
      correlationId,
      payload: {
        url: '/collection-service/endpoint/wallet/topuprider',
        method: 'post',
        body: {
          toUserId,
          transferAmount,
          userId
        },
      },
    });
    export const getAttendanceList = (
      accountId: string,
      //filterUserId: string,
     // callerUserId: string,
      //dateStringFrom: string,
     // dateStringTo: string,
      correlationId = 'getAttendanceList',
    ) =>
      actions.performHttpCall({
        correlationId,
        payload: {
          url: '/collection-service/endpoint/attendance/get-list',
          method: 'post',
          body: {
            callerUserId: accountId,
          },
        },
      });
    export const attandanceSystem = (
      transportationMode: string,
      fare: double,
      area: string,
      userId: string,
      pictureB64: string,
      longitude: string,
      latitude: string,
      correlationId = 'attandanceSystem',
    ) =>
      actions.performHttpCall({
        correlationId,
        payload: {
          url: '/collection-service/endpoint/attendance/new-entry-app',
          method: 'post',
          body: {
            transportationMode,
            fare,
            area,
            userId,
            pictureB64,
            longitude,
            latitude
          },
        },
      });

      export const uploadFile = (
        file: FormData,
        correlationId = 'uploadFile',
      ) =>
        actions.performHttpCall({
          correlationId,
          payload: {
            url: '/collection-service/endpoint/attendance/new-entry-app',
            method: 'post',
            body: {
              transportationMode,
              fare,
              area,
              userId,
              pictureB64,
              longitude,
              latitude
            },
          },
        });

        export const getMerchantPayeeList = (
          accountId: string,
          correlationId = 'getMerchantPayeeList',
        ) =>
          actions.performHttpCall({
            correlationId,
            payload: {
          url: '/authorization-service/endpoint/user/payee',
          method: 'post',
          body: {
            accountId
          },
            },
          });
        
        export const pullRequest = (
          merchantId: string,
          payeeId: string,
          transferAmount: string,
          currency: string,
          comment: string,
          correlationId = 'pullRequest',
        ) =>
          actions.performHttpCall({
            correlationId,
            payload: {
          url: '/collection-service/endpoint/wallet/transfer/payee-merchant-pull',
          method: 'post',
          body: {
            merchantId,
            payeeId,
            transferAmount,
            currency,
            comment
          },
            },
          });
        
        export const pullSubmit = (
          id: string,
          otp: string,
          correlationId = 'pullSubmit',
        ) =>
          actions.performHttpCall({
            correlationId,
            payload: {
          url: '/collection-service/endpoint/wallet/transfer/payee-merchant-pull-confirm',
          method: 'post',
          body: {
            id,
            otp,
          },
            },
          });
        export const getPayeeWalletByMerchantId = (
            accountId: string,
            correlationId = 'getPayeeWalletByMerchantId',
          ) =>
            actions.performHttpCall({
              correlationId,
              payload: {
            url: '/collection-service/endpoint/wallet/merchantId',
            method: 'post',
            body: {
              accountId,
            },
              },
            });