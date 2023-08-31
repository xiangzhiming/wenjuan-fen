import {FC} from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {getComponetConfByType} from "../../../components/QuestionComponents";
import {PropComponent} from "../../../components/QuestionComponents/QuestionInput/PropComponent";

const NoProp:FC = () => {
    return(<div style={{textAlign: "center"}}>
        未选中组件
    </div>)
}

export const ComponentProp:FC = () => {
    const {selectedComponent} = useGetComponentInfo()
    if (selectedComponent == null) return<NoProp/>
    const {type,props} = selectedComponent;
    const componentConf = getComponetConfByType(type);
    if (componentConf == null) return<NoProp/>
    const {PropComponent} = componentConf;
    return (<div>
        <PropComponent {...props}/>
    </div>);
}
