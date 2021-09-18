import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import newSongRoutine from "../../store/saga/actions/newSong";
import audioRoutine from '../../store/saga/actions/audioPlay'
import Banner from '../../components/banner'
import MusicList from '../../components/musicList'
import AudioPlayer from '../../components/audioPlayer'
interface IProps {

}

const NewSong: React.FC<IProps> = props => {
    const dispatch = useDispatch()
    const { list, banner } = useSelector((state:IState) => state.newSongReducer)
    const [playFlag, setPlayFlag] = useState(false)
    useEffect(() => {
        dispatch({
            type: newSongRoutine.TRIGGER,
            payload: {}
        })
    }, [])

    const handlePlayFlag = (index: number, hash: string) => {
        setPlayFlag(true)
        dispatch({
            type: audioRoutine.TRIGGER,
            index,
            hash
        })
    }

    return (
        <div style={{ backgroundColor: '#fff' }}>
            <Banner data={banner} />
            <MusicList data={list} handlePlayFlag={handlePlayFlag} />
            <AudioPlayer flag={playFlag} />
        </div>
    )
}

export default memo(NewSong)

