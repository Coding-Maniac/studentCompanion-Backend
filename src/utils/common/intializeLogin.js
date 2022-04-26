import axios from 'axios'
const initializeLogin = async (rollNumber, password) => {
  const getCookiesString = cookieArr => {
    const cookieObj = {}
    cookieArr.map(ele => {
      const splitEle = ele.split('=')
      cookieObj[splitEle[0]] = splitEle[1].split(';')[0]
    })

    let cookieString = ''

    for (let i in cookieObj) {
      cookieString += i
      cookieString += '='
      cookieString += cookieObj[i]
      cookieString += '; '
    }
    return cookieString
  }

  const fetchCookies = async () => {
    return await axios
      .get('https://studentportal.hindustanuniv.ac.in/home.htm')
      .then(res => {
        return getCookiesString(res.headers['set-cookie'])
      })
  }

  const authorizeCookies = async cookieString => {
    const formData = new URLSearchParams({
      username_temp: rollNumber,
      username: `HITS_${rollNumber}`,
      password: password
    })
    return await axios
      .post('https://studentportal.hindustanuniv.ac.in/home.htm', formData, {
        headers: {
          Cookie: cookieString
        },
        withCredentials: true
      })
      .then(res => {
        if (res.headers['set-cookie']) {
          return {
            error: 'Username or Password Invalid'
          }
        } else {
          return {
            error: '',
            cookieString
          }
        }
      })
      .catch(err => {
        return {
          error: err
        }
      })
  }

  const cookieString = await fetchCookies()
  return await authorizeCookies(cookieString)
}

// initializeLogin(18113075, 123456)
export default initializeLogin
