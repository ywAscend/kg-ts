import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import singerRoutine from '../../store/saga/actions/singer'
import { SortSinger } from '../../utils/common' 
import { RightOutlined } from '@ant-design/icons'
import './index.less'

const Singer:React.FC<{}> = props => {
    const history = useHistory()
    const dispatch = useDispatch()
    const singerData = useSelector((state:IState) => state.singerReducer)
    const singerList = SortSinger(singerData.singerInfo)
    const handleSingerClick = ({classid,classname}:any) => {
        console.log(classid,classname)
        history.push(`/SingerList/${classid}`,{classname} )
    }

    useEffect(() => {
        dispatch({
            type: singerRoutine.TRIGGER
        })
        // eslint-disable-next-line
    }, [])

    const renderSinger = () => {
        if (!singerList || singerList.length < 0) return null
        return singerList.map((item:any, index:number) => {
            return <ul key={index}>
                {
                    item.map((items:any) => {
                        return (
                            <li key={items.classid} onClick={() => handleSingerClick(items)}>
                                <span>{items.classname}</span>
                                <span><RightOutlined style={{ fontSize: '20px', color: '#ccc' }} /></span>
                            </li>
                        )
                    })
                }
            </ul>
        })
    }
    
    return (
        <div className='singer'>
            {renderSinger()}
        </div>
    )
}

export default Singer
