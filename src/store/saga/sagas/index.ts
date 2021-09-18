import { all,fork} from 'redux-saga/effects'
import newSong from './newSong'
import audioPlay from './audioPlay'
import rankSaga from './rank'
import rankDetailSaga from './rankDetail'
import songListSaga from './songList'
import songListDetailSaga from './songListDetail'
import singerSaga from './singer'
import singListSaga from './singerList'
import singerListDetailSaga from './singerListDetail'
import searchSaga from './search'

const rootSaga = function*(){
    yield all([
        fork(newSong()),
        fork(audioPlay()),
        fork(rankSaga()),
        fork(rankDetailSaga()),
        fork(songListSaga()),
        fork(songListDetailSaga()),
        fork(singerSaga()),
        fork(singListSaga()),
        fork(singerListDetailSaga()),
        fork(searchSaga()),
    ])
}

export default rootSaga