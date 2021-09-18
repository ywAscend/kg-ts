import { takeLatest,call,put } from "@redux-saga/core/effects"
import rankDetailRoutine from "../../actions/rankDetail"
import audioRoutine from "../../actions/audioPlay"
import { getRankDetailServerData } from "../../../../http/API"
function* getRankDetailData({ rankid, curPage, totalPage, json, goToRankDetail}:any) {
    try {
        yield put(rankDetailRoutine.request())
        const rankDetailData:IData = yield call(getRankDetailServerData, { rankid, curPage, totalPage, json })
        console.log('排名详情', rankDetailData)
        yield put(rankDetailRoutine.success(rankDetailData))
        const songList = (rankDetailData.songs && rankDetailData.songs.list || '')
        yield put(audioRoutine.fulfill({ data: songList }))
        typeof goToRankDetail === 'function' && goToRankDetail(rankDetailData)
    } catch (error:any) {
        yield put(rankDetailRoutine.failure(error.message))
    } finally {
        yield put(rankDetailRoutine.fulfill())
    }
}


const rankDetailSaga = () => (function*(){
    yield takeLatest(rankDetailRoutine.TRIGGER, getRankDetailData)
})

export default rankDetailSaga