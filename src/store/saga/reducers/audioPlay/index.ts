import audioRoutine from "../../actions/audioPlay"

const initState:IState = {
    playDatas: '', //播放总曲目
    musicIndex: 0, //当前播放歌曲索引,默认第一条
    playMusicInfo: '' //当前播放歌曲信息
}

const audioPlayReducer = (state = initState, action:ActionParams) => {
    switch (action.type) {
        case audioRoutine.SUCCESS:
            return {
                ...state,
                playMusicInfo: action.payload.data,
                musicIndex: action.payload.index || 0
            }
        case audioRoutine.FAILURE:
            return {
                ...state,
                data: action.payload
            }
        case audioRoutine.FULFILL:
            return {
                ...state,
                playDatas: action.payload.data
            }
        default:
            return state
    }
}


export default audioPlayReducer
