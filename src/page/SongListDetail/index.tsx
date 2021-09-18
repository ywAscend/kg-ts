import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import audioRoutine from '../../store/saga/actions/audioPlay'
import { ImgUrlFilter } from '../../utils/common' 
import SearchCom from '../../components/search'
import MusicList from '../../components/musicList'
import AudioPlayer from '../../components/audioPlayer'
import { LeftOutlined, DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons'
import './index.less'


const SongListDetail:React.FC<{}> = props => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [arrowFlag, setArrowFlag] = useState(false)
    const [playFlag, setPlayFlag] = useState(false)
    const songListDetailData = useSelector((state:IState) => state.songListDetailReducer.songListDetail)
    const { info, list } = songListDetailData

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
        <div className='songListDetail'>
            <SearchCom />
            <div className='detialContent'>
                <div className='navHead'>
                    <LeftOutlined onClick={() => history.goBack()} style={{ fontSize: '25px', color: '#eee' }} />
                    <p className='specialName'>{info.list.specialname}</p>
                </div>
                <div className='detailContent'>
                    <img src={ImgUrlFilter(info.list.imgurl)} alt='' />
                </div>
                <div className='listContent'>
                    <div className={`acticleCommon ${arrowFlag ? 'upacticleContent' : 'acticleContent'}`}>
                        <p>{info.list.intro}</p>
                        <div onClick={() => setArrowFlag(flag => !flag)}>
                            {arrowFlag ? <UpCircleOutlined style={{ fontSize: '28px', color: '#ccc' }} /> : <DownCircleOutlined style={{ fontSize: '28px', color: '#ccc' }} />}
                        </div>
                    </div>
                    <MusicList data={list.list.info} handlePlayFlag={handlePlayFlag} />
                </div>
                <AudioPlayer flag={playFlag} />
            </div>
        </div>
    )
}

export default SongListDetail