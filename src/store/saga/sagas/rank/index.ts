import { takeLatest, put, call } from "@redux-saga/core/effects"
import rankRoutine from "../../actions/rank"
import { getRankServerData } from "../../../../http/API"


function* fethRankServerData(action: ActionParams) {
    try {
        yield put(rankRoutine.request())
        const rankData: IData = yield call(getRankServerData)
        console.log(rankData)
        yield put(rankRoutine.success(rankData))
    } catch (error: any) {
        yield put(rankRoutine.failure(error.message))
    } finally {
        yield put(rankRoutine.fulfill())
    }
}





const rankSaga = () => (function* () {
    yield takeLatest(rankRoutine.TRIGGER, fethRankServerData)
})



export default rankSaga