const initialState = {
    is_authenticated : false,
    owner : null,
    verified : false
}

const ownerAuthReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'OWNER_REGISTER':
            return{
                is_authenticated : false,
                verified : false,
                owner : action.payload
            }
        case 'OWNER_VERIFIED':
            return{
                is_authenticated : false,
                verified : true,
                owner : action.payload
            }
        case 'OWNER_LOGIN':
            return{
                is_authenticated : true,    
                owner : action.payload
            }
        case 'OWNER_LOGOUT':
            return{
                is_authenticated : false,
                verified : false,
                owner : null
            }
        default:
            return state
    }
}


export default ownerAuthReducer;