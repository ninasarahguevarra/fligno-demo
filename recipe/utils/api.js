import axios from "axios";
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'
import { Token } from 'utils/enum'

const api = async function (METHOD = "GET", REQUEST_URI = "", PARAMS = {}, headers = {}) {

    let defaultHeaders = {
        Accept: "application/json",
        "platform-type": "web",
        "app-version": process.env.NEXT_PUBLIC_APP_VERSION,
        "app-name": process.env.NEXT_PUBLIC_APP_NAME,
        'Access-Control-Allow-Origin':'*'
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
    
                  localStorage.removeItem(Token.Personal)
                  location.reload()
                  console.log(error)
                  
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
    
                  localStorage.removeItem(Token.Personal)
                  location.reload()
                  console.log(error)
                  
                  throw error;
                }
                return response.data;
        }
    } catch (error) {
        if (error.response) {
            console.warn(error);
            if (error.response.statusText === "Unauthorized" || error.response.status === 401) {
                if (typeof window !== "undefined") {
                    localStorage.removeItem(Token.Personal);
                    location.reload();
                }
            }
        }
        console.log(error);
    }
};

export default api;
