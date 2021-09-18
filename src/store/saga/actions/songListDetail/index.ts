import {createRoutine } from 'redux-saga-routines'
import NAME_SPACE from '../../../../constants/name-space'

const songListDetailRoutine = createRoutine(`${NAME_SPACE.SONG_LIST_DETAIL}`)

export default songListDetailRoutine