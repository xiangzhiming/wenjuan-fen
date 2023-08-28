import {useRequest} from "ahooks";
import {getUserInfoService} from "../services/user";
import {useDispatch} from "react-redux";
import {loginReducer} from "../store/userReducer";
import {useEffect, useState} from "react";
import UseGetUserInfo from "./useGetUserInfo";


function useLoadUserDate() {
    let a = 1
    const dispatch = useDispatch();
    const [waitingUserData,setWaitingUserData] = useState(true);
    const {run} = useRequest(getUserInfoService,{
        manual: true,
        onSuccess(Result) {
            const {username,nickname} = Result;
            dispatch(loginReducer({username,nickname}))
        },
        onFinally() {
            setWaitingUserData(false);
        }
    })

    const {username} = UseGetUserInfo();
    useEffect(() => {
        if (username) {
            setWaitingUserData(false);
            return;
        }
        run();
    },[username])
    return {waitingUserData};
}

export default useLoadUserDate;
