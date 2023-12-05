import { GET_ALL_PRATICIENS, SEARCH_PRAT_BY_KEY } from "./types"


export const getAllPrats = () => {
    return {
        type: GET_ALL_PRATICIENS,
    }
}

export const searchPratByKey = (key) => {
    return {
        type: SEARCH_PRAT_BY_KEY,
        key
    }
}