let defaultState={
    visibility: false,
}

const CardState = (state=defaultState, action) => {
    switch(action.type) {
        case 'CARD_STATE':
            return {
                ...state,
                visibility: action.status,
                }
        default:
            return state;
    };
}


export default CardState;