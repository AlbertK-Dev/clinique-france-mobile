import * as types from "./types";


export const setRDVForm = payload => {
    return {
        type: types.SET_FORM_RDV,
        payload
    }
}

export const getMotifs = (data) => {
    return {
        type: types.GET_MOTIFS_REQUEST,
        data
    }
}

export const getClinique = (id) => {
    return {
        type: types.GET_CLINIQUES_REQUEST,
        id
    }
}

export const getCliniqueOfSelectedPrat = data => {
    return {
        type: types.GET_CLINIC_OF_SPEC_PRAT_SUCCESS,
        payload: data
    }
}

export const getSpecialities = (id) => {
    return {
        type: types.GET_SPECIALITIES_REQUEST,
        id
    }
}

export const getPraticiens = data => {
    return {
        type: types.GET_PRATICIENS_REQUEST,
        data
    }
}

export const getSinglePrat = data => {
    return {
        type: types.GET_SINGLE_PRAT_SUCCESS,
        payload: [data]
    }
}
export const getDispo = data => {
    return {
        type: types.GET_DISPO_REQUEST,
        data
    }
}

export const postRDV = data => {
    return {
        type: types.POST_RDV_REQUEST,
        data
    }
}

export const clearCache = () => {
    return {
        type: types.CLEAR_ERR_SUCC
    }
}

export const getMyRDV = (id) => {
    return {
        type: types.GET_ALL_MY_RDV,
        id
    }
}

export const setMotifDuration = (id) => {
    return {
        type: types.SET_RDV_DURATION,
        id
    }
}

export const putRDV = (data) => {
    return {
        type: types.PUT_RDV_REQUEST,
        data
    }
}

export const cancelRDV = (data) => {
    return {
        type: types.CANCEL_RDV_REQUEST,
        data
    }
}

export const saveExtPRData = (data) => {
    return {
        type: types.SAVE_EXTERNAL_PR_DATA,
        data
    }
}