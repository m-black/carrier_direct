module.exports = (address) => {
    return {
        'CompanyName': address.company ? address.company : '',
        'AttentionName': address.name ? address.name : '',
        'PhoneNumber': address.phone ? address.phone : '',
        'FaxNumber': address.phone ? address.phone : '',
        'Address': {
            'AddressLine1': address.street1,
            'City': address.city,
            'StateProvinceCode': address.state,
            'PostalCode': address.zip,
            'CountryCode': address.country
        }
    }
}