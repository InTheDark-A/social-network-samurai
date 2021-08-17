import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {
        "API-KEY": "d4e93273-03df-419f-973b-d99ec7800c27"
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<String>,
    resultCode: RC
}