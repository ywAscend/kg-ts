import singerRoutine from "../../actions/singer"

const initSingerState:IState = {
    isLoading: false,
    singerInfo: ''
}

const singerReducer = (state = initSingerState, action:ActionParams) => {
    switch(action.type){
        case singerRoutine.TRIGGER:
            return{
                ...state,
                isLoading: true
            }
        case singerRoutine.SUCCESS:
            return {
                ...state,
                singerInfo: action.payload.list
            }
        case singerRoutine.FAILURE:
            return{
                ...state,
                singerInfo: action.payload
            }
        case singerRoutine.FULFILL:
            return {
                ...state,
                isLoading:false
            }
        default:
            return state
    }
}

export default singerReducer