import { put, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import {
  getUnauthRequest,
  postUnauthRequest,
  putUnauthRequest,
} from "../../utils/api";
import { BASE_URL } from "../../constants/urls";
import * as RootNavigation from "../../routes/rootNavigation";
import * as SCREENS from "../../constants/screens";
import { MY_FICHES, SETIDCENTRE } from "../commons/types";
import { ajouterDuree, generateLink } from "../../utils/helper";
import { GET_USER_NOTIFICATIONS_REQUEST, SET_NOTIFICATION_CARDINAL, SET_NOTIFICATION_CARDINAL_SUCCESS } from "../notifications/types";

/**
 * @description user sign up.
 */
function* getMotifs({ data }) {
  let url = BASE_URL + "/motif/speciality/" + data?.id
  try {
    const result = yield getUnauthRequest(url);
    if (result.success) {
      yield put({
        type: types.GET_MOTIFS_REQUEST_SUCCESS,
        payload: result.data,
      });
      // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
    } else {
      yield put({
        type: types.GET_MOTIFS_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_MOTIFS_REQUEST_FAILED, payload: error });
  }
}

function* getSpecialities({ id }) {
  let url = BASE_URL + "/specialites/";
  try {
    const result = yield getUnauthRequest(url);
    console.log(result)
    if (result.success) {
      yield put({
        type: types.GET_SPECIALITIES_REQUEST_SUCCESS,
        payload: result.data,
      });
      // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
    } else {
      yield put({
        type: types.GET_SPECIALITIES_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_SPECIALITIES_REQUEST_FAILED, payload: error });
  }
}

function* getCliniques({ id }) {
  let url = BASE_URL + "/motif/lieu/" + id;
  try {
    const result = yield getUnauthRequest(url);
    if (result.success) {
      yield put({
        type: types.GET_CLINIQUE_REQUEST_SUCCESS,
        payload: result.data,
      });
      yield put({ type: SETIDCENTRE, payload: result.data[0]?.idCentre });
      // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
    } else {
      yield put({
        type: types.GET_CLINIQUE_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_CLINIQUE_REQUEST_FAILED, payload: error });
  }
}

function* getPraticiens({ data }) {
  console.log(data)
  let url =
    BASE_URL +
    "/users/speciality/?idSpeciality="+data
    "&idSpeciality=" +
    data?.ids;
  try {
    const result = yield getUnauthRequest(url);
    if (result.success) {
      yield put({
        type: types.GET_PRATICIENS_REQUEST_SUCCESS,
        payload: result.data,
      });
      // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
    } else {
      yield put({
        type: types.GET_PRATICIENS_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_PRATICIENS_REQUEST_FAILED, payload: error });
  }
}

function* getDispo({ data }) {
  let url = generateLink(BASE_URL + "/appointments/rechercher_dispo?", {
    idp: data?.idp,
    creneau: data?.creneau,
    date: data?.date,
    day: data?.day,
  });
  console.log(url)
  try {
    const result = yield getUnauthRequest(url);
    if (result.success) {
      yield put({
        type: types.GET_DISPO_REQUEST_SUCCESS,
        payload: result.data,
      });
      // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
    } else {
      yield put({
        type: types.GET_DISPO_REQUEST_FAILED,
        payload: result.message,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_DISPO_REQUEST_FAILED, payload: error });
  }
}

function* postRDV({ data }) {
  let url2 =
    BASE_URL + "/appointments/enregistrer_rdv/";
  // user: data?.user?._id,
  try {
    let rdv;
     if (data?.user?._id) {
      const rdvData = {
        practitioner: data?.praticien,
        patient: data?.user?._id,
        motif: data?.motif,
        startTime: data?.period?.time,
        // data?.period?.time,
        endTime: ajouterDuree(data?.period?.time, data?.duration_rdv),
        provenance: "mobile",
        duration: data?.duration_rdv,
        date_long: data?.date_long,
        // "dayOfWeek": 1,
        date: data?.period?.day,
      };
      rdv = yield postUnauthRequest(url2, rdvData);
    } else {
      yield put({
        type: types.POST_RDV_REQUEST_FAILED,
        payload: "Certains champs n'ont pas bien ete renseignes",
      });
      yield setTimeout(() => {
        //RootNavigation.navigate(SCREENS.ACCEUIL)
        put({ type: "CLEAR_ERR_SUCC" });
      }, 3000);
    }
    if (rdv?.success) {
      yield put({
        type: types.POST_RDV_REQUEST_SUCCESS,
        payload: rdv?.data[0],
      });
      yield put({ type: types.GET_ALL_MY_RDV, id: data?.user?._id });
      yield put({ type: GET_USER_NOTIFICATIONS_REQUEST, payload: data?.user?._id });
      yield put({ type: SET_NOTIFICATION_CARDINAL, payload: data?.user?._id });
      yield setTimeout(() => {
        put({ type: "CLEAR_ERR_SUCC" });
        RootNavigation.navigate(SCREENS.SUCCESS, { id: rdv?.data?._id });
      }, 3000);
    } else {
      yield put({
        type: types.POST_RDV_REQUEST_FAILED,
        payload: "Erreur lors de la creation du rendez-vous!",
      });
      yield setTimeout(() => {
        //RootNavigation.navigate(SCREENS.ACCEUIL)
        put({ type: "CLEAR_ERR_SUCC" });
      }, 3000);
    }
  } catch (error) {
    yield put({ type: types.POST_RDV_REQUEST_FAILED, payload: error.message });
    yield setTimeout(() => {
      //RootNavigation.navigate(SCREENS.ACCEUIL)
      put({ type: "CLEAR_ERR_SUCC" });
    }, 3000);
  }
}

function* getAllRdv({ id }) {
  let url = BASE_URL + "/appointments/?iduser=" + id;

  try {
    const result = yield getUnauthRequest(url);
    if (result.success) {
      yield put({ type: types.GET_ALL_MY_RDV_SUCCESS, payload: result.data });
      // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
    } else {
      yield put({ type: types.GET_ALL_MY_RDV_FAILED, payload: result.message });
    }
  } catch (error) {
    yield put({ type: types.GET_ALL_MY_RDV_FAILED, payload: error });
  }
}

function* putRDV({ data }) {
  let url =
    BASE_URL + "/appointments/update/" + data.id;

  const payload = {
    startTime: data?.startTime,
    endTime: data?.endTime,
    date: data?.date,
    idUser: data?.idUser,
    date_long: data?.date_long,
  };
  try {
    const result = yield putUnauthRequest(url, payload);
    if (result.success) {
      yield put({ type: types.PUT_RDV_REQUEST_SUCCESS, payload: result.data });
      //yield put({ type: types.GET_ALL_MY_RDV, id: payload?.idUser })
      yield getAllRdv({ id: payload.idUser });
      yield put({ type: GET_USER_NOTIFICATIONS_REQUEST, payload: payload.idUser });
      yield put({ type: SET_NOTIFICATION_CARDINAL, payload: payload.idUser });
      setTimeout(() => {
        put({ type: "CLEAR_ERR_SUCC" });
      }, 1000);
    } else {
      yield put({
        type: types.PUT_RDV_REQUEST_FAILED,
        payload: result.message,
      });
      setTimeout(() => {
        put({ type: "CLEAR_ERR_SUCC" });
      }, 3000);
    }
  } catch (error) {
    yield put({
      type: types.PUT_RDV_REQUEST_FAILED,
      payload: "une erreur de connexion est survenue !",
    });
    setTimeout(() => {
      put({ type: "CLEAR_ERR_SUCC" });
    }, 3000);
  }
}

function* cancelRDV({ data }) {
  let url =
    BASE_URL + "/appointments/update/" + data.id;
  const payload = {
    status: data?.status,
    idUser: data?.idUser,
  };
  try {
    const result = yield putUnauthRequest(url, payload);
    if (result.success) {
      yield put({
        type: types.CANCEL_RDV_REQUEST_SUCCESS,
        payload: result.success,
      });
      //yield put({ type: types.GET_ALL_MY_RDV, id: payload?.idUser })
      yield getAllRdv({ id: payload.idUser });
      yield put({ type: GET_USER_NOTIFICATIONS_REQUEST, payload: payload.idUser });
      yield put({ type: SET_NOTIFICATION_CARDINAL, payload: payload.idUser });
      setTimeout(() => {
        put({ type: "CLEAR_ERR_SUCC" });
      }, 1000);
    } else {
      yield put({
        type: types.CANCEL_RDV_REQUEST_FAILED,
        payload: result.message,
      });
      setTimeout(() => {
        put({ type: "CLEAR_ERR_SUCC" });
      }, 3000);
    }
  } catch (error) {
    yield put({
      type: types.CANCEL_RDV_REQUEST_FAILED,
      payload: "une erreur de connexion est survenue !",
    });
    setTimeout(() => {
      put({ type: "CLEAR_ERR_SUCC" });
    }, 3000);
  }
}

export default function* RDVSagga() {
  yield takeLatest(types.GET_MOTIFS_REQUEST, getMotifs);
  yield takeLatest(types.GET_SPECIALITIES_REQUEST, getSpecialities);
  yield takeLatest(types.GET_CLINIQUES_REQUEST, getCliniques);
  yield takeLatest(types.GET_PRATICIENS_REQUEST, getPraticiens);
  yield takeLatest(types.GET_DISPO_REQUEST, getDispo);
  yield takeLatest(types.POST_RDV_REQUEST, postRDV);
  yield takeLatest(types.GET_ALL_MY_RDV, getAllRdv);
  yield takeLatest(types.PUT_RDV_REQUEST, putRDV);
  yield takeLatest(types.CANCEL_RDV_REQUEST, cancelRDV);
}
