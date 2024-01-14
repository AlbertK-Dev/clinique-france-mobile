import * as types from "./types";
import { BASE_URL } from "../../constants/urls";
import { put, takeLatest } from "redux-saga/effects";
import { getUnauthRequest, patchUnauthRequest } from "../../utils/api";

function* getUserNotifications({ payload }) {
  const url = `${BASE_URL}/notifications/?iduser=${payload}`;
  try {
    const result = yield getUnauthRequest(url);
    console.log("got nitfs ", url)
    if (result.success) {
      yield put({
        type: types.GET_USER_NOTIFICATIONS_SUCCESS,
        payload: result.data,
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_USER_NOTIFICATIONS_FAILED,
      payload: { message: error },
    });
    console.error("...Something went wrong", error.message);
  }
}

function* setNotifsCard({ payload }) {
  const url = `${BASE_URL}/notifications/unread?&iduser=${payload}`;
  try {
    const result = yield getUnauthRequest(url);
    console.log("set notifs ", url)
    if (result.success) {
      yield put({
        type: types.SET_NOTIFICATION_CARDINAL_SUCCESS,
        payload: result.data.unreaded,
      });
    }
  } catch (error) {
    console.error("...Something went wrong", error.message);
  }
}

function* markAllAsRead({ payload }) {
  const url = `${BASE_URL}/notifications/?iduser=${payload}`;
  try {
    yield patchUnauthRequest(url);
  } catch (error) {
    console.error("...Something went wrong", error.message);
  }
}

export default function* NotificationsSaga() {
  yield takeLatest(types.GET_USER_NOTIFICATIONS_REQUEST, getUserNotifications);
  yield takeLatest(types.SET_NOTIFICATION_CARDINAL, setNotifsCard);
  yield takeLatest(types.MARK_ALL_AS_READED, markAllAsRead);
}
