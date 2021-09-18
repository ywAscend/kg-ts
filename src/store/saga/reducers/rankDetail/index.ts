import rankDetailRoutine from "../../actions/rankDetail"

const initRankDetailState:IState = {
    isLoading: false,
    rankDetailInfo:''
}

const rankDetailReudcer = (state = initRankDetailState, action:ActionParams) => {
    switch(action.type) {
        case rankDetailRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            }
        case rankDetailRoutine.SUCCESS:
        case rankDetailRoutine.FAILURE:
            return {
                ...state,
                rankDetailInfo: action.payload
            }
        case rankDetailRoutine.FULFILL:
            return {
                ...state,
                isLoading:false
            }
        default:
            return state
    }
}

export default rankDetailReudcer