import React, { memo, useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router";
import { Menu } from 'antd'
import { NAV_URL } from '../../constants/enum'
import Search from '../search'

interface IProps{

}

const Header: React.FC<IProps> = props => {
    console.log(props)
    const { url } = useRouteMatch()
    const history = useHistory()
    const [current, setCurrent] = useState('newSong')
    const windowHref = window.location.href
    const UpperCode = (key: string) => `${key.slice(0, 1).toUpperCase()}${key.slice(1)}`
    const handleUrl = (urls: string) => urls && urls.split('/')[3]
    const handleClick = (event: any) => {
        if (event.key === current) return
        history.push(`${url}${event.key}`)
    }

    useEffect(() => {
        if (windowHref) {
            let currentUrl = handleUrl(windowHref) || 'newSong'
            setCurrent(currentUrl)
            currentUrl === 'newSong' && history.push(currentUrl)
        }
    }, [windowHref])

    return (
        <div className='headerContent'>
            <Search />
            <nav>
                <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                    {
                        NAV_URL.map(item => <Menu.Item key={item}> {UpperCode(item)} </Menu.Item>)
                    }
                </Menu>
            </nav>
        </div>
    )
}


export default memo(Header)