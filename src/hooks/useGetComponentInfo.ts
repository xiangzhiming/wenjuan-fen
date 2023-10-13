import {StateType} from "../store";
import {ComponentsStateType} from "../store/componentsReducer";
import {useSelector} from "react-redux";

/**
 * 返回画布中组件的集合、组件的state和props
 */
function useGetComponentInfo() {
    const components = useSelector<StateType>(state => state.components.present) as ComponentsStateType;
    const {componentList,selectId,copiedComponent} = components;
    const selectedComponent = componentList.find(c => c.fe_id === selectId);
    return {componentList,selectId,selectedComponent,copiedComponent};
}

export default useGetComponentInfo;
