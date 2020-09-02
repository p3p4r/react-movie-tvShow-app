let defaultState={
    data:{},
}

const listPopular = (state=defaultState, action) => {
    switch(action.type){
        case "GET_MOST_POPULAR_SHOWS":
            return{
                ...state,
                 data: action.data
            }
        default:
            return{
                ...state
            }
    }
}

export default listPopular;