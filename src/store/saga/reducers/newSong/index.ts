import newSongRoutine from "../../actions/newSong"


const initState:IState = {
    isLoading: false,
    list:[],
    banner:[]
}

const newSongReducer = (state=initState,actions:ActionParams) => {
    switch(actions.type){
        case newSongRoutine.TRIGGER:
            return {
                ...state,
                isLoading:true
            }
        case newSongRoutine.SUCCESS:
            const { data,banner } = actions.payload 
            return {
                ...state,
                list:data,
                banner
            }
        case newSongRoutine.FULFILL:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default newSongReducer