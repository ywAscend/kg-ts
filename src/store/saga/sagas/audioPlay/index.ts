import { takeLatest,call,put } from "redux-saga/effects"
import audioRoutine from "../../actions/audioPlay"
import { getSongInfoData } from "../../../../http/API"
import { message } from "antd"

function* updateAudioPlay(action:any) {
    try {
        const { index, hash,playMusic } = action
        const respose: IData = yield call(getSongInfoData, { hash })
        if(respose.errcode===0 && respose.url===''){
            message.error(respose.error)
        }
        yield put(audioRoutine.success({ data: respose, index }))
        playMusic && typeof playMusic === 'function' && playMusic(respose)
    } catch (error:any) {
        yield put(audioRoutine.failure(error.message))
    } finally {

    }
}

export default () =>(function*(){
    yield takeLatest(audioRoutine.TRIGGER, updateAudioPlay)
})