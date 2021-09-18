import { takeLatest,call,put } from "@redux-saga/core/effects"
import songListRoutine from "../../actions/songList"
import { getSongListServerData } from "../../../../http/API"


function* getSongListData() {
    try {
        yield put(songListRoutine.request())
        const songListData:IData = yield call(getSongListServerData)
        console.log('歌单', songListData)
        yield put(songListRoutine.success(songListData))

    } catch (error:any) {
        yield put(songListRoutine.failure(error.message))
    } finally {
        yield put(songListRoutine.fulfill())
    }
}

const songListSaga = () =>(function*(){
    yield takeLatest(songListRoutine.TRIGGER, getSongListData)
})

export default songListSaga