import * as types from "./types";

const initialState = {
  userInfos: null,
  loading: false,
  ImageLoading: false,
  error: null,
  codeVerifLoading: false,
  errorMsg: null,
  localAuth: null,
  success: null,
  load_adress: false,
  address: undefined,
  mapDirections: [],
  successLogin: false,
  codeVerifSuccess: false,
  loadingLocalAuth: false,
  successRegister: false,
  clientID: "",
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REINITIALIZE:
      return {
        ...state,
        error: false,
        errorMsg: null,
        success: null,
        settingPWLoading: false,
        errorCodeVerif: null,
        loadingLocalAuth: false,
        codeVerifSuccess: false,
        successRegister: false
      };
    case types.REGISTER_USER_REQUEST:
      return {
        ...state,
        userInfos: action.payload,
        loading: true,
        error: false,
        errorMsg: null,
        successRegister: null,
      };
    case types.REGISTER_USER_SUCCESS:
      return {
        ...state,
        userInfos: action.payload,
        loading: false,
        successRegister: true,
      };
    case types.REGISTER_USER_FAILED:
      return {
        ...state,
        errorMsg: action.payload,
        loading: false,
        error: true,
        successRegister: false,
      };
    case types.UPDATE_USER_INFORMATION_RESQUEST:
      return {
        ...state,
        userInfos: action.payload,
        loading: true,
        error: false,
        errorMsg: null,
        success: null,
      };
    case types.UPDATE_USER_INFORMATION_SUCCESS:
      return {
        ...state,
        userInfos: action.payload,
        loading: false,
        success: true,
      };
    case types.UPDATE_USER_INFORMATION_FAILED:
      return {
        ...state,
        errorMsg: action.payload,
        loading: false,
        error: true,
        success: false,
      };
    case types.SET_USER_PROFIL_RESQUEST:
      return {
        ...state,
        ImageLoading: true,
        error: false,
        errorMsg: null,
        success: null,
      };
    case types.SET_USER_PROFIL_SUCCESS:
      return {
        ...state,
        userInfos: action.payload,
        ImageLoading: false,
        success: true,
      };
    case types.SET_USER_PROFIL_SUCCESS_FAILED:
      return {
        ...state,
        errorMsg: action.payload,
        ImageLoading: false,
        error: true,
        success: false,
      };

    case types.LOGIN_REQUEST:
      return {
        ...state,
        userInfos: action.payload,
        loading: true,
        error: false,
        errorMsg: null,
        successLogin: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        userInfos: action.payload,
        loading: false,
        error: false,
        successLogin: true,
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        errorMsg: action.payload,
        loading: false,
        error: true,
        successLogin: false,
      };
    case types.LOCAL_AUTH_REQUEST:
      return {
        ...state,
        loadingLocalAuth: true,
        error: null,
      };
    case types.LOCAL_AUTH_FAILED:
      return {
        ...state,
        loadingLocalAuth: false,
        error: true,
        errorMsg: "",
        localAuth: false,
      };
    case types.LOCAL_AUTH_SUCCESS:
      return {
        ...state,
        loadingLocalAuth: false,
        localAuth: true,
        userInfos: action.payload,
      };
    case types.PROCESS_VERIF_CODE_REQUEST:
      return {
        ...state,
        codeVerifLoading: true,
        codeVerifSuccess: false,
      };
    case types.PROCESS_VERIF_CODE_SUCCESS:
      return {
        ...state,
        codeVerif: action.payload,
        codeVerifLoading: false,
        codeVerifSuccess: true,
      };
    case types.PROCESS_VERIF_CODE_FAILED:
      return {
        ...state,
        errorCodeVerif: action.payload,
        codeVerifLoading: false,
        codeVerifSuccess: false,
      };
    case types.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        settingPWLoading: true,
      };
    case types.RESET_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        settingPWLoading: false,
      };
    case types.RESET_PASSWORD_REQUEST_FAILED:
      return {
        ...state,
        errorResettingPw: action.payload,
        settingPWLoading: false,
      };
    case types.COORDS_TO_ADDRESS_REQUEST:
      return {
        ...state,
        load_address: true,
      };
    case types.COORDS_TO_ADDRESS_SUCCESS:
      return {
        ...state,
        load_address: false,
        address: action.payload,
      };
    case types.COORDS_TO_ADDRESS_FAILED:
      return {
        ...state,
        load_address: false,
      };
    case types.GET_MAP_DIRECTIONS_SUCCESS:
      return {
        ...state,
        mapDirections: action.payload,
      };
    case types.SEND_EXPO_TOKEN_SUCCESS:
      return {
        ...state,
        canBeNotified: true,
      };
    case types.SEND_EXPO_TOKEN_FAILED:
      return {
        ...state,
        canBeNotified: false,
      };
    case types.SAVE_CLIENT_ID:
      return {
        ...state,
        clientID: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
