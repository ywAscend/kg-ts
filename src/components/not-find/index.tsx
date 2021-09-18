import React, { memo } from 'react'


interface IProps {

}

const NotFind: React.FC<IProps> = props => {
    return (
        <div>
            你的页面走丢了...
        </div>
    )
}

export default memo(NotFind)