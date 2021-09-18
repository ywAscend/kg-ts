import AxiosInstance, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse, AxiosStatic } from "axios"
import {KG_API_URL,KG_DEV_APP_URL,KG_SEARCH_API_URL,KG_DEV_APP_SEARCH_URL} from '../constants/enum'
import { ShowLoading,HideLoding } from "../components/loading"
import { message } from 'antd'

type requestFn = {
    (url:string,options?:Object,data?:Object|null): AxiosPromise
}


const configHooks = (config:any) => {
    let {url,baseURL} = config
    if( url.match(/\/api/g) && url.match(/\/api/ig).length>0){
        if(process.env.NODE_ENV === 'development'){
            baseURL = KG_DEV_APP_SEARCH_URL
        } else {
            baseURL = KG_SEARCH_API_URL
        }
        return Object.assign({},config,{baseURL})
    }
    return config
}

class Http {
    private axios: AxiosStatic = AxiosInstance
    private requestCount:number = 0

    constructor() {
        const { axios } = this
        axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? KG_DEV_APP_URL : KG_API_URL
        axios.defaults.timeout = 10000
        axios.defaults.headers = {
            "Content-Type": "application/json;charset=UTF-8"
        }
        this.useInterceptRequest()
        this.useInterceptResponse()
    }

    //显示遮罩
    private showLoading = () => {
        if (this.requestCount === 0) {
            ShowLoading()
        }
        this.requestCount++
    }
    //隐藏遮罩
    private hideLoding = () => {
        this.requestCount--
        if (this.requestCount === 0) {
            HideLoding()
        }
    }

    private useInterceptRequest() {
        this.axios.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                this.showLoading()

                let newConfg = configHooks(config)
                //获取token,在 header中添加token
                const token = ''
                if (token) newConfg.headers.authToken = token
                // other...
                return newConfg
            },
            (error: AxiosError) => {
                this.hideLoding()
                return Promise.reject(error)
            }
        )
    }

    private useInterceptResponse() {
        this.axios.interceptors.response.use(
            (res: AxiosResponse) => {
                this.hideLoding()
                //处理服务器错误等
                if (res.data.errMsg === '000001') {
                    message.error('服务器错误，请联系管理员')
                    return Promise.reject(res.data)
                }
                //token过期
                if (res.data.errMsg === '000002') {
                    message.error('身份已过期..')
                    return Promise.reject(res.data)
                }

                //其他...

                return Promise.resolve(res.data)
            },
            (error: AxiosError) => {
                this.hideLoding()

                if (error.response) {
                    if (error.response.status >= 500) message.error('服务器错误');
                } else if (error.request) {
                    // ...
                } else {
                    // 其他错误
                    message.error(error.message);
                }

                return Promise.reject(error);
            }
        )
    }


    //公共请求方法
    private fetchData(type:string,url:string,options?:object,isComplex?:boolean){
        if(isComplex){
          return this.axios[type](url,null,options)
        }
        return this.axios[type](url,options)
    }

    public get:requestFn = (url, params) => {
        if (!params) return this.fetchData('get',url)
        const newParams = Object.assign(params, {
            [`kg${new Date().getTime()}`]: 1
        })
        return this.fetchData('get',url,{params:newParams})
    }

    //post|delete等公共方法
    private request(type:string,url:string,params?:Object,data?:Object|null){
        let options:Object = {
            params,
            data
        }

        if(params && data === undefined){
            options = {
                data:params
            }
        }
        if(data === null){
            options = {
                params
            }
        }
        return this.fetchData(type,url,options,true)
    }

    public post:requestFn = (url,params,data) =>{
        return this.request('post',url,params,data)
    }

    public put:requestFn = (url,params,data) =>{
        return this.request('put',url,params,data)
    }

    public patch:requestFn = (url,params,data) =>{
        return this.request('patch',url,params,data)
    }
    public delete:requestFn = (url,params,data) =>{
        return this.request('delete',url,params,data)
    }
}


export default new Http()