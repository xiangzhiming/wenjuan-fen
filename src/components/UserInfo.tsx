import {FC} from "react";
import {Link, useNavigate} from "react-router-dom";
import {LOGIN_PATHNAME} from "../router";
import {useRequest} from "ahooks";
import {getUserInfoService} from "../services/user";
import {UserOutlined} from "@ant-design/icons";
import {Button, message} from "antd";
import {removeToken} from "../utils/user-token";
import UseGetUserInfo from "../hooks/useGetUserInfo";
import {useDispatch} from "react-redux";
import {logOutReducer} from "../store/userReducer";

const UserInfo:FC = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    /*const {data} = useRequest(getUserInfoService);
    const {username,nickname} = data || {};*/

    const {username,nickname} = UseGetUserInfo();  // 代替上面两行

    function logOut() {
        dispatch(logOutReducer())
        removeToken(); // 清除储存在浏览器的token
        message.success("退出成功");
        nav(LOGIN_PATHNAME);

    }

    const userInfo = (
        <>
            <span style={{color: '#e8e8e8'}}>
                <UserOutlined/>
                {nickname}
            </span>
            <Button type={"link"} onClick={logOut}>退出</Button>
        </>
    )

    const login = (
        <>
            <Link to={LOGIN_PATHNAME}>
                登录
            </Link>
        </>
    )

    return(
        <div>
            {username ? userInfo:login}
        </div>
    )
}
export default UserInfo
