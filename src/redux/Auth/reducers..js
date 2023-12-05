import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./types"

const initialState = {
    data: null,
    loading: false,
    error: null
  };

const LieuxReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        default:
            return state;
    }
}

export default LieuxReducer;