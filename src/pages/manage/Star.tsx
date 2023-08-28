import {FC} from "react";
import {Empty, Spin, Typography} from "antd";
import {useTitle} from "ahooks";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";

const {Title} = Typography

// 星标问卷
const Star:FC = () => {
    const {data = {},loading} = useLoadQuestionListData({isStar: true});
    const {list = [], total} = data;
    useTitle("法制调查 - 星标问卷")
    return (
        <div>
            <div className={styles.header} >
                <div className={styles.left}>
                    <Title level={3}>
                        星标问卷
                    </Title>
                </div>
                <div className={styles.right}>
                    <ListSearch/>
                </div>
            </div>
            {loading && (<div style={{textAlign:"center"}}>
                <Spin/>
            </div>)}
            <div>
                {!loading && list.length === 0 && <Empty description={"暂无数据"}/>} &&
                {list.length > 0 && list.map((items:any) => {
                    const {_id} = items
                    return <QuestionCard key={_id} {...items}/>
                })}
            </div>
            <div className={styles.footer}>
                <ListPage total={total}/>
            </div>
        </div>
    )
}

export default Star
