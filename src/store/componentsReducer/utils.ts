import {ComponentInfoType, ComponentsStateType} from "./index";

export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
    // const visibleComponentList = componentList.filter(c => !c.isHidden)
    componentList = componentList.filter(c => !c.isHidden)
    const index = componentList.findIndex(c => c.fe_id === fe_id);
    // 如果index小于1，说明没有选中组件，则返回空
    if (index < 0) return "";

    const length = componentList.length; // 获取组件列表长度
    let newSelectedId = "";
    if (length <= 1) { // 如果长度小于等于1 说明画布中只有一个组件
        return ""; //组件长度就一个，删除了，就没有了，所以返回空
    }else {  // 组件长度大于1
        if (index + 1 === length){ // 如果选中的组件下标加一等于组件的长度，那么说明选中的是最后一个组件
            newSelectedId = componentList[index - 1].fe_id;  // 那么就返回选中组件的上一个组件的id
        }else{  // 如果不是选中排在最后的组件
            newSelectedId = componentList[index + 1].fe_id;  // 那么就返回选中组件的下一个组件的id
        }
    }
    return newSelectedId;
}

/**
 * 插入新组件
 * @param draft  state draft
 * @param newComponent  新组件
 */
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
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
}
