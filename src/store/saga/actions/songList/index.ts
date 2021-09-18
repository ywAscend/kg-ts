import { createRoutine } from 'redux-saga-routines'
import NAME_SPACE from '../../../../constants/name-space'
const songListRoutine = createRoutine(`${NAME_SPACE.SONG_LIST}`)

export default songListRoutine