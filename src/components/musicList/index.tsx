import React from 'react'
import './index.less'
import downLoadImg from '../../assets/img/download_icon_2.png'
interface IProps {
    data:Array<any>,
    handlePlayFlag:(param:number,options:string)=>void,
    type?:string
}
const MusicList:React.FC<IProps> = props => {
  const { data, handlePlayFlag, type } = props
  const renderList = () => {
    if (!data) return null
    return data.map((item, index) => {
      return (
        <li key={index} onClick={() => handlePlayFlag(index, item.hash)}>
          <span>
            {type && type === 'rankDetail' && <span className={`type_rankDetail type_rankDetail${index}`}>{index + 1}</span>}
            <span className='musicName'>{item.filename || ''}</span>
          </span>
          <span><img src={downLoadImg} alt='' /></span>
        </li>
      )

    })

  }
  return (
    <div className="listContent">
      <ul className='listContainer'>
        {renderList()}
        <li className='bootom-line'><span>---- 我是有底线的 ----</span></li>
      </ul>
    </div>
  )
}

export default MusicList