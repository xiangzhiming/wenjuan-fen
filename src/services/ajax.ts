import axios from "axios";
import {message} from "antd";
import {getToken} from "../utils/user-token";

const instance = axios.create({
    timeout: 10 * 1000,
})

// request 拦截： 此处用来统一封装token
instance.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${getToken()}`  //  JWT的固定格式
        return config;
    },
    error => Promise.reject(error)
);

// response 拦截：统一处理 errno和 msg
instance.interceptors.response.use(
    res => {
        const resData = (res.data || {}) as ResType;
        const {errno, data, msg} = resData;
        if (errno !== 0) {
            // 错误提示
            if ((msg)) {
                message.error(msg);
            }
            // throw new Error(msg);
        }

        return data as any;
    }
)
export default instance;

export type ResType = {
    errno: number;
    data?: ResDataType;
    msg?: string;
}

export type ResDataType = {
    [dataKey: string]: any;
}
