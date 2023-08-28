import {useGetState} from "ahooks";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {isLoginORegister, isNoNeedUserInfo, LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME} from "../router";
import UseGetUserInfo from "./useGetUserInfo";

export function useNavPage(waitingUserData: boolean) {
    const {username} = UseGetUserInfo();
    const {pathname} = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        if (waitingUserData) return;

        // 已经登录了
        if (username) {
            if (isLoginORegister(pathname)) {
                nav(MANAGE_INDEX_PATHNAME);
            }
            return;
        }

        // 未登录
        if (isNoNeedUserInfo(pathname)) {
            return;  // 不需要用户信息
        }else{
            nav(LOGIN_PATHNAME);   // 需要用户信息
        }

    }, [waitingUserData,username,pathname]);

}
