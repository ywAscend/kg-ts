import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import rankRoutine from '../../store/saga/actions/rank'
import rankDetailRoutine from '../../store/saga/actions/rankDetail'
import { ImgUrlFilter } from '../../utils/common'
import { message } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import './index.less'

interface IProps{}

const Rank:React.FC<IProps> = props => {
    const history = useHistory()
    const [rankid,setRankid] = useState('')
    const dispatch = useDispatch()
    const rankData = useSelector((state:any) => state.rankReducer?.rankList)
    useEffect(() => {
        dispatch({
            type: rankRoutine.TRIGGER
        })
    // eslint-disable-next-line
    }, [])
    
    const goToRankDetail = (data:any) => {
        if( data.info && data.songs) {
            history.push(`/RankDetail/${rankid}`)
        } else {
            message.error('请求数据失败')
        }
    }

    const handleRankClick = (rankId:string) => {
        console.log(`rankid:${rankId}`)
        setRankid(rankId)
        dispatch({
            type: rankDetailRoutine.TRIGGER,
            rankid,
            curPage:1,
            totalPage:2,
            json:true,
            goToRankDetail
        })
    }
    const renderList = () => {
        const { list } = rankData
        if (!list || list.length < 0) return null
        return list.map((item:any, index:number) => {
            return (
                <li onClick={()=>handleRankClick(item.rankid)} key={index}>
                    <div className='detailBox'>
                        <div className='imgContent'><img src={ImgUrlFilter(item.banner7url)} /></div>
                        <div className='rankName'>{item.rankname}</div>
                    </div>
                    <div className='rightIcon'><RightOutlined style={{fontSize:'20px',color:'#ccc'}} /></div>
                </li>
            )
        })
    }
    return (
        <div className='rank'>
            <ul>
                {renderList()}
            </ul>
        </div>
    )
}

export default Rank