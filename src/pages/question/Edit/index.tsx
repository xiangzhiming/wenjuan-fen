import {FC} from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";

const Edit:FC = () => {
    // 加载用户信息
    const {loading} = useLoadQuestionData();
    return (
        <div className={styles.container}>
            <div style={{backgroundColor: '#fff',height:"40px"}}>Header</div>
            <div className={styles["content-wrapper"]}>
                <div className={styles.context}>
                    <div className={styles.left}>Left</div>
                    <div className={styles.main}>
                        <div className={styles["canvas-wrapper"]}>
                    {/*        <div style={{height: "900px"}}>画布测试滚动</div>*/}

                            <EditCanvas loading = {loading}/>

                        </div>
                    </div>
                    <div className={styles.right}>Right</div>
                </div>
            </div>
        </div>
    )
}

export default Edit
