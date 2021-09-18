import React, { memo } from 'react'
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import searchRoutine from '../../store/saga/actions/search'
import { Input } from 'antd'
import './index.less'
const { Search } = Input

interface IProps {
    onSearch?:()=>void
}

const SearchCom:React.FC<IProps> = props => {

    const dispatch = useDispatch()
    const history = useHistory()
    const handelSearch = (value:any) => {
        if(!value){
            searchCallBack(props)
            return
        }
        dispatch({
            type: searchRoutine.TRIGGER,
            searchValue: value,
            callBack:()=>{
                searchCallBack(props)
            }
        })
    }

    const searchCallBack = (props:IProps) => {
        const {onSearch} = props
        if (onSearch && typeof onSearch === 'function') {
            onSearch()
            return
        }
        history.push('/Search')
    }

    return (
        <div>
            <header>
                <Search
                    placeholder="搜索你想要的..."
                    enterButton
                    size="large"
                    onSearch={value => handelSearch(value)}
                />
            </header>
        </div>
    )
}



export default memo(SearchCom)