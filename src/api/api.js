import axios from "axios";

const baseUrl = "https://social-network.samuraijs.com/api/1.0";
const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers:{
        "API-KEY":"d4e93273-03df-419f-973b-d99ec7800c27"
    }
});

export const usersApi = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(baseUrl + `/users?page=${currentPage}&count=${pageSize}`
        ).then(response => {
            return {data: response.data};
        });
    },

    follow(id = 0) {
        return instance.post(`/follow/${id}`).then(response => {
            return response;
        });
    },

    unfollow(id = 0) {
        debugger;
        return instance.delete(`/follow/${id}`).then(response => {
            return response;
        });
    },

    async getProfile(id) {
        console.warn("Obsolete method. Please use profileApi object.");
        return await profileApi.getProfile(id);
    }
};

export const profileApi = {
    async getProfile(id) {
        return await instance.get(`/profile/${id}`)
    },
    async getStatus(id) {
        return await instance.get(`/profile/status/${id}`)
    },
    async updateStatus(status) {
        let b = await instance.put('/profile/status', {status: status});
        return b;
    }
}


export const authApi = {
    async me() {
        return await instance.get('/auth/me')
    },
    async login(email, password, rememberMe = false) {
        return await instance.post('/auth/login', {email, password, rememberMe});
    },
    async logout() {
        return await instance.delete('/auth/login');
    }
};


