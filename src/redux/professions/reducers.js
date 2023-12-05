import * as types from "./types"

const initialState = {
    professions: []
};

const ProfessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PROFESSION_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                errorMsg: ""
            }
        case types.GET_PROFESSION_SUCCESS:
            return {
                ...state,
                professions: action.payload,
                loading: false,
                success: true
            }
        case types.GET_PROFESSION_FAILED:
            return {
                ...state,
                errorMsg: action.payload,
                loading: false,
                success: false,
                error: true,
            }
        default:
            return state;
    }
}

export default ProfessionReducer;