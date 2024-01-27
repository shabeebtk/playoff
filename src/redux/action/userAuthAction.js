export const userRegister = (user) => {
    return {
        type : 'USER_REGISTER',
        payload : user
    }
}

export const userLogin = (user) => {
    return {
        type : 'USER_LOGIN',
        payload : user
    }
}

export const userLogout = (user) =>{
    return {
        type : 'USER_LOGOUT',
    }
}

export const userUpdate = (user) =>{
    return {
        type : 'USER_UPDATE',
        payload : user
    }
}

