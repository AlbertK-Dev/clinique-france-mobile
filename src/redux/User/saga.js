import { put, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import {
  postUnauthRequest,
  patchUnauthRequest,
  putRequestFormData,
  getUnauthRequest,
} from "../../utils/api";
import {
  BASE_URL,
  USER_LOCAL_AUTH,
  USER_LOGIN,
  USER_REGISTRATION,
  USER_INFO_UPDATE,
  SET_PROFILE,
} from "../../constants/urls";
import * as RootNavigation from "../../routes/rootNavigation";
import * as SCREENS from "../../constants/screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET_ALL_PRATICIENS } from "../Praticiens/types";

const _openMapKey = "5b3ce3597851110001cf624891231ecc67bc4e35a9f4b4a35b6a1f10";


/**
 * @description user sign up.
 */
function* authRegister({ payload }) {
  const url = BASE_URL + USER_REGISTRATION;

  try {
    const result = yield postUnauthRequest(`${url}?module=externe`, payload);

    if (result.success) {
      //yield AsyncStorage.setItem('access_token', result.data.access_token);
      //yield AsyncStorage.setItem('userInfos', JSON.stringify(result.data));
      // if (payload.saveCredentials) yield AsyncStorage.setItem('userCredentials', JSON.stringify(payload));
      yield put({ type: types.REGISTER_USER_SUCCESS, payload: result.data });
      // yield put({ type: GET_ALL_PRATICIENS })
    } else {
      yield put({ type: types.REGISTER_USER_FAILED, payload: result.message });
      if (result?.message == "L'utilisateur existe déjà") {
        setTimeout(() => {
          RootNavigation.navigate(SCREENS.LOGIN);
        }, 2000);
      }
    }
  } catch (error) {
    console.error(error);
    yield put({ type: types.REGISTER_USER_FAILED, payload: error?.message });
  }
}

function* authUpdateInfo({ payload, _id }) {
  const url = BASE_URL + USER_INFO_UPDATE + "/" + _id;
  try {
    const result = yield patchUnauthRequest(url, payload);
    if (result.success) {
      yield AsyncStorage.setItem(
        "userInfos",
        JSON.stringify({ user: result.data })
      );
      yield put({
        type: types.UPDATE_USER_INFORMATION_SUCCESS,
        payload: { user: result.data },
      });
    } else {
      yield put({
        type: types.UPDATE_USER_INFORMATION_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    console.error(error);
    yield put({ type: types.UPDATE_USER_INFORMATION_FAILED, payload: error });
  }
}

function* setUserProfile({ payload, _id }) {
  const url = BASE_URL + SET_PROFILE + _id;
  const formData = new FormData();
  formData.append("photo", {
    uri: payload.uri,
    name: "image.jpg",
    type: "image/jpeg",
  });

  try {
    const result = yield putRequestFormData(url, formData);
    if (result.success) {
      yield AsyncStorage.setItem(
        "userInfos",
        JSON.stringify({ user: result.data })
      );
      yield put({
        type: types.SET_USER_PROFIL_SUCCESS,
        payload: { user: result.data },
      });
    } else {
      yield put({
        type: types.SET_USER_PROFIL_SUCCESS_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({
      type: types.SET_USER_PROFIL_SUCCESS_FAILED,
      payload: error?.message ?? "une erreur est survenue !",
    });
  }
}

function* authLogin({ payload }) {
  const url = BASE_URL + USER_LOGIN;

  try {
    const result = yield postUnauthRequest(`${url}?module=externe`, payload);
    if (result.success) {
      // save user credentials if asked
      yield AsyncStorage.setItem("access_token", result.data.access_token);
      yield AsyncStorage.setItem("userInfos", JSON.stringify(result.data));
      if (payload.saveCredentials) {
        yield AsyncStorage.setItem("userCredentials", JSON.stringify(payload));
      }

      yield put({ type: types.LOGIN_SUCCESS, payload: result.data });
      yield put({ type: GET_ALL_PRATICIENS });
      RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE);
    } else {
      yield put({ type: types.LOGIN_FAILED, payload: result.message });
      yield put({ type: types.REINITIALIZE });
    }
  } catch (error) {
    console.error(error.message);
    if (error?.message == "Network request failed") {
      yield put({
        type: types.REGISTER_USER_FAILED,
        payload: "Vous n'avez pas de connexion",
      });
    } else {
      yield put({
        type: types.REGISTER_USER_FAILED,
        payload: error?.message,
      });
    }
    yield put({ type: types.REINITIALIZE });
  }
}

function* authLocalSignIn() {
  const url = BASE_URL + USER_LOCAL_AUTH;

  try {
    const access_token = yield AsyncStorage.getItem("access_token");
    if (!access_token) {
      yield put({ type: types.LOCAL_AUTH_FAILED, payload: "" });
      return;
    }

    const result = yield postUnauthRequest(url, { token: access_token });
    if (!result.success) {
      yield put({ type: types.LOCAL_AUTH_FAILED, payload: result.message });
      return;
    }

    const userInfos = yield AsyncStorage.getItem("userInfos");
    yield put({
      type: types.LOCAL_AUTH_SUCCESS,
      payload: JSON.parse(userInfos),
    });
    setTimeout(() => {
      RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE);
    }, 1000);
    return;
  } catch (error) {
    console.error(error);
    yield put({ type: types.LOCAL_AUTH_FAILED });
  }
}

function* authLogout() {
  try {
    yield AsyncStorage.removeItem("access_token");
    yield AsyncStorage.removeItem("userInfos");
    //yield AsyncStorage.clear()
    yield put({ type: "CLEAR_ALL_RDV" });
    yield put({ type: "CLEAR_ALL_NOTIFICATIONS" });
    RootNavigation.navigate(SCREENS.LOGIN, { refresh: true });
  } catch (error) {
    yield put({ type: types.LOGOUT_REQUEST, payload: error });
  }
}

function* processVerifCode({ data }) {
  const url = BASE_URL + "/users/process_verif_code/";
  const payload =
    data?.register === true
      ? {
          email: data?.email,
          register: data?.register,
          formData: data?.formData,
        }
      : { email: data?.email };
  try {
    const result = yield postUnauthRequest(url, payload);
    if (result.success) {
      yield put({
        type: types.PROCESS_VERIF_CODE_SUCCESS,
        payload: result?.data,
      });
      RootNavigation.navigate(SCREENS.RESETPASSWORD, payload);
      setTimeout(() => {
        put({ type: types.REINITIALIZE });
      }, 1000);
    } else {
      yield put({
        type: types.PROCESS_VERIF_CODE_FAILED,
        payload: result.message,
      });
      yield put({ type: types.REINITIALIZE });
      setTimeout(() => {
        payload?.register && RootNavigation.navigate(SCREENS.LOGIN);
      }, 2000);
    }
  } catch (error) {
    setTimeout(() => {
      put({ type: types.REINITIALIZE });
    }, 1000);
    yield put({
      type: types.PROCESS_VERIF_CODE_FAILED,
      payload: "une erreur est survenue , veillez ressayez!",
    });
    yield put({ type: types.REINITIALIZE });
  }
}

function* resetPassWord({ data }) {
  const url = BASE_URL + "/users/" + data?.id;
  try {
    const result = yield patchUnauthRequest(url, { password: data?.password });
    if (result?.success) {
      yield RootNavigation.navigate(SCREENS.LOGIN, { refresh: true });
      yield put({ type: types.REINITIALIZE });
    } else {
      yield put({
        type: types.RESET_PASSWORD_REQUEST_FAILED,
        payload: "une erreur est survenue , veillez ressayez!",
      });
      yield put({ type: types.REINITIALIZE });
    }
  } catch (error) {
    yield put({
      type: types.RESET_PASSWORD_REQUEST_SUCCESS,
      payload: "une erreur est survenue , veillez ressayez!",
    });
    yield put({ type: types.REINITIALIZE });
  }
}

/**
 * Obtenir auprès de Open Mqp la localisation correspondant au coordonées de l'utilisateur
 * @param {latitude} params
 * @param {longitude} params
 */
function* getAddressFromCoords({ payload }) {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${payload.latitude}&lon=${payload.longitude}&format=json`;
  try {
    // If there haven't changes don't do anything
    const c = yield AsyncStorage.getItem("coords");
    const savedCoords = JSON.parse(c);

    if (
      savedCoords?.latitute === payload.latitute &&
      savedCoords?.longitute === payload.longitude
    ) {
      const coords = yield AsyncStorage.getItem("location");
      yield put({
        type: types.COORDS_TO_ADDRESS_SUCCESS,
        payload: JSON.parse(coords),
      });
    }

    AsyncStorage.setItem("coords", JSON.stringify(payload));
    //Send the request
    const res = yield getUnauthRequest(apiUrl);
    if (!res?.address) yield put({ type: types.COORDS_TO_ADDRESS_FAILED });
    yield put({ type: types.COORDS_TO_ADDRESS_SUCCESS, payload: res });
    AsyncStorage.setItem("location", JSON.stringify(res));
  } catch (error) {
    yield put({ type: types.COORDS_TO_ADDRESS_FAILED });
  }
}

function* getDirections({ payload }) {
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${_openMapKey}&start=${"8.681495,49.41461"}&end=${"8.687872,49.420318"}`;
  try {
    const res = yield getUnauthRequest(url);
    const { coordinates } = res.features[0].geometry;
    const coords = coordinates.map(([longitude, latitude]) => ({
      latitude,
      longitude,
    }));
    yield put({ type: types.GET_MAP_DIRECTIONS_SUCCESS, payload: coords });
  } catch (error) {
    yield put({ type: types.GET_MAP_DIRECTIONS_FAILED });
  }
}

function* sendExpoToken({ payload }) {
  console.log(payload, "payload")
  const url = `${BASE_URL}/users/update-push-token/${payload._id}`;

  try {
    const result = yield patchUnauthRequest(url, { token: payload.token });
    if (!result.success) {
      yield put({
        type: types.SEND_EXPO_TOKEN_FAILED,
        payload: result.message,
      });
    }
    yield put({ type: types.SEND_EXPO_TOKEN_SUCCESS, payload: result.data });
  } catch (error) {
    console.error("Something went wrong...here", error.message);
  }
}

export default function* UserSaga() {
  yield takeLatest(types.REGISTER_USER_REQUEST, authRegister);
  yield takeLatest(types.LOGIN_REQUEST, authLogin);
  yield takeLatest(types.LOCAL_AUTH_REQUEST, authLocalSignIn);
  yield takeLatest(types.LOGOUT_REQUEST, authLogout);
  yield takeLatest(types.SET_USER_PROFIL_RESQUEST, setUserProfile);
  yield takeLatest(types.RESET_PASSWORD_REQUEST, resetPassWord);
  yield takeLatest(types.PROCESS_VERIF_CODE_REQUEST, processVerifCode);
  yield takeLatest(types.UPDATE_USER_INFORMATION_RESQUEST, authUpdateInfo);
  yield takeLatest(types.COORDS_TO_ADDRESS_REQUEST, getAddressFromCoords);
  yield takeLatest(types.GET_MAP_DIRECTIONS_REQUEST, getDirections);
  yield takeLatest(types.SEND_EXPO_TOKEN_REQUEST, sendExpoToken);
}
