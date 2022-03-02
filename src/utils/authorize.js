import intializeLogin  from './common/intializeLogin'

const authorize = async (rollNumber, password) => {
    const { error, cookieString } = await intializeLogin(rollNumber, password)
    console.log("In Authorize")

    if(error){
        return  {
            error: error
        }
    }
    return {
        token: cookieString,
    }
}

export default authorize