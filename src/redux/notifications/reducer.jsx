import * as types from "./types";

const initialState = {
  isLoading: false,
  notifications: [],
  message: null,
  error: false,
};

const NotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_USER_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notifications: action.payload,
        error: false,
      };
    case types.GET_USER_NOTIFICATIONS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload.message,
      };

    default:
      return state;
  }
};

export default NotificationsReducer;
