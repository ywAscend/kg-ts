import { takeLatest, call, put } from "@redux-saga/core/effects"
import singerListRoutine from "../../actions/singerList"
import { getSingerListServerData } from "../../../../http/API"


function* getSingerListData({ classid }: any) {
    try {
        yield put(singerListRoutine.request())
        const singerListData: IData = yield call(() => getSingerListServerData(classid))
        console.log('歌手列表', singerListData)
        yield put(singerListRoutine.success(singerListData))
    } catch (error: any) {
        yield put(singerListRoutine.failure(error.message))
    } finally {
        yield put(singerListRoutine.fulfill())
    }
}

const singListSaga = () => (function*(){
    yield takeLatest(singerListRoutine.TRIGGER, getSingerListData)
})

export default singListSaga