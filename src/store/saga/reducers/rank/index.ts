import rankRoutine from "../../actions/rank"

const initRankData: IState = {
    isLoading: false,
    rankList: '',
}

const rankReducer = (state = initRankData, action: ActionParams) => {
    switch (action.type) {
        case rankRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            }
        case rankRoutine.SUCCESS:
            console.log(action)
            return {
                ...state,
                rankList: action.payload.rank
            }
        case rankRoutine.FULFILL:
            return {
                ...state,
                isLoading: false
            }
        case rankRoutine.FAILURE:
            return {
                ...state,
                rankList: action.payload
            }
        default:
            return state
    }
}

export default rankReducer