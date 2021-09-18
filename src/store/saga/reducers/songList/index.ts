import songListRoutine from '../../actions/songList'

const initSongListState:IState = {
    isLoading: false,
    songListInfo: ''
}

const songListReducer = (state = initSongListState, action:ActionParams) => {
    switch (action.type) {
        case songListRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            }
        case songListRoutine.SUCCESS:
            return {
                ...state,
                songListInfo: action.payload.plist
            }
        case songListRoutine.FAILURE:
            return {
                ...state,
                songListInfo: action.payload
            }
        case songListRoutine.FULFILL:
            return {
                ...state,
                isLoading: false
            }
        default :
            return state
    }
}

export default songListReducer