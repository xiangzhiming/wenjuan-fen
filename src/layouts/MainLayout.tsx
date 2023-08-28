import {FC} from "react";
import {Outlet, useNavigate} from "react-router-dom"
import {Layout, Spin} from "antd";   //  改组建类似于vue中的插槽
import styles from "./MainLayout.module.scss"
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";
import useLoadUserDate from "../hooks/useLoadUserDate";
import {useNavPage} from "../hooks/useNavPage";

const {Header,Content,Footer} = Layout

// 公共组件
const MainLayout:FC = () => {
    const {waitingUserData} = useLoadUserDate();
    useNavPage(waitingUserData);
    return(
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}>
                    <Logo/>
                </div>
                <div className={styles.right}>
                    <UserInfo/>
                </div>
            </Header>
            <Content className={styles.main} >
                {waitingUserData ? (<div style={{textAlign: "center",marginTop:'60px'}}><Spin/></div>) : <Outlet/>}
            </Content>
            <Footer className={styles.footer}>
                法制调查 &copy;2023 - present. Created by 大帅比
            </Footer>
        </Layout>
    )
}

export default MainLayout
