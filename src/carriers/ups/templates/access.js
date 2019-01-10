module.exports = (credentials) => {
    return {
        AccessLicenseNumber: credentials.access_license_number,
        UserId: credentials.username,
        Password: credentials.password
    }
}