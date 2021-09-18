import React, { useEffect,useState } from 'react'
import { useParams,useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import singerListDetailRoutine from '../../store/saga/actions/singerListDetail'
import audioRoutine from '../../store/saga/actions/audioPlay'
import { ImgUrlFilter } from '../../utils/common'
import AudioPlayer from '../../components/audioPlayer'
import { LeftOutlined } from '@ant-design/icons'
import './index.less'


const SingerListDetail:React.FC<{}> = props => {
  const { singerId }:any = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const [playFlag, setPlayFlag] = useState(false)
  const { singerListDetailInfo, singerlistDetailSongs } = useSelector((state:IState) => state.singerListDetailReducer)

  useEffect(() => {
    console.log(singerListDetailInfo, singerlistDetailSongs)
    dispatch({
      type: singerListDetailRoutine.TRIGGER,
      singerId
    })
  }, [singerId])

  const handleSingerListClick = (item:any,index:number) => {
    
      const { hash } = item
      dispatch({
        type: audioRoutine.TRIGGER,
        index,
        hash,
        playMusic
      })
      
  
  }

  const playMusic = (respose:any) => {
    if(respose.errcode===0 && respose.url===''){
      return
    }
    setPlayFlag(true)
  }

  const renderSingerList = () => {
    if (!singerlistDetailSongs) return null
    const listInfo = _.get(singerlistDetailSongs, 'list', '')
    if (!listInfo) return null
    return listInfo.map((item:any, index:number) => {
      return <li key={index} onClick={() => handleSingerListClick(item,index)} >
        <div className='singerName' >{item.filename}</div>
      </li>
    })
  }

  const handleClickBack = ()=> {
    history.goBack()
  }

  return (
    <div className='singerList_Detail'>
      <div className='imgContent'>
        <img src={ImgUrlFilter(singerListDetailInfo.imgurl)} alt='' />
        <div className='backIcon' onClick={handleClickBack}><LeftOutlined style={{fontSize:'30px',color:'#d9d9d9'}} /></div>
        <div className='info'>
          <div className='introduce'>
            <p className='singerName'>{singerListDetailInfo.singername}</p>
            <p className='focus' >关注</p>
          </div>
        </div>
      </div>
      <div className='songListContent'>
        <div className='listDetail'>
          <ul className='lists'>
            {renderSingerList()}
          </ul>
        </div>
      </div>
      <AudioPlayer flag={playFlag} />
    </div>
  )
}

export default SingerListDetail