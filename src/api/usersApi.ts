import {instance, ResponseType, ResultCodesEnum} from "./api";
import {UserType} from "../types/types";

type GetUsersResponseType = {
    totalCount: number
    items: Array<UserType>
    resultCode: ResultCodesEnum
    messages: Array<string>
};

export const usersApi = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`/users?page=${currentPage}&count=${pageSize}`
        ).then(response => {
            return response.data;
        });
    },

    follow(id = 0) {
        return instance.post<ResponseType>(`/follow/${id}`).then(response => {
            return response;
        });
    },

    unfollow(id = 0) {
        return instance.delete<ResponseType>(`/follow/${id}`).then(response => {
            return response;
        });
    },
};