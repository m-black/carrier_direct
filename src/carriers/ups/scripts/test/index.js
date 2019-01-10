const xml2js = require('xml2js')
const shipment = require('./response')
const addressTemplate = require('../../templates/address')
const authTemplate = require('../../templates/access')

var builder = new xml2js.Builder()

const credentials = {
    username: process.env.UPS_USERNAME,
    password: process.env.UPS_PASSWORD,
    account_number: process.env.UPS_SHIPPER,
    access_license_number: process.env.UPS_ALN
}

let fromAddress = shipment.from_address
let returnAddress = shipment.return_address
let toAddress = shipment.to_address
let parcel = shipment.parcel
let customs_info = shipment.customs_info

let authReq = {
    'AccessRequest': {
        'AccessLicenseNumber': credentials.access_license_number,
        'UserId': credentials.username,
        'Password': credentials.password,
        $: {
            'xml:lang': 'en-US',
        }
    }
}

let rateReq = {
    'RatingServiceSelectionRequest': {
        $: {
            'xml:lang': 'en-US'
        },
        'Request': {
            'TransactionReference': {
                'CustomerContext': 'Your Customer Context'
            },
            'RequestAction': 'Rate',
            'RequestOption': 'Rate'
        },
        'Shipment': {
            'Shipper': {
                'Name': returnAddress.company ? returnAddress.company : '',
                'AttentionName': returnAddress.name ? returnAddress.name : '',
                'PhoneNumber': returnAddress.phone ? returnAddress.phone : '',
                'FaxNumber': returnAddress.phone ? returnAddress.phone : '',
                'ShipperNumber': credentials.account_number,
                'Address': addressTemplate(returnAddress)['Address']
            },
            'ShipTo': {
                ...addressTemplate(toAddress)
            },
            'ShipFrom': {
                ...addressTemplate(fromAddress)
            },
            'Package': {}
        }
    }
}


var xml1 = builder.buildObject(authReq);
var xml2 = builder.buildObject(rateReq);

console.log(xml1, xml2)