import {FC} from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";
import {useDispatch} from "react-redux";
import {changeSelectId} from "../../../store/componentsReducer";
import LeftPanel from "./LeftPanel";

const Edit:FC = () => {
    // 加载用户信息
    const {loading} = useLoadQuestionData();
    const dispatch = useDispatch();

    function clearSelectedId() {
        dispatch(changeSelectId(""));
    }

    return (
        <div className={styles.container}>
            <div style={{backgroundColor: '#fff',height:"40px"}}>Header</div>
            <div className={styles["content-wrapper"]}>
                <div className={styles.context}>
                    <div className={styles.left}>
                        <LeftPanel/>
                    </div>
                    <div className={styles.main} onClick={clearSelectedId}>
                        <div className={styles["canvas-wrapper"]}>
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
