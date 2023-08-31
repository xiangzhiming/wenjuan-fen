import {StateType} from "../store";
import {ComponentsStateType} from "../store/componentsReducer";
import {useSelector} from "react-redux";

function useGetComponentInfo() {
    const components = useSelector<StateType>(state => state.components) as ComponentsStateType;
    const {componentList,selectId} = components;
    const selectedComponent = componentList.find(c => c.fe_id === selectId);
    return {componentList,selectId,selectedComponent};
}

export default useGetComponentInfo;
