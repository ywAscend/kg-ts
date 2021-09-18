import Loadable from 'react-loadable'
import loadings from './loadings'
import Auth from './Auth'

const RouterConfig = [
    {
        component: Auth,
        routes:[
            {
                path:'/404',
                component: Loadable({
                    loader:()=>import('../components/not-find'),
                    ...loadings
                })
            },
            {
                path: '/RankDetail/:rankid',
                exact: true,
                component: Loadable({
                    loader:()=>import('../page/RankDetail'),
                    ...loadings
                })
            },
            {
                path:'/SongList/:specialId',
                component: Loadable({
                    loader:()=>import('../page/SongListDetail'),
                    ...loadings
                })
            },
            {
                path:'/SingerList/:classid',
                component: Loadable({
                    loader:()=>import('../page/SingerList'),
                    ...loadings
                })
            },
            {
                path: '/SingerListDetail/:singerId',
                exact:true,
                component: Loadable({
                    loader:()=>import('../page/SingerListDetail'),
                    ...loadings
                })
            },
            {
                path:'/Search',
                component: Loadable({
                    loader:()=>import('../page/Search'),
                    ...loadings
                })
            },
            {
                //首页
                path:'/',
                component: Loadable({
                    loader:()=>import('../page/Home'),
                    ...loadings
                }),
                routes:[
                    {
                        path:'/newSong',
                        component:Loadable({
                            loader:()=>import('../page/NewSong'),
                            ...loadings
                        })
                    },
                    {
                        path:'/rank',
                        component:Loadable({
                            loader:()=>import('../page/Rank'),
                            ...loadings
                        })
                    },
                    {
                        path: '/songList',
                        exact: true,
                        component:Loadable({
                            loader:()=>import('../page/SongList'),
                            ...loadings
                        })
                    },
                    {
                        path: '/singer',
                        exact: true,
                        component:Loadable({
                            loader:()=>import('../page/Singer'),
                            ...loadings
                        })
                    },
                ]
            }
        ]
    }
]


export default RouterConfig