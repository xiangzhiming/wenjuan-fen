import {ComponentPropsType} from "../../components/QuestionComponents";
import {userSlice} from "../userReducer";
import {produce}  from 'immer';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ComponentInfoType = {
    fe_id: string
    type: string
    title: string
    props: ComponentPropsType;
}

export type ComponentsStateType = {
    selectId: string;
    componentList: ComponentInfoType[];
}

const INIT_STATE: ComponentsStateType = {
    selectId: "",
    componentList: []
}

export const componentsSlice = createSlice({
    name: "component",
    initialState: INIT_STATE,
    reducers: {
        // 重置所有组件
        resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
            return action.payload;
        },

        // 修改selectId
        changeSelectId: ((draft: ComponentsStateType,action:PayloadAction<string>) => {
            draft.selectId = action.payload;
        })
    }
})

export const {resetComponents,changeSelectId} = componentsSlice.actions;
export default componentsSlice.reducer;

