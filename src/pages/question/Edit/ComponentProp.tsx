import {FC} from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {ComponentPropsType, getComponetConfByType} from "../../../components/QuestionComponents";
import {useDispatch} from "react-redux";
import {changeComponentPops} from "../../../store/componentsReducer";

const NoProp:FC = () => {
    return(<div style={{textAlign: "center"}}>
        未选中组件
    </div>)
}

export const ComponentProp:FC = () => {
    const dispatch = useDispatch();
    const {selectedComponent} = useGetComponentInfo()
    if (selectedComponent == null) return<NoProp/>
    const {type,props} = selectedComponent;
    const componentConf = getComponetConfByType(type);
    if (componentConf == null) return<NoProp/>
    const {PropComponent} = componentConf;

    function changeProps(newProps:ComponentPropsType) {
        if (selectedComponent == null) return;
        const {fe_id} = selectedComponent;
        dispatch(changeComponentPops({fe_id, newProps}))
    }

    return (<div>
        <PropComponent {...props} onABC={changeProps}/>
    </div>);
}
