import {
  SET_COLLAPSED,
  SET_ERROR,
  SET_ITEMS,
  SET_LOADING,
  SET_USER,
} from "./constants";

export const initialState = {
  isLoggedIn: false,
  loading: false,
  error: "",
  currentUser: "",
  items: [],
  isCollapsed: true,
};

function reducer(state, action) {
  switch (action.type) {
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case SET_USER: {
      return {
        ...state,
        currentUser: action.payload.user,
        isLoggedIn: !(action.payload.user === ""),
        loading: false,
        error: "",
      };
    }
    case SET_ITEMS: {
      return {
        ...state,
        items: action.payload.items,
        loading: false,
        error: "",
      };
    }
    case SET_COLLAPSED: {
      return {
        ...state,
        isCollapsed: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
