import {FC,MouseEvent} from "react";
import styles from "./EditCanvas.module.scss"
import Component from "../../../components/QuestionComponents/QuestionTitle/Component";
import {Spin} from "antd";
import classnames from "classnames";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {changeSelectId, ComponentInfoType} from "../../../store/componentsReducer";
import {getComponetConfByType} from "../../../components/QuestionComponents";
import {useDispatch} from "react-redux";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";

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
    const {componentList, selectId} = useGetComponentInfo();
    const dispatch = useDispatch();
    useBindCanvasKeyPress();
    if (loading) {
        return (
            <div style={{textAlign: "center", marginTop: "24px"}}>
                <Spin/>
            </div>
        )
    }

    function handleClick(event:MouseEvent,id: string) {
        event.stopPropagation();   // 阻止事件冒泡
        dispatch(changeSelectId(id));
    }

    return (
        <div className={styles.canvas}>
            {componentList
                .filter(c => !c.isHidden)
                .map(item => {
                const {fe_id,isLocked} = item;
                const wrapperDefaultClassName = styles["component-wrapper"];
                const selectedClassName = styles.selected;
                const lockedClassName = styles.locked;
                const wrapperClassName = classnames({
                    [wrapperDefaultClassName]: true,
                    [selectedClassName]: fe_id === selectId,
                    [lockedClassName]: isLocked
                })
                return (<div key={fe_id} className={wrapperClassName}
                             onClick={(event) => handleClick(event,fe_id)}>
                    <div className={styles.component}>{genComponent(item)}</div>
                </div>);
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
