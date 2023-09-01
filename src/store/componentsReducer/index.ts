import {ComponentPropsType} from "../../components/QuestionComponents";
import {userSlice} from "../userReducer";
import {produce} from 'immer';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ComponentInfoType = {
    fe_id: string  // 返回的组件id
    type: string   // 返回的组件类型
    title: string  // 返回的组件标题
    props: ComponentPropsType;  // 返回的组件属性
}

export type ComponentsStateType = {
    selectId: string;   // 选中组件的ID
    componentList: ComponentInfoType[];  //  后端返回的组件集合
};

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
        changeSelectId: ((draft: ComponentsStateType, action: PayloadAction<string>) => {
            draft.selectId = action.payload;
        }),

        // 添加新组件
        addComponent: produce((draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
            const newComponent = action.payload;
            const {selectId, componentList} = draft;
            const index = componentList.findIndex(c => c.fe_id === selectId);
            if (index < 0) {  // 说明现在画布中没有有被选中的组件
                draft.componentList.push(newComponent)  // 那么直接在末尾追加一个组件
            } else {
                // 选中了组件，插入到选中组件的后面
                draft.componentList.splice(index + 1, 0, newComponent);
            }
            // 添加组件后将选中的组件改变成新添加的组件
            draft.selectId = newComponent.fe_id;
        }),

        // 修改组件属性
        changeComponentPops: produce((
            draft: ComponentsStateType,
            action: PayloadAction<{ fe_id: string, newProps: ComponentPropsType }>) => {
            const {fe_id, newProps} = action.payload;
            const curComp = draft.componentList.find(c => c.fe_id === fe_id) as ComponentInfoType;
            console.log(newProps,"newProps");
            console.log(curComp.props);
            if (curComp) {
                curComp.props = {
                    ...curComp.props,
                    ...newProps
                }
            }
        })
    }
})

export const {resetComponents, changeSelectId, addComponent,changeComponentPops} = componentsSlice.actions;
export default componentsSlice.reducer;

