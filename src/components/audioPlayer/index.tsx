import React, { memo, useEffect } from "react";
import withAudio, { IProps } from '../../HOC/with-audio'
import { ImgUrlFilter } from "../../utils/common";
import { PlayCircleOutlined, PauseCircleOutlined, ForwardOutlined,BackwardOutlined } from '@ant-design/icons'
import './index.less'

const AudioPlayer: React.FC<IProps> = props => {
    const { togglePlayMusic, nextMusic, flag, myRef, musicData, prevMusic, autoPlayEnd } = props
    useEffect(() => {
        (document.getElementById('audio') as HTMLAudioElement).onended = () => {
            autoPlayEnd()
        }
    },[])
    return (
        <div className='musicPlayer'>
            <div className='info'>
                <div className='imgContent'><img src={ImgUrlFilter((musicData as any).imgUrl)} alt='' /></div>
                <div className='infoText'>
                    <p>{(musicData as any).songName || ''}</p>
                    <p>{(musicData as any).singerName || ''}</p>
                </div>
            </div>
            <div className='menu'>
                <span onClick={prevMusic}><BackwardOutlined style={{ fontSize: '26px', color: '#fff' }} /></span>
                <span onClick={togglePlayMusic} >{flag ? <PauseCircleOutlined style={{ fontSize: '26px', color: '#fff' }} /> : <PlayCircleOutlined style={{ fontSize: '26px', color: '#fff' }} />}</span>
                <span onClick={nextMusic}><ForwardOutlined style={{ fontSize: '26px', color: '#fff' }} /></span>
                <audio id='audio' src={(musicData as any).url} ref={myRef} autoPlay></audio>
            </div>
        </div>
    )
}

export default withAudio(memo(AudioPlayer))