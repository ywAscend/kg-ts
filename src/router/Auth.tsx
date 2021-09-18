import React, { memo } from 'react'
import { Redirect } from 'react-router-dom'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'

import { useSelector } from 'react-redux'

interface IProps extends RouteConfigComponentProps {

}


const Auth: React.FC<IProps> = (props) => {
    const { location, route } = props

    // const {token} = useSelector((state:any) => state.loginReducer)


    // if (!token && location.pathname !== '/login') return <Redirect to='/login' />
    
    // if (token && location.pathname === '/login') return <Redirect to='/' />

    // 重要，在这里，判断权限.
    // if( permissions.length === 0 && isLogin ) return (
    //  <>
    //       { GlobalTip }
    //
    //       <Spin className="spin-center />
    //     </>
    // )

    return (
        <>
            {/* { GlobalTip } */}
            {
                route && route.routes && renderRoutes(route.routes)
            }
        </>
    )
}


export default memo(Auth)