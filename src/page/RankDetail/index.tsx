import React, {useState,memo } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import audioRoutine from '../../store/saga/actions/audioPlay'
import { ImgUrlFilter } from '../../utils/common'
import { LeftOutlined } from '@ant-design/icons'
import SearchCom from '../../components/search'
import MusicList from '../../components/musicList'
import AudioPlayer from '../../components/audioPlayer'
import './index.less'

const RankDetail:React.FC<{}> = props => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [playFlag, setPlayFlag] = useState(false)
    const rankDetailData = useSelector((state:IState) => state.rankDetailReudcer.rankDetailInfo)
    const { info, songs } = rankDetailData
    const updateTime = () => (songs && songs.list[0].addtime.slice(0, 10) || '')

    const handlePlayFlag = (index:number,hash:string) => {
      setPlayFlag(true)
        //更新歌曲信息
        dispatch({
            type: audioRoutine.TRIGGER,
            index,
            hash
        })
    }

    return (
        <div className='rankDetail'>
            <SearchCom />
            <div className='rankDetailContent'>
                <div className='navHead'>
                    <LeftOutlined onClick={() => history.goBack()} style={{ fontSize: '25px', color: '#eee' }} />
                    <p className='rankName'>{ info.rankname || '酷狗飙升榜'}</p>
                </div>
                <div className='detailContent'>
                    <img src={ImgUrlFilter(info.banner7url)} />
                    <p>上次更新时间：{updateTime()}</p>
                </div>
                <div className='listContent'>
                    <MusicList data={songs.list} handlePlayFlag = {handlePlayFlag} type={'rankDetail'} />
                </div>
                <AudioPlayer flag={playFlag} />
            </div>
        </div>
    )
}

export default memo(RankDetail)