import React, { useEffect } from 'react'
import { useParams,useLocation,useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { ImgUrlFilter } from '../../utils/common'
import singerListRoutine from '../../store/saga/actions/singerList'
import singerListDetailRoutine from '../../store/saga/actions/singerListDetail'
import SearchCom from '../../components/search'
import Title from '../../components/title'
import './index.less'

const SingerList:React.FC<{}> = props => {
    const location = useLocation()
    const history = useHistory()
    const { classid }:any = useParams()
    const singerlistname = _.get(location.state,'classname','')
    const dispatch = useDispatch()
    const singerListData = useSelector((state:IState) => state.singerListReducer)
    const { singerListName, singerListInfo } = singerListData
    useEffect(() => {
        dispatch({
            type: singerListRoutine.TRIGGER,
            classid
        })
    }, [classid])

    const handleSingerListClick = ({singerid}:{[PropName:string]:any}) => {
        history.push(`/SingerListDetail/${singerid}`)
    }

    const renderSingerList = () => {
        if (!singerListInfo) return null
        const listInfo = _.get(singerListInfo.list, 'info', '')
        if (!listInfo || listInfo.length < 0) return null
        return listInfo.map((item:any, index:number) => {
            return <li key={index} onClick={()=>handleSingerListClick(item)} >
                <div className='imgContent'><img src={ ImgUrlFilter(item.imgurl)}/></div>
                <div className='singerName' >{item.singername}</div>
            </li>
        })

    }

    return (
        <div className='singerList'>
            <SearchCom />
            <div className='singerListConent'>
                <Title name={singerListName ||singerlistname} />
                <div className='singerListDetail'>
                    <ul className='listDetail'>
                        {renderSingerList()}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SingerList