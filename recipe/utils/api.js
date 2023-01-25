import axios from "axios";
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'
// import { useClientToken } from "hooks/authentication/useAuthentication";

const api = async function (METHOD = "GET", REQUEST_URI = "", PARAMS = {}, authorization = "", headers = {}) {

    let defaultHeaders = {
        Accept: "application/json",
        "platform-type": "web",
        "app-version": process.env.NEXT_PUBLIC_APP_VERSION,
        "app-name": process.env.NEXT_PUBLIC_APP_NAME,
    };

    if (!isEmpty(headers)) {
        defaultHeaders = merge(defaultHeaders, headers);
    }

    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
        headers: defaultHeaders,
    });

    let defaultParams = {
        "app_id": process.env.NEXT_PUBLIC_APP_ID,
        "app_key": process.env.NEXT_PUBLIC_APP_KEY,
    }
    if (!isEmpty(PARAMS)) {
        defaultParams = merge(defaultParams, PARAMS);
    }

    if (authorization) {
        let token_expired = false;
        let token = null;
        if (typeof window !== "undefined") {
            token = localStorage.getItem(`${authorization}`) || "";
        }
        if (!isEmpty(token)) {
            token = JSON.parse(token);
            if (!isEmpty(token.expiration_date)) {
                const now = new Date().getTime();
                const expiration_date = new Date(token.expiration_date).getTime();
                token_expired = now >= expiration_date;
            } else {
                token_expired = true;
            }
        }
        // if (isEmpty(token) || token_expired) {
        //     // CALL useClientToken HOOK HERE
        //     await useClientToken();
        //     if (typeof window !== "undefined") {
        //         token = JSON.parse(localStorage.getItem(`${authorization}`) || "");
        //     }
        // }
        if (typeof window !== "undefined") {
            axiosInstance.defaults.headers.common["Authorization"] = `${token.token_type} ${token.access_token}`;
        }
        axiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    }
    METHOD = METHOD.toUpperCase();

    try {
        let response = {};
        switch (METHOD) {
            case "GET":
                response = await axiosInstance.get(REQUEST_URI, { params: defaultParams });
                if (!response.data) {
                  const error = {
                      info: '',
                      status: 0,
                  };
            
                  error.info = response.statusText;
                  error.status = response.status;
    
                  localStorage.removeItem(authorization)
                  location.reload()
                  console.log(error, authorization)
                  
                  throw error;
                }
                return response.data;
                
            case "POST":
                response = await axiosInstance.post(REQUEST_URI, defaultParams);
                if (!response.data) {
                  const error = {
                      info: '',
                      status: 0,
                  };
            
                  error.info = response.statusText;
                  error.status = response.status;
    
                  localStorage.removeItem(authorization)
                  location.reload()
                  console.log(error, authorization)
                  
                  throw error;
                }
                return response.data;
        }
    } catch (error) {
        if (error.response) {
            console.warn(error);
            if (error.response.statusText === "Unauthorized" || error.response.status === 401) {
                if (typeof window !== "undefined") {
                    localStorage.removeItem(authorization);
                    location.reload();
                }
            }
        }
        console.log(error, authorization);
    }
};

export default api;
