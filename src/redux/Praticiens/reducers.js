import * as types from "./types"

const initialState = {
    praticiens: [],
    searchedPrats: []
};

const PraticienReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_PRATICIENS:
            return {
                ...state,
                loadingPraticiens: true,
                errorPraticien: false,
                errorMsgPraticiens: ""
            }
        case types.GET_ALL_PRATICIENS_SUCCESS:
            return {
                ...state,
                praticiens: action.payload,
                loadingPraticiens: false,
                successPraticiens: true
            }
        case types.GET_ALL_PRATICIENS_FAILED:
            return {
                ...state,
                errorMsgPraticiens: action.payload,
                loadingPraticiens: false,
                successPraticiens: false,
                errorPraticien: true,
            }
        case types.SEARCH_PRAT_BY_KEY:
            return {
                ...state,
                loadingSearchPrats: true,
                errorSearchPraticien: false,
                errorMsgSearchPraticiens: ""
            }
        case types.SEARCH_PRAT_BY_KEY_SUCCESS:
            return {
                ...state,
                searchedPrats: action.payload,
                loadingSearchPrats: false,
                successSearchPraticiens: true
            }
        case types.SEARCH_PRAT_BY_KEY_FAILED:
            return {
                ...state,
                errorMsgSearchPraticiens: action.payload,
                loadingSearchPrats: false,
                successSearchPraticiens: false,
                errorSearchPraticien: true,
            }
        default:
            return state;
    }
}

export default PraticienReducer;