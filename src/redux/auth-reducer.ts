import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authApi} from "../api/authApi";
import {securityAPI} from "../api/securityAPI";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

type  InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>;


const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SN/auth/SET-USER-DATA":
            return {
                ...state,
                ...action.payload,
            };
        case "SN/auth/GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null , login: string | null , isAuth: boolean) => ({
        type: 'SN/auth/SET-USER-DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    } as const),
}

export const getAuthUserData = ():ThunkType => {
    return async (dispatch) => {
        let meData = await authApi.me();
        if (meData.resultCode === ResultCodesEnum.Success) {
            let {id, login, email} = meData.data;
            dispatch(actions.setAuthUserData(id, email, login, true));
        }
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string):ThunkType =>
    async (dispatch) => {
    let data = await authApi.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodesEnum.Success) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }

        let message = data.messages.length > 0 ? data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export const logout = ():ThunkType => {
    return async (dispatch) => {
        let response = await authApi.logout();
        if (response.data.resultCode === 0) {
            dispatch(actions.setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer;