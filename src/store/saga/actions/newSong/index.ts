import { createRoutine } from 'redux-saga-routines'
import NAME_SPACE from '../../../../constants/name-space'
const newSongRoutine = createRoutine(`${NAME_SPACE.NEW_SONG}`)

export default newSongRoutine