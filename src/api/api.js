import axios from "axios";

const baseUrl = "https://social-network.samuraijs.com/api/1.0";
const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
});
const instanceWithoutLog = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0",
});

export const usersApi = {
    getUsers(currentPage = 1, pageSize = 10) {
        return axios.get(baseUrl + `/users?page=${currentPage}&count=${pageSize}`
            //, {withCredentials:true}
        ).then(response => {
            return {data: response.data};
        });
    },

    follow(id = 0) {
        return instance.post(`/follow/${id}`).then(response => {
            debugger;
            return response;
        });
    },

    unfollow(id = 0) {
        return instance.delete(`/unfollow/${id}`).then(response => {
            debugger;
            return response;
        });
    },

    getProfile(id) {
        console.warn("Obsolete method. Please use profileApi object.");
        return profileApi.getProfile(id);
    }
};

export const profileApi = {
    getProfile(id) {
        return instanceWithoutLog.get(`/profile/${id}`)
    },
    getStatus(id) {
        return instanceWithoutLog.get(`/profile/status/${id}`)
    },
    updateStatus(status) {
        let b = instance.put('/profile/status', {status: status});
        return b;
    }
}


export const authApi = {
    me() {
        return instance.get('/auth/me')
    },
    login(email, password, rememberMe = false) {
        return instance.post('/auth/login', {email, password, rememberMe});
    },
    logout() {
        return instance.delete('/auth/login');
    }

};


