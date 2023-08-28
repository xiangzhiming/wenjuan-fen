import {FC, useEffect, useState} from "react";
import {Space, Typography} from "antd";
import {FormOutlined} from "@ant-design/icons";
import styles from "./Logo.module.scss"
import {Link} from "react-router-dom";
import {HOME_PATHNAME, MANAGE_INDEX_PATHNAME} from "../router";
import UseGetUserInfo from "../hooks/useGetUserInfo";
const {Title} = Typography
const Logo:FC = () => {
    const [pathname, setPathName] = useState(HOME_PATHNAME);
    const {username} = UseGetUserInfo();
    useEffect(() => {
        if (username) {
            setPathName(MANAGE_INDEX_PATHNAME);
        }
    }, [username]);
 
    return (
        <div className={styles.container}>
            <Link to={pathname}>
                <Space>
                    <Title>
                        <FormOutlined/>
                    </Title>
                    <Title>
                        法制问卷
                    </Title>
                </Space>
            </Link>
        </div>
    );
}
export default Logo;
