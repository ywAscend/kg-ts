import http from "../http"
import { URL_ENUM } from "../../constants/enum"

export const fetchNewSong = () => http.get(URL_ENUM.NEW_SONG)

export const getSongInfoData = (options:Object) => http.get(URL_ENUM.SONG_INFO,options) 

export const getRankServerData = () => http.get(URL_ENUM.RANK_INFO)

export const getRankDetailServerData = (options:Object) => http.get(URL_ENUM.RANK_DETAIL_INFO,options)

export const getSongListServerData = () => http.get(URL_ENUM.SONG_LIST_INFO)

export const getSongListDetailServerData = (specialId:string) => http.get(`${URL_ENUM.SONG_LSIT_DETAIL_INFO}/${specialId}?json=true`)

export const getSingerInfoData = () => http.get(URL_ENUM.SINGER_INFO)

export const getSingerListServerData = (id:string) => http.get(`${URL_ENUM.SINGER_LIST_INFO}/${id}?json=true`)

export const getSingerListDetailServerData = (id:string) => http.get(`${URL_ENUM.SINGER_LIST_DETAIL_INGO}/${id}?json=true`)

export const getHotSearchResultData = () => http.get(URL_ENUM.HOT_SEARCH_INFO)
export const getSearchResultData = (keyword:string,page='1') => http.get(URL_ENUM.SEARCH_INFO,{keyword,page})