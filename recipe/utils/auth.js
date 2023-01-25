import { Token } from 'utils/enum'
import axios from "axios";
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'

const backendapi = async function (METHOD = "GET", REQUEST_URI = "", PARAMS = {}, headers = {}) {

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
        baseURL: process.env.NEXT_PUBLIC_API_URL_DB,
        headers: defaultHeaders,
    });

    METHOD = METHOD.toUpperCase();

    try {
        let response = {};
        switch (METHOD) {
            case "GET":
                response = await axiosInstance.get(REQUEST_URI, { params: PARAMS });
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
                response = await axiosInstance.post(REQUEST_URI, PARAMS);
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
        sleep(500)
    } catch (error) {
        if (error.response) {
            console.warn('aaa', error);
            if (error.response.statusText === "Unauthorized" || error.response.status === 401) {
                if (typeof window !== "undefined") {
                    localStorage.removeItem(Token.Personal)
                    location.reload();
                }
                return response.data;
            }
        }
        console.log(error);
    }
};

export default backendapi;
