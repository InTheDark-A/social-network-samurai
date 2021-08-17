import {instance, APIResponseType} from "./api";

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<APIResponseType<{ url: string }>>(`security/get-captcha-url`).then(res => res.data);
    }
}