import newSongReducer from "./newSong"
import audioPlayReducer from './audioPlay'
import rankReducer from './rank'
import rankDetailReudcer from './rankDetail'
import songListReducer from "./songList"
import songListDetailReducer from "./songListDetail"
import singerReducer from './singer'
import singerListReducer from './singerList'
import singerListDetailReducer from "./singerListDetail"
import searchReducer from "./search"

const sagaReducer = {
    newSongReducer,
    audioPlayReducer,
    rankReducer,
    rankDetailReudcer,
    songListReducer,
    songListDetailReducer,
    singerReducer,
    singerListReducer,
    singerListDetailReducer,
    searchReducer
}


export default sagaReducer