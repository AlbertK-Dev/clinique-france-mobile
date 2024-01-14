import * as types from "./types";

let initialState = {
    shouldSeeBehind: false,
    mesFiches: [],
    loading: false,
    specialties: []
};

const common = (state = initialState, action) => {
    switch (action.type) {
        case types.LAUNCH_APP:
            return {
                ...state,
                actualStep: action.step
            };
        case types.SET_PROFESSION:
            return {
                ...state,
                isProfession: action.p
            };
        case types.MY_FICHES:
            let actualFiches = state.mesFiches
            return {
                ...state,
                mesFiches: [...actualFiches, action.payload]
            }
        case types.SETIDCENTRE:
            return {
                ...state,
                idc: action.idc
            }
        case types.SHOULD_SEE_BEHIND:
            return {
                ...state,
                shouldSeeBehind: action.s
            };
        case types.GET_APP_SPECIALTIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.GET_APP_SPECIALTIES_SUCCESS:
            return {
                ...state,
                loading: false,
                specialties: action.payload
            }
        case types.GET_APP_SPECIALTIES_FAILED:
            return {
                ...state,
                loading: false,
                error: true
            }
        default:
            return state;
    };
};

export default common;