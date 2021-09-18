import { takeLatest, call, put } from "@redux-saga/core/effects"
import singerRoutine from "../../actions/singer"
import { getSingerInfoData } from "../../../../http/API"

function* getSingerDetailData() {
    try {
        yield put(singerRoutine.request())
        const singerInfo:IData = yield call(getSingerInfoData)
        console.log('0000', singerInfo)
        yield put(singerRoutine.success(singerInfo))
    } catch (error:any) {
        yield put(singerRoutine.failure(error.message))
    } finally {
        yield put(singerRoutine.fulfill())
    }
}


const singerSaga = ()=>(function*(){
    yield takeLatest(singerRoutine.TRIGGER, getSingerDetailData)
})


export default singerSaga

