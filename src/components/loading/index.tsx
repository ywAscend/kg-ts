import React from 'react'
import ReactDom from 'react-dom'
import loading from '../../assets/img/img.gif'
import './index.less'

const ImgDOM = () => <img src={loading} alt='' />


export const ShowLoading = () => {
    let div = document.createElement('div')
    div.setAttribute('id', 'loading')
    document.body.appendChild(div)
    ReactDom.render(React.createElement(ImgDOM), div)
}

export const HideLoding = () => {
    let loading = document.getElementById('loading')
    loading && document.body.removeChild(loading)
}