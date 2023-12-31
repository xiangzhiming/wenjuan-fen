import axios,{ResDataType} from './ajax';

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
    const url = '/api/user/info'
    return await axios.get(url)
}

// 注册用户
export async function registerService(username:string,password:string,nickname?:string): Promise<ResDataType>{
    const url = '/api/user/register'
    const body = {username,password,nickname: nickname || username}
    return await axios.post(url, body);
}

// 登录
export async function loginService(username:string,password:string):Promise<ResDataType> {
    const url = '/api/user/login'
    const body = {username, password}
    return await axios.post(url,body)
}
