const initialState = {
    is_authenticated : false,
    user : null,
    verified : false
}

const userAuthReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'USER_REGISTER':
            return{
                is_authenticated : false,
                verified : false,
                user : action.payload
            }
        case 'USER_LOGIN':
            return{
                is_authenticated : true,
                verified : true,
                user : action.payload
            }
        case 'USER_LOGOUT':
            return{
                is_authenticated : false,
                verified : false,
                user : null
            }
        case 'USER_UPDATE':
            return{
                is_authenticated : true,
                verified : true,
                user : action.payload
            }
        default:
            return state
    }
}


export default userAuthReducer;