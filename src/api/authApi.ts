import {instance, ResponseType, ResultCodeForCaptcha, ResultCodesEnum} from "./api";

type MeResponseType = ResponseType<{ id: number, email: string, login: string }>;
type LoginResponseType = ResponseType<{ userId: number }, ResultCodeForCaptcha & ResultCodesEnum>;
type LogoutMeResponseType = MeResponseType;

export const authApi = {
    async me() {
        return await instance.get<MeResponseType>('/auth/me').then(res => res.data);
    },
    async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data);
    },
    async logout() {
        return await instance.delete<LogoutMeResponseType>('/auth/login');
    }
};