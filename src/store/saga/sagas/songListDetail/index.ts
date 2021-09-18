import { takeLatest,put,call } from "@redux-saga/core/effects"
import songListDetailRoutine from "../../actions/songListDetail"
import audioRoutine from "../../actions/audioPlay"
import { getSongListDetailServerData } from "../../../../http/API"

function* getSongListDetailData({ specialid, goToSongListDetail }:any) {
    try {
        yield put(songListDetailRoutine.request())
        const songListDetailData:IData = yield call(() => getSongListDetailServerData(specialid))
        console.log('歌单详情', songListDetailData)
        yield put(songListDetailRoutine.success(songListDetailData))
        yield put(audioRoutine.fulfill({ data: songListDetailData.list.list.info }))
        typeof goToSongListDetail === 'function' && goToSongListDetail(songListDetailData)
    } catch (error:any) {
        yield put(songListDetailRoutine.failure(error.message))
    } finally {
        yield put(songListDetailRoutine.fulfill())
    }
}

const songListDetailSaga = () => (function*(){
    yield takeLatest(songListDetailRoutine.TRIGGER, getSongListDetailData)
})


export default songListDetailSaga