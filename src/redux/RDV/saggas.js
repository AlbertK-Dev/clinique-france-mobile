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

/**
 * @description user sign up.
 */
function* getMotifs({ data }) {
  let url = data.forSpec
    ? BASE_URL + "/motif/speciality/" + data?.id
    : BASE_URL + "/motif/profession/" + data?.id;
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
  let url = BASE_URL + "/ext_specialites/profession/" + id;
  try {
    const result = yield getUnauthRequest(url);
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
  let url =
    BASE_URL +
    "/ext_users/lieu/?isPraticien=true&idLieu=" +
    data?.id +
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
    idCentre: data?.idCentre,
    idp: data?.idp,
    creneau: data?.creneau,
    date: data?.date,
    day: data?.day,
  });
  console.log(url);
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
  let url1 = BASE_URL + "/patients/register?idCentre=" + data?.idCentre;
  let url2 =
    BASE_URL + "/appointments/enregistrer_rdv/?idCentre=" + data?.idCentre;
  const payload = {
    name: data?.user?.name,
    surname: data?.user?.surname ?? "",
    birthdate: data?.user.birthdate,
    telephone: data?.user.telephone,
    email: data?.user.email,
    user: data?.user?._id,
    active: true,
    idCentre: data?.idCentre,
  };
  console.log(url2);
  try {
    const result = yield postUnauthRequest(url1, payload);
    let idFiche;
    let rdv;
    if (result.message) {
      const rdvData = {
        centre: data?.idCentre,
        lieu: data?.lieu,
        practitioner: data?.praticien,
        patient: result.message,
        motif: data?.motif,
        startTime: data?.period?.time,
        endTime: ajouterDuree(data?.period?.time, data?.duration_rdv),
        provenance: "mobile",
        duration: data?.duration_rdv,
        date_long: data?.date_long,
        // "dayOfWeek": 1,
        date: data?.period?.day,
      };
      idFiche = result.message;
      rdv = yield postUnauthRequest(url2, rdvData);
      // yield put({ type: types.GET_DISPO_REQUEST_SUCCESS, payload: result.data })
      // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
    } else if (result.data._id) {
      const rdvData = {
        centre: data?.idCentre,
        lieu: data?.lieu,
        practitioner: data?.praticien,
        patient: result.data._id,
        motif: data?.motif,
        startTime: data?.period?.time,
        // data?.period?.time,
        endTime: ajouterDuree(data?.period?.time, data?.duration_rdv),
        provenance: "mobile",
        duration: data?.duration_rdv,
        date_long: data?.date_long,
        // "dayOfWeek": 1,
        date: data?.period?.day,
        clientID: data?.clientID,
      };
      idFiche = result.data?._id;
      rdv = yield postUnauthRequest(url2, rdvData);
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
    if (rdv?.success) {
      console.log("success");

      yield put({
        type: types.POST_RDV_REQUEST_SUCCESS,
        payload: rdv?.data[0],
      });
      yield put({ type: types.GET_ALL_MY_RDV, id: payload.user });
      yield put({ type: MY_FICHES, payload: idFiche });
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
    yield put({ type: types.POST_RDV_REQUEST_FAILED, payload: error });
    yield setTimeout(() => {
      //RootNavigation.navigate(SCREENS.ACCEUIL)
      put({ type: "CLEAR_ERR_SUCC" });
    }, 3000);
  }
}

function* getAllRdv({ id }) {
  let url = BASE_URL + "/appointments/?module=externe&iduser=" + id;

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
    BASE_URL + "/appointments/update/" + data.id + "?idCentre=" + data.idCentre;

  const payload = {
    startTime: data?.startTime,
    endTime: data?.endTime,
    date: data?.date,
    centre: data?.idCentre,
    idUser: data?.idUser,
    date_long: data?.date_long,
  };
  console.log(payload);
  try {
    const result = yield putUnauthRequest(url, payload);
    if (result.success) {
      yield put({ type: types.PUT_RDV_REQUEST_SUCCESS, payload: result.data });
      //yield put({ type: types.GET_ALL_MY_RDV, id: payload?.idUser })
      yield getAllRdv({ id: payload.idUser });
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
    BASE_URL + "/appointments/update/" + data.id + "?idCentre=" + data.idCentre;
  const payload = {
    centre: data?.idCentre,
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
