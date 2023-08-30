import {FC} from "react";
import {componentConfGroup, ComponentConfType} from "../../../components/QuestionComponents";
import Title from "antd/es/typography/Title";
import styles from "./ComponentLib.module.scss"
import {useDispatch} from "react-redux";
import {addComponent} from "../../../store/componentsReducer";
import {nanoid} from "@reduxjs/toolkit";

const ComponentLib:FC = () => {
    const dispatch = useDispatch();
    function genComponent(componentType: ComponentConfType) {
        const {title,type,Component,defaultProps} = componentType;
        function handleClick() {
            dispatch(addComponent(
                {
                    fe_id: nanoid(),
                    type,
                    title,
                    props: defaultProps
                }
            ))
        }
        return (<div key={type} className={styles.wrapper} onClick={handleClick}>
            <div className={styles.component}>
                <Component/>
            </div>
        </div>)
    }
    return(<div>
        {
            componentConfGroup.map((group,index) => {
                const {groupId,groupName,components} = group;
                return(<div key={groupId}>
                    <Title level={3} style={{fontSize: '16px', marginTop: index > 0 ? "20px" : "0px"}}>
                        {groupName}
                    </Title>
                    <div>{components.map(c => genComponent(c))}</div>
                </div>)
            })
        }
    </div>)
}

export default ComponentLib;
