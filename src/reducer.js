import { SET_COLLAPSED, SET_ITEMS, SET_USER} from "./constants";

export const initialState = {
    isLoggedIn : false,
    currentUser : "",
    items : [],
    count : 0,
    isCollapsed : true,
  }

function reducer(state, action) {
    switch(action.type){
        case SET_USER : {
            return {
                ...state,
                currentUser : action.payload.user,
                isLoggedIn : !(action.payload.user === ''),
            }
        }
        case SET_ITEMS : {
            
            return {
                ...state,
                items : action.payload.items,
                count : action.payload.items.length,
            }
        }
        case SET_COLLAPSED : {
            return {
                ...state,
                isCollapsed : action.payload,
            }
        }
        default: {
            return state
        }
    }
}

export default reducer;