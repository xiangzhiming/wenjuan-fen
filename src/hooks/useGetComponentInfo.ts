import {StateType} from "../store";
import {ComponentsStateType} from "../store/componentsReducer";
import {useSelector} from "react-redux";

function useGetComponentInfo() {
    const components = useSelector<StateType>(state => state.components) as ComponentsStateType;
    const {componentList} = components;
    return {componentList};
}

export default useGetComponentInfo;
