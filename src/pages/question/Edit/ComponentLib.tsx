import {FC} from "react";
import {componentConfGroup, ComponentConfType} from "../../../components/QuestionComponents";
import Title from "antd/es/typography/Title";
import styles from "./ComponentLib.module.scss"

function genComponent(componentType: ComponentConfType) {
    const {title,type,Component} = componentType;
    return (<div className={styles.wrapper}>
        <div className={styles.component}>
            <Component/>
        </div>
    </div>)
}
const ComponentLib:FC = () => {
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
