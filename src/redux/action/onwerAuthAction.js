export const ownerRegister = (owner) => {
    return {
        type : 'OWNER_REGISTER',
        payload : owner
    }
}

export const ownerEmailVerified = (owner) => {
    return {
        type : 'OWNER_VERIFIED',
        payload : owner
    }
}

export const ownerLogin = (owner) => {
    return {
        type : 'OWNER_LOGIN',
        payload : owner
    }
}

export const ownerLogout = (owner) =>{
    return {
        type : 'OWNER_LOGOUT',
    }
}

