from enum import Enum


class ApiConstants(str, Enum):
    ADDRESS_IS_NOT_A_CONTRACT = 'ADDRESS_IS_NOT_A_CONTRACT'
    BAD_REQUEST_ERROR = 'BAD_REQUEST_ERROR'
    TRANSACTION_ALREADY_EXISTS_ERROR = 'TRANSACTION_ALREADY_EXISTS_ERROR'
    CONTRACT_ALREADY_EXISTS_ERROR = 'CONTRACT_ALREADY_EXISTS_ERROR'
    INVALID_ADDRESS_ERROR = 'INVALID_ADDRESS_ERROR'
    UNAUTHORIZED_ERROR = 'UNAUTHORIZED_ERROR'
    USER_ALREADY_EXISTS_ERROR = 'USER_ALREADY_EXISTS_ERROR'
    USER_NOT_FOUND_ERROR = 'USER_NOT_FOUND_ERROR'
