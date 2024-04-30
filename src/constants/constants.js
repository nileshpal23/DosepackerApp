export const errorMsg = {
    replenish_screen_expires_soon: 'Due to an approaching expiration date of the drugs, this canister cannot be replenished.',
    replenish_screen_expired: 'The drug has expired. Kindly discard the drug(s) in order to replenish the canister.'
}

export const canister_exp_status_style = {
    0: {
        'idBox': {
            backgroundColor: 'rgba(236, 0, 0, 1)',
            color: 'white',
            height: '200%',
            width: '20%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginRight: 10,
        },
        'expBox': {
            backgroundColor: 'rgba(236, 0, 0, 0.15)',
            height: '200%',
            width: '20%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            position: "absolute",
            marginLeft: '25%',
        },
        'expText': {
            color: 'red',
        },
        'idText': {
            color: 'white',
        },
        'text': 'Expired',
        errorMsg:errorMsg.replenish_screen_expired,
    },
    1: {
        'idBox': {
            backgroundColor: 'rgba(231, 174, 5, 1)',
            color: 'white',
            height: '200%',
            width: '20%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginRight: 10,
        },
        'expBox': {
            backgroundColor: 'rgba(231, 174, 5, 0.15)',
            height: '200%',
            width: '20%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            position: "absolute",
            marginLeft: '25%'
        },
        'expText': {
            color: 'rgba(231, 174, 5, 1)',
        },
        'idText': {
            color: 'white',
        },
        'text': 'Expires Soon',
        errorMsg:errorMsg.replenish_screen_expires_soon,
    },
    2: {
        'idBox': {
            backgroundColor: 'white',
            color: 'white',
            height: '200%',
            width: '20%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginRight: 10,
            borderColor: 'grey',
            borderWidth: 1
        },
        'expBox': {
            // backgroundColor: 'rgba(231, 174, 5, 1)',
            height: '200%',
            width: '20%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            backfaceVisibility: 'hidden',
            position: "absolute",
            marginLeft: '25%'
        },
        'expText': {
            // color: 'red',
        },
        'idText': {
            color: 'black',
        },
        'text': '',
        errorMsg:'',
    }
}

export const drugSkipReasons = ['Not enough drug quantity',
    'Not compatible with canister',
    'Broken canister',
    'Issue with canister EEPROM',
    'Other']


export const scanType = {
    SCAN_TYPE_GROUP_ID: 19,
    USER_ENTERED: 77,
    BARCODE: 78,
    DATA_MATRIX: 79,
    CANISTER_SCAN: 256,
    QR_SCAN: 273,
    UPC_SCAN: 275,
    REUSE_PACK_SCAN: 298,
    VIAL_SCAN: 299
}

export const company_id = 2;
export const user_id = 13;
export const system_id = 41;