const intializeLogin = require('./common/intializeLogin')

const authorize = async (rollNumber, password) => {
    const { error, cookieString } = await intializeLogin(rollNumber, password)

    if(error){
        return  {
            error
        }
    }
    return {
        token: cookieString,
    }
}

module.exports = authorize