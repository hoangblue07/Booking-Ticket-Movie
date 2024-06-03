import axios from "axios";
import notifiFuntion from "../Notification/Notification";



export const DOMAIN = 'https://movieapi.cyberlearn.vn/api/';
export const ACCESS_TOKEN = 'accessToken';
export const USER_LOGIN = 'userLogin';
export const MA_NHOM='GP00';

export const settings = {
    setStorageJson: (name, data) => { //hàm set data lên localStorage
        data = JSON.stringify(data);
        localStorage.setItem(name, data);
    },
    setStorage: (name, data) => {
        localStorage.setItem(name, data);
    },
    getStorageJson: (name) => {
        if (localStorage.getItem(name)) {
            const dataStore = localStorage.getItem(name);
            if (typeof dataStore == 'string') {
                const data = JSON.parse(dataStore);
                return data;
            }
            return undefined;
        }
        return;
    },
    getStore: (name) => {
        if (localStorage.getItem(name)) {
            const data = localStorage.getItem(name);
            return data;
        }
        return;
    },
    setCookieJson: (name, value, days) => {
        var expires = '';
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        value = JSON.stringify(value);
        document.cookie = name + '=' + (value || '') + expires + "; path=/";
    },
    getCookieJson: (name) => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    setCookie: (name, value, days) => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookie: (name) => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    eraseCookie: (name) => {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    clearStorage: (name) => {
        localStorage.removeItem(name);
    }
}




export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 30000
});

// cấu hình cho tất cả requets gửi đi
// http.interceptors.request
http.interceptors.request.use((config)=>{
    // cấu hình tất cả headers gửi đi đều có bearer token (token đăng nhập)
    config.headers ={
        ...config.headers,
        Authorization: 'Bearer '+ settings.getStore(ACCESS_TOKEN)
    }


    return config;
}, error=>{
    return Promise.reject(error);
})
//cấu hình cho tất cả kết quả trả về ( cấu hình cho response)

http.interceptors.response.use((response) => {
    
    return response;
}, (error) => {
    //hàm cấu hình cho tất cả lỗi nhận về
    try {       
        if(error.response?.status ===401 || error.response?.status ===404)  {
            // history.push('/login');
            notifiFuntion('error', error.response?.data.content);
        }
    } catch (error) {
        console.log(error)
    }
    return Promise.reject(error);
});