module.exports = {
    otpAlreadyExist: {
        message: 'OTP not save , old OTP is still valid',
        statusCode: 400
    },
    otpNotFound: {
        message: "That email does not have an OTP generated for it",
        statusCode: 400
    },
    notMatched: {
        message: "OTP not matched",
        statusCode: 400
    },
    exriredOrlifeEnded: {
        message: "life ended or expired OTP",
        statusCode: 400
    }


}