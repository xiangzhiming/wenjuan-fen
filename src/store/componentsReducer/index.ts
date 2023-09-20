import {ComponentPropsType} from "../../components/QuestionComponents";
import {produce} from 'immer';
import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {getNextSelectedId, insertNewComponent} from "./utils";
import cloneDeep from "lodash.clonedeep";
import {arrayMove} from "@dnd-kit/sortable";

export type ComponentInfoType = {
    fe_id: string  // 返回的组件id
    type: string   // 返回的组件类型
    title: string  // 返回的组件标题
    isHidden?: boolean // 返回的组件是否隐藏的属性
    isLocked?: boolean,  //  组件是否锁定
    props: ComponentPropsType;  // 返回的组件属性
}

export type ComponentsStateType = {
    selectId: string;   // 选中组件的ID
    componentList: ComponentInfoType[];  //  后端返回的组件集合
    copiedComponent: ComponentInfoType | null
};

const INIT_STATE: ComponentsStateType = {
    selectId: "",
    componentList: [],
    copiedComponent: null
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
            insertNewComponent(draft, newComponent);
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
            draft.selectId = getNextSelectedId(removedId, componentList);
            componentList.splice(componentList.findIndex(c => c.fe_id === removedId), 1);  // 删除componentList数组中下标为index的元素
        }),

        // 隐藏/显示  组件
        changeComponentHidden: produce(
            (
                draft: ComponentsStateType,
                action: PayloadAction<{ fe_id: string, isHidden: boolean }>
            ) => {
                const {componentList} = draft;
                const {fe_id, isHidden} = action.payload;

                let newSelectedId;
                if (isHidden) {
                    // 要隐藏
                    newSelectedId = getNextSelectedId(fe_id, componentList);
                } else {
                    // 要显示
                    newSelectedId = fe_id
                }
                // 隐藏后重新计算默认的选中组件
                draft.selectId = newSelectedId;

                const curComp = componentList.find(c => c.fe_id === fe_id);
                if (curComp) {
                    curComp.isHidden = isHidden;
                }
            }),

        // 锁定/解锁  组件
        toggleComponentLocked: produce((draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
            const {fe_id} = action.payload;
            const curComp = draft.componentList.find(c => c.fe_id === fe_id);
            if (curComp) {
                curComp.isLocked = !curComp.isLocked;
            }
        }),

        // 拷贝当前选中的组件
        copySelectedComponent: produce(
            (draft: ComponentsStateType) => {
                const {selectId, componentList = []} = draft;
                const selectedComponent = componentList.find(c => c.fe_id === selectId) || null;
                if (selectedComponent === null) return;
                draft.copiedComponent = cloneDeep(selectedComponent);
            }
        ),

        // 粘贴组件
        pasteCopiedComponent: produce((draft: ComponentsStateType) => {
            const {copiedComponent} = draft;
            if (copiedComponent == null) return;

            // 要把fe_id给修改了
            copiedComponent.fe_id = nanoid();
            // 插入 copiedComponent
            insertNewComponent(draft, copiedComponent);
        }),

        // 选中上一个
        selectPrevComponent: produce((draft: ComponentsStateType) => {
            const {selectId, componentList} = draft;
            const selectedIndex = componentList.findIndex(c => c.fe_id === selectId);
            if (selectedIndex < 0) return;  // 未选中组件
            if (selectedIndex <= 0) return; // 已经选中第一个，无法在向上选中
            draft.selectId = componentList[selectedIndex - 1].fe_id
        }),

        // 选中下一个
        selectNextComponent: produce((draft: ComponentsStateType) => {
            const {selectId, componentList} = draft;
            const selectedIndex = componentList.findIndex(c => c.fe_id === selectId);
            if (selectedIndex < 0) return;  // 未选中组件
            if ((selectedIndex + 1) === componentList.length) return; // 已经选中最后一个，无法在向下选中
            draft.selectId = componentList[selectedIndex + 1].fe_id
        }),

        // 修改 selectedId
        changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
            draft.selectId = action.payload
        }),

        // 修改组件标题
        changeComponentTitle: produce((draft: ComponentsStateType,
                                       action: PayloadAction<{ fe_id: string, title: string }>) => {
                const {fe_id, title} = action.payload;
                const curComp = draft.componentList.find(c => c.fe_id === fe_id);
                if (curComp) {
                    curComp.title = title;
                }
            }
        ),

        moveComponent: produce((draft: ComponentsStateType,
                                action: PayloadAction<{ oldIndex: number, newIndex: number }>) => {
            const {componentList: curComponentList} = draft;
            draft.componentList = arrayMove(curComponentList, action.payload.oldIndex,
                action.payload.newIndex);
        })

    }


})

export const {
    resetComponents, changeSelectId, addComponent, changeComponentPops, copySelectedComponent, selectNextComponent,
    removeSelectedComponent, changeComponentHidden, toggleComponentLocked, pasteCopiedComponent, selectPrevComponent,
    changeSelectedId, changeComponentTitle, moveComponent
} = componentsSlice.actions;
export default componentsSlice.reducer;

