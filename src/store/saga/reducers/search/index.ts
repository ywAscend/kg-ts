import searchRoutine from "../../actions/search"

const initState:IState = {
    searchValue: '', 
    searchData:'',
    searchResult:[]
}

const searchReducer = (state = initState, action:ActionParams) => {
    switch (action.type) {
        case searchRoutine.SUCCESS:
            if(state.searchValue && state.searchValue!== action.payload.searchValue){
              return {
                  ...state,
                  searchValue:action.payload.searchValue,
                  searchData: action.payload.data,
                  searchResult: action.payload.data.info
              }
            }
            return {
                ...state,
                searchValue:action.payload.searchValue,
                searchData: action.payload.data,
                searchResult: [...state.searchResult,...action.payload.data.info]
            }
        case searchRoutine.FAILURE:
            return {
                ...state,
                searchData: action.payload.data
            }
        case searchRoutine.FULFILL:
            return {
                ...state,
            }
        default:
            return state
    }
}


export default searchReducer