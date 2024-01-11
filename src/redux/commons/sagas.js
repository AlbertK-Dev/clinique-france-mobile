import { BASE_URL } from '../../constants/urls';
import { getUnauthRequest } from '../../utils/api';
import * as types from './types'
import { put, takeLatest } from 'redux-saga/effects';


function* getAppSpecialties() {
    try {
        const url = BASE_URL + '/specialites/'
        const res = yield getUnauthRequest(url)

        if (res.success) {
            yield put({ type: types.GET_APP_SPECIALTIES_SUCCESS, payload: res.data })
        }
    } catch (error) {
        yield put({ type: types.GET_APP_SPECIALTIES_FAILED })
    }
}

export default function* CommonSagas() {
    yield takeLatest(types.GET_APP_SPECIALTIES_REQUEST, getAppSpecialties);
}