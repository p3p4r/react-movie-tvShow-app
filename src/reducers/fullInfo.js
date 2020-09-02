let defaultState={
    data:{},
}

const fullInfo = (state=defaultState, action) => {
    switch(action.type){
        case "GET_POPULAR_SHOW_INFO":
            return{
                ...state,
                data: {
                    data: action.data.data,
                    show: action.data.show
                }
            }
        default:
            return{
                ...state
            }
    }
}

export default fullInfo;