import {StateType} from "../store";
import {ComponentsStateType} from "../store/componentsReducer";
import {useSelector} from "react-redux";

/**
 * 返回当前选中组件的State
 */
function useGetComponentInfo() {
    const components = useSelector<StateType>(state => state.components) as ComponentsStateType;
    const {componentList,selectId,copiedComponent} = components;
    const selectedComponent = componentList.find(c => c.fe_id === selectId);
    return {componentList,selectId,selectedComponent,copiedComponent};
}

export default useGetComponentInfo;
