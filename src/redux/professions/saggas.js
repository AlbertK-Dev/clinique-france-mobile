import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { getUnauthRequest } from '../../utils/api';
import { BASE_URL } from '../../constants/urls';
import * as RootNavigation from '../../routes/rootNavigation';
import * as SCREENS from '../../constants/screens'


/**
 * @description user sign up.
 */
function* processProfessions() {
    let url = BASE_URL + '/profession/'
    try {
        const result = yield getUnauthRequest(url);
        if (result.success) {
            yield put({ type: types.GET_PROFESSION_SUCCESS, payload: result.data })
            // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
        } else {
            yield put({ type: types.GET_PROFESSION_FAILED, payload: result.message })
        }
    } catch (error) {
        console.error(error);
        yield put({ type: types.GET_PROFESSION_FAILED, payload: error })
    }
}

export default function* ProfessionSagga() {
    yield takeLatest(types.GET_PROFESSION_REQUEST, processProfessions);
}