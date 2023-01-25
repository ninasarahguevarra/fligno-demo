import { Token } from 'utils/enum'
import backendapi from 'utils/auth'
import isEmpty from 'lodash/isEmpty'

const usePersonalToken = async (payload) => {
    const response = await backendapi('POST', `/auth/login`, payload)
    if (response.status) {
        savePersonalToken(response);
    }
    return response;
}
const useRegistration = async (payload) => {
    const response = await backendapi('POST', `/auth/register`, payload)
    console.warn(response);
    if (response.status) {
        savePersonalToken(response);
    }
    return response;
}

const savePersonalToken = (payload) => {
    const { token, id, name, email } = payload
    const values = {
        id,
        email,
        name,
        token,
    }
    localStorage[Token.Personal] = JSON.stringify(values)
    if (!isEmpty(localStorage.token)) {
        localStorage.removeItem(Token.Personal)
    }
}

export {
    usePersonalToken,
    useRegistration,
}
