import React, { useEffect, useState, useRef,memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import songListRoutine from '../../store/saga/actions/songList'
import songListDetailRoutine from '../../store/saga/actions/songListDetail'
import { ImgUrlFilter } from '../../utils/common'
import { message } from 'antd'
import { RightOutlined, CustomerServiceOutlined } from '@ant-design/icons'
import './index.less'

const SongList:React.FC<{}> = props => {
    const history = useHistory()
    const [specialId, SetSpecialId] = useState('')
    const statusRef:any = useRef(null)
    const dispatch = useDispatch()
    const songListData = useSelector((state:IState) => state.songListReducer.songListInfo)

    useEffect(() => {
        dispatch({
            type: songListRoutine.TRIGGER
        })
    // eslint-disable-next-line
    }, [])
    useEffect(() => {
        statusRef.current = specialId
    }, [specialId])

    const goToSongListDetail = (data:any) => {
        if (data.info && data.list) {
            history.push(`/SongList/${statusRef.current}`)
        } else {
            message.error('请求数据失败')
        }
    }

    const handleSongListClick = ({ specialid }:any) => {
        console.log(`specialid:${specialid}`)
        SetSpecialId(specialid)
        dispatch({
            type: songListDetailRoutine.TRIGGER,
            specialid,
            goToSongListDetail
        })

    }

    const renderSongList = () => {
        const songList = songListData.list && songListData.list.info || ''
        if (!songList || songList.length < 0) return null
        return songList.map((item:any, index:number) => {
            return (
                <li onClick={() => handleSongListClick(item)} key={index}>
                    <div className='detailConent'>
                        <div className='imgContent'><img src={ImgUrlFilter(item.imgurl)} alt='' /></div>
                        <div className='specialname'>
                            <p>{item.specialname}</p>
                            <p><CustomerServiceOutlined style={{ color: 'grey' }} /><span className='playcount'>{item.playcount}</span></p>
                        </div>
                    </div>
                    <div className='rightIcon'><RightOutlined style={{ fontSize: '20px', color: '#ccc' }} /></div>
                </li>
            )
        })
    }

    return (
        <div className='songList'>
            <ul className='songListContent'>
                {renderSongList()}
            </ul>
        </div>
    )
}

export default memo(SongList)

