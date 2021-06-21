import {instance, ResponseType} from "./api";

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<ResponseType<{ url: string }>>(`security/get-captcha-url`).then(res => res.data);
    }
}