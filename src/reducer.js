import { SET_COLLAPSED, SET_ITEM, SET_ITEMS} from "./constants";

export const initialState = {
    isLoggedIn : true,
    userName : 'Aditya',
    items : [],
    count : 0,
    isCollapsed : true,
  }

function reducer(state, action) {
    switch(action.type){
        case SET_ITEM : {
            return {
                ...state,
                items : [ ...state.items, action.payload],
                isCollapsed : true,
                count : state.count+1,
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