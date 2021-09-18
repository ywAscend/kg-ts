import songListDetailRoutine from "../../actions/songListDetail"

const initSongListDetailState:IState = {
    isLoading: false,
    songListDetail: ''
}

const songListDetailReducer = (state=initSongListDetailState,action:ActionParams) => {
    switch(action.type){
        case songListDetailRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            }
        case songListDetailRoutine.SUCCESS:
            return{
                ...state,
                songListDetail: action.payload
            }
        case songListDetailRoutine.FULFILL:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default songListDetailReducer