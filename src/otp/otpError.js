module.exports = {
    otpAlreadyExist: {
        message: 'OTP not save , old OTP is still valid',
        statusCode: 400
    },
    otpNotFound: {
        message: "That email does not have an OTP generated for it",
        statusCode: 400
    },
    incorrectOTP: {
        message: "incorrect or expired OTP",
        statusCode: 400
    }


}