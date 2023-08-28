import {FC} from "react";
import {Outlet} from "react-router-dom"
import useLoadUserDate from "../hooks/useLoadUserDate";
import {Spin} from "antd";
import {useNavPage} from "../hooks/useNavPage";   //  改组建类似于vue中的插槽

// 公共组件
const QuestionLayout:FC = () => {
    // 加载用户信息
    const {waitingUserData} = useLoadUserDate();
    // 用户没有登录时，跳转到登录页
    useNavPage(waitingUserData);

    return(
        <div style={{height: '100vh'}}>
            {waitingUserData ? (
                <div style={{textAlign: "center",marginTop:'60px'}}>
                    <Spin/>
                </div>
            ) : (
                <Outlet/>
            )}
        </div>
    )
}

export default QuestionLayout
