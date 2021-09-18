import { createRoutine } from 'redux-saga-routines'
import NAME_SPACE from '../../../../constants/name-space'

const searchRoutine = createRoutine(`${NAME_SPACE.SEARCH}`) 

export default searchRoutine