import React, { memo } from 'react'
import { LoadingComponentProps } from 'react-loadable'
import { Spin, Result, Button } from "antd";

const PageLoading: React.FC<LoadingComponentProps> = props => {

    const { error, isLoading, timedOut, pastDelay } = props
    if (isLoading && pastDelay) {
        return (
            <div className="spin-center-box">
                <Spin className='spin-center' />
            </div>
        )
    }

    //若果有错误
    if (error || timedOut) {
        return (
            <div className='spin-center-box'>
                <Result
                    status='error'
                    title='组件加载失败'
                    subTitle='您的网络可能出现了问题，请稍后重试！'
                    extra={(
                        <Button
                            onClick={() => window.location.reload()}
                            type='primary'
                        />
                    )}
                />
            </div>
        )
    }

    return null
}


export default memo(PageLoading)