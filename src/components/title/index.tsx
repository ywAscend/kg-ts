import React,{memo} from 'react'
import { useHistory } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import './index.less'
interface IProps {
    name:string,
    goBack?:()=>void
}
const Title:React.FC<IProps> = props => {
    const history = useHistory()
    const { name, goBack } = props
    const handleBackClick = () => {
        if (goBack && typeof goBack === 'function') {
            goBack()
            return
        }
        history.goBack()
    }
    return (
        <div className='title'>
            <LeftOutlined onClick={handleBackClick} style={{ fontSize: '25px', color: '#bfbfbf',marginLeft:'10px' }} />
            <p className='name'><span>{ name }</span></p>
        </div>
    )
}


export default memo(Title)