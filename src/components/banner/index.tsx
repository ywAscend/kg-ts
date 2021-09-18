import React from 'react'
import { Carousel } from 'antd';
import './index.less'
// import testImg from '../../assets/img/test.jpg'


interface IProps {
    data: Array<any>
}


//图片容器
const Item = (props: { imgurl: string }) => {
    return (
        <div className="swiper-slide">
            <img src={props.imgurl} alt='' />
        </div>
    )
}

const Banner: React.FC<IProps> = (props) => {
    let  { data } = props
    const renderItem = () => {
        if (!data) return null
        return data.map((item, index) => {
            return <Item  {...item} key={index} />
        })
    }
    return (
        <Carousel autoplay>
            {
                renderItem()
            }
        </Carousel>
    )
}

export default Banner