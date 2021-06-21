import {ProfileType} from "../types/types";
import {instance, ResponseType, ResultCodesEnum} from "./api";

type GetProfileResponseType = ProfileType;

type GetStatusResponseType = string;

export const profileApi = {
    async getProfile(id: number) {
        return await instance.get<GetProfileResponseType>(`/profile/${id}`).then(res => res.data);
    },
    async getStatus(id: number) {
        return await instance.get<GetStatusResponseType>(`/profile/status/${id}`).then(res => res.data);
    },
    async updateStatus(status: string) {
        return await instance.put<ResponseType>('/profile/status', {status: status}).then(res => res.data);
    },
    async savePhoto(photoFile: File) {
        let formData = new FormData();
        formData.append("image", photoFile);
        return await instance.put<ResponseType<{ photos: { small: string, large: string } }>>('/profile/photo', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => res.data);
    },
    async saveProfile(profile: ProfileType) {
        return await instance.put(`/profile`, profile);
    }
}