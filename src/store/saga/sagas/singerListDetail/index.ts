import { takeLatest,put,call } from "@redux-saga/core/effects"
import singerListDetailRoutine from "../../actions/singerListDetail"
import audioRoutine from "../../actions/audioPlay"
import { getSingerListDetailServerData } from "../../../../http/API"


function* getSingerListDetailData({ singerId }:any) {
    try {
        yield put(singerListDetailRoutine.request())
        const singerListDetailData:IData = yield call(() => getSingerListDetailServerData(singerId))
        yield put(audioRoutine.fulfill({data:singerListDetailData.songs.list}))
        yield put(singerListDetailRoutine.success(singerListDetailData))
    } catch (error:any) {
        yield put(singerListDetailRoutine.failure(error.message))
    } finally {
        yield put(singerListDetailRoutine.fulfill())
    }
}

const singerListDetailSaga = () => (function*() {
    yield takeLatest(singerListDetailRoutine, getSingerListDetailData)
})

export default singerListDetailSaga