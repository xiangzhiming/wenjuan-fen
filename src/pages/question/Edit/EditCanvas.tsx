import {FC} from "react";
import styles from "./EditCanvas.module.scss"
import Component from "../../../components/QuestionComponents/QuestionTitle/Component";
import {Spin} from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {ComponentInfoType} from "../../../store/componentsReducer";
import {getComponetConfByType} from "../../../components/QuestionComponents";

export type propsType = {
    loading: boolean;
}

function genComponent(item: ComponentInfoType) {
    const {type, props} = item;
    const componentConf = getComponetConfByType(type);
    if (componentConf == null) return null;
    const {Component} = componentConf;
    return <Component {...props}/>
}

const EditCanvas: FC<propsType> = ({loading}) => {
    const {componentList} = useGetComponentInfo();
    if (loading) {
        return (
            <div style={{textAlign: "center", marginTop: "24px"}}>
                <Spin/>
            </div>
        )
    }

    return (
        <div className={styles.canvas}>

            {componentList.map(item => {
                const {fe_id} = item;

                return (<div key={fe_id} className={styles["component-wrapper"]}>
                    <div className={styles.component}>{genComponent(item)}</div>
                </div>)
            })}


            {/*<div className={styles["component-wrapper"]}>
                <div className={styles.component}>
                    <Component/>
                </div>
            </div>
            <div className={styles["component-wrapper"]}>
                <div className={styles.component}>
                    <QuestionInput/>
                </div>
            </div>*/}
        </div>
    )
}
export default EditCanvas;
