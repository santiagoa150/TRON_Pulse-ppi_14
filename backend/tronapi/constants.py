from enum import Enum


class TronApiConstants(Enum):
    SUN_TO_TRX = 1000000
    REPLACE_ADDRESS_PARAM = '${address}'
    GET_TRM_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
    GET_BALANCE_URL = 'https://api.shasta.trongrid.io/v1/accounts/${address}'
    GET_TRANSACTIONS_URL = 'https://api.shasta.trongrid.io/v1/accounts/${address}/transactions'
    VALIDATE_ADDRESS_URL = 'https://api.shasta.trongrid.io/wallet/validateaddress'
