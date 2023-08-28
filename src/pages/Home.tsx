import {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button,Typography} from "antd";
import {MANAGE_INDEX_PATHNAME} from "../router";
import styles from "./Home.module.scss"
import '../_mock'

const {Title,Paragraph} = Typography

// 首页
const Home:FC = () => {
    // useNavigate 返回一个可以注册路由的函数。路由链接已经在路由表编写好了
    useEffect(() => {
//       axios.get('/api/test').then(res => console.log('axios',res));
        // 前端端口3000，后端模拟服务器端口3001，不同源，产生跨域问题
        // 解决：
        fetch('/api/test')
            .then(res => res.json());
    },[])

    const nav = useNavigate()
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <Title>
                    问卷调查 | 在线投票
                </Title>
                <Paragraph>
                    已累计创建问卷 100 份，发布问卷 90份，收到答卷 980 份
                </Paragraph>
                <div>
                    <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>开始使用</Button>
                </div>
            </div>
        </div>
    );
}

export default Home
