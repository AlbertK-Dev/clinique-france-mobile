import * as types from "./types";

export const getUserNotifications = (payload) => ({
  type: types.GET_USER_NOTIFICATIONS_REQUEST,
  payload,
});
