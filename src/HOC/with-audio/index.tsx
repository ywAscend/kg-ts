
import React from 'react'
import { connect } from 'react-redux'
import audioRoutine from '../../store/saga/actions/audioPlay'
interface IhocProps {
    flag: boolean
}

export interface IProps extends IhocProps {
    togglePlayMusic: () => void,
    autoPlayEnd: () => void,
    myRef: any,
    prevMusic: () => void,
    nextMusic: () => void,
    musicData: Object
}

interface IWState {
    playFlag: boolean
}
//获取组件名称
const getDisplayName = <T extends IProps>(WrappedComponent: React.ComponentType<T>) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const withAudio = <T extends IProps>(WrappedComponent: React.ComponentType<T>) => {

    const mapStateToProps = (state: IState) => ({ ...state.audioPlayReducer })

    const mapMethodToProps = (dispatch: any) => ({
        playMusic: (index: number, hash: string) => {
            dispatch({
                type: audioRoutine.TRIGGER,
                index,
                hash
            })
        }
    })

    return connect(mapStateToProps, mapMethodToProps)(
        class ComponentT extends React.Component<IhocProps, IWState>{
            static displayName = `audioPlayer${getDisplayName(WrappedComponent)}`
            readonly state: Readonly<IWState> = {   //防止 this.state = 'xxx' 直接修改state 
                playFlag: true
            }
            myAudio: any = React.createRef()

            togglePlayMusic = () => {
                this.setState({
                    playFlag: !this.state.playFlag
                }, () => {
                    console.log(`${this.state.playFlag ? '播放' : '暂停'}音乐`)
                    if (this.state.playFlag) {
                        this.myAudio.current.play()
                        return
                    }
                    this.myAudio.current.pause()
                })
            }

            nextMusic = () => {
                this.autoPlayEnd()
            }

            playNextMusic = () => {
                const { musicIndex, hash } = this.getNextMusicParam() as any
                (this.props as any).playMusic(musicIndex, hash)
            }

            autoPlayEnd = () => {
                this.setState({
                    playFlag: false
                }, () => {
                    this.autoNextMusic()
                })

            }

            autoNextMusic = () => {
                this.setState({
                    playFlag: true
                }, () => {
                    this.playNextMusic()
                })
            }

            handleNextNum = (musicIndex: number, playDatas: any): number => {
                let nextNum = Number(musicIndex) + 1
                let nextMusicIndex = nextNum >= playDatas.length ? 0 : nextNum
                if (playDatas[nextMusicIndex].hasOwnProperty('group')) {
                    return playDatas[nextMusicIndex].group.length > 0 ? this.handleNextNum(nextMusicIndex, playDatas) : nextMusicIndex
                }
                return nextMusicIndex
            }
            handlePrevNum = (musicIndex: number, playDatas: any): number => {
                let nextNum = musicIndex - 1
                if (nextNum < 0) return playDatas.length - 1
                let nextMusicIndex = nextNum
                if (playDatas[nextMusicIndex].hasOwnProperty('group')) {
                    return playDatas[nextMusicIndex].group.length > 0 ? this.handleNextNum(nextMusicIndex, playDatas) : nextMusicIndex
                }
                return nextMusicIndex
            }

            getNextMusicParam = () => {
                const { musicIndex, playDatas } = this.props as any
                const nextMusicIndex = this.handleNextNum(musicIndex, playDatas)
                const nextHash = playDatas[nextMusicIndex].hash
                return {
                    musicIndex: nextMusicIndex,
                    hash: nextHash
                }
            }
            getPrevMusicParam = () => {
                const { musicIndex, playDatas } = this.props as any
                const prevMusicIndex = this.handlePrevNum(musicIndex, playDatas)
                const nextHash = playDatas[prevMusicIndex].hash

                return {
                    musicIndex: prevMusicIndex,
                    hash: nextHash
                }
            }

            prevMusic = () => {
                const { musicIndex, hash } = this.getPrevMusicParam() as any
                (this.props as any).playMusic(musicIndex, hash)
            }

            render() {
                const mapProps: IProps = {
                    flag: this.state.playFlag,
                    togglePlayMusic: this.togglePlayMusic,
                    autoPlayEnd: this.autoPlayEnd,
                    nextMusic: this.nextMusic,
                    prevMusic: this.prevMusic,
                    myRef: this.myAudio,
                    musicData: (this.props as any).playMusicInfo
                }
                return this.props.flag ? <WrappedComponent
                    {...this.props as T}
                    {...mapProps}
                /> : null
            }

        }
    )
}


export default withAudio
