
import { call, put, takeEvery } from "@redux-saga/core/effects"
import { fetchNewSong } from "../../../../http/API"
import newSongRoutine from "../../actions/newSong"
import audioRoutine from '../../actions/audioPlay'
type dataType = {
    banner: Object,
    data: Object
}

function* wathNewSong(actions: ActionParams) {
    try {
        yield put(newSongRoutine.request())
        const datas: dataType = yield call(fetchNewSong)
        const { data, banner } = datas
        yield put(audioRoutine.fulfill(datas))
        yield put(newSongRoutine.success({ data, banner }))
    } catch (error:any) {
        yield put(newSongRoutine.failure(error.message))
    } finally {
        yield put(newSongRoutine.fulfill())
    }
}


export default () => (function* () {
    yield takeEvery(newSongRoutine.TRIGGER, wathNewSong)
})