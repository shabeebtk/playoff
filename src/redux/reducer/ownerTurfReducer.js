const initialState = {
    ownernVenue : null
}

const onwerTurfReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'OWNER_ADD_TURF':
            return {
                venue : action.payload
            }

        case 'OWNER_REMOVE_TURF':
            return {
                venue : null
            }

        default:
            return state
    }
}

export default onwerTurfReducer