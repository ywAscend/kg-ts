export const NAV_URL = ['newSong', 'rank', 'songList', 'singer']
export const KG_API_URL = 'http://m.kugou.com'
export const KG_SEARCH_API_URL = 'http://mobilecdn.kugou.com/'
export const KG_DEV_APP_URL= '/api'
export const KG_DEV_APP_SEARCH_URL= '/searinfo'
export const URL_ENUM = {
    NEW_SONG: '/?json=true', //新歌列表
    SONG_INFO: '/app/i/getSongInfo.php?cmd=playInfo',  //歌曲信息
    RANK_INFO: '/rank/list&json=true', //排名
    RANK_DETAIL_INFO: '/rank/info', //排名详情
    SONG_LIST_INFO: '/plist/index&json=true', //歌单
    SONG_LSIT_DETAIL_INFO: '/plist/list',//歌单详情
    SINGER_INFO: '/singer/class&json=true', //歌手
    SINGER_LIST_INFO: '/singer/list', //歌手列表
    SINGER_LIST_DETAIL_INGO: '/singer/info', //歌手详情
    SEARCH_INFO: '/api/v3/search/song?format=json&pagesize=20&showtype=1',  //搜索
    HOT_SEARCH_INFO: '/api/v3/search/hot?format=json&plat=0&count=30'
}