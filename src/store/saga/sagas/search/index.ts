import { takeLatest,put,call } from "@redux-saga/core/effects"
import searchRoutine from "../../actions/search"
import { getSearchResultData } from "../../../../http/API"


function* getSearchResult({ searchValue, callBack, page }:any) {
    try {
        yield put(searchRoutine.request())
        const searchResult:IData = yield call(() => getSearchResultData(searchValue, page))
        console.log('搜索结果', searchResult)
        yield put(searchRoutine.success({ ...searchResult, searchValue }))
        typeof callBack === 'function' && callBack()
    } catch (error:any) {
        yield put(searchRoutine.failure(error.message))
    } finally {
        yield put(searchRoutine.fulfill())
    }
}


const searchSaga = () => (function*(){
    yield takeLatest(searchRoutine.TRIGGER, getSearchResult)
})

export default searchSaga