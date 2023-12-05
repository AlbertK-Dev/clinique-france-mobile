import * as types from "./types"

export const setApp = (step) => {
    return {
        type: types.LAUNCH_APP,
        step
    }
}

export const setProfessionForRdv = (p) => {
    return {
        type: types.SET_PROFESSION,
        p
    }
}

export const setShouldSeeBehind = s => {
    return {
        type: types.SHOULD_SEE_BEHIND,
        s
    }
}

export const setIdCentre = idc => {
    return {
        type: types.SETIDCENTRE,
        idc
    }
}

export const getAppSpecialties = () => ({
    type: types.GET_APP_SPECIALTIES_REQUEST
})