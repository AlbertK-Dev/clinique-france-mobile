import { all } from "redux-saga/effects";
import ProfessionSagga from "../professions/saggas";
import RDVSagga from "../RDV/saggas";
import UserSaga from "../User/saga";
import PraticienSaga from "../Praticiens/saga";
import CommonSagas from "../commons/sagas";
import NotificationsSaga from "../notifications/saga";

/**

 * @description combine sagas.

 */

export default function* Sagas() {
  yield all([
    UserSaga(),
    ProfessionSagga(),
    RDVSagga(),
    PraticienSaga(),
    CommonSagas(),
    NotificationsSaga(),
  ]);
}
