export const ownerAddTurf = (venue) => {
    return {
        type : 'OWNER_ADD_TURF',
        payload : venue
    }
}

export const ownerRemoveTurf = (venue) => {
    return {
        type : 'OWNER_REMOVE_TURF',
        payload : venue
    }
}

