import {ComponentPropsType} from "../../components/QuestionComponents";
import {userSlice} from "../userReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ComponentInfoType = {
    fe_id: string
    type: string
    title: string
    props: ComponentPropsType;
}

export type ComponentsStateType = {
    componentList: ComponentInfoType[];
}

const INIT_STATE: ComponentsStateType = {
    componentList: []
}

export const componentsSlice = createSlice({
    name: "component",
    initialState: INIT_STATE,
    reducers: {
        // 重置所有组件
            resetComponents: (state: ComponentsStateType,action: PayloadAction<ComponentsStateType>) => {
                return action.payload;
        }
    }
})

export const {resetComponents} = componentsSlice.actions;
export default componentsSlice.reducer;

