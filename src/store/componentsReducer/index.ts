import {ComponentPropsType} from "../../components/QuestionComponents";
import {userSlice} from "../userReducer";
import {produce} from 'immer';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getNextSelectedId} from "./utils";

export type ComponentInfoType = {
    fe_id: string  // 返回的组件id
    type: string   // 返回的组件类型
    title: string  // 返回的组件标题
    isHidden?: boolean // 返回的组件是否隐藏的属性
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
                // 在下标为index的元素后面添加新元素newComponent
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
            if (curComp) {
                curComp.props = {
                    ...curComp.props,
                    ...newProps
                }
            }
        }),

        // 删除选中的组件
        removeSelectedComponent: produce((draft: ComponentsStateType) => {
            const {selectId: removedId, componentList} = draft;
            // 删除组件后重新计算默认的选中组件
            const newSelectedId = getNextSelectedId(removedId, componentList);
            draft.selectId = newSelectedId;
            const index = componentList.findIndex(c => c.fe_id === removedId);
            componentList.splice(index, 1);  // 删除componentList数组中下标为index的元素
        }),

        // 隐藏/显示  组件
        changeComponentHidden: produce(
            (
            draft: ComponentsStateType,
            action: PayloadAction<{ fe_id: string, isHidden: boolean }>
            ) => {
                const {componentList} = draft;
                const {fe_id,isHidden} = action.payload;

                let newSelectedId = "";
                if (isHidden) {
                    // 要隐藏
                    newSelectedId = getNextSelectedId(fe_id, componentList);
                }else{
                    // 要显示
                    newSelectedId = fe_id
                }
                // 隐藏后重新计算默认的选中组件
                draft.selectId = newSelectedId;

                const curComp = componentList.find(c => c.fe_id === fe_id);
                if (curComp) {
                    curComp.isHidden = isHidden;
                }
        })
    }
})

export const {
    resetComponents, changeSelectId, addComponent, changeComponentPops,
    removeSelectedComponent,changeComponentHidden
} = componentsSlice.actions;
export default componentsSlice.reducer;

