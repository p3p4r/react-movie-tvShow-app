let defaultState={
    status: false,
}

const PlayerState = (state=defaultState, action) => {
    switch(action.type) {
        case 'VIDEO_PLAYER':
            return {
                ...state,
                status: !action.status,
                }
        default:
            return state;
    };
}


export default PlayerState;