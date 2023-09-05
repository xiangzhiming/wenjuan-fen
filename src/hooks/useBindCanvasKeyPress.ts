import {useDispatch} from "react-redux";
import {useKeyPress} from "ahooks";
import {
    copySelectedComponent,
    pasteCopiedComponent,
    removeSelectedComponent, selectNextComponent,
    selectPrevComponent
} from "../store/componentsReducer";



// 判断activeElem 是否合法
function isActiveElementValid() {
    const activeElem = document.activeElement;
    if (activeElem === document.body) return true; // 光标没有focus 到 input
    return false;
}


function useBindCanvasKeyPress() {
    const dispatch = useDispatch();
    // 删除组件快捷键
    useKeyPress(['backspace','delete'], () => {
        if (!isActiveElementValid()) return;
        dispatch(removeSelectedComponent());
    })

    // 复制快捷键
    useKeyPress(['ctrl.c','meta.c'], () => {
        if (!isActiveElementValid()) return;
        dispatch(copySelectedComponent());
    })

    // 粘贴快捷键
    useKeyPress(['ctrl.v','meta.v'], () => {
        if (!isActiveElementValid()) return;
        dispatch(pasteCopiedComponent());
    })

    // 选中上一个
    useKeyPress(['uparrow'], () => {
        if (!isActiveElementValid()) return;
        dispatch(selectPrevComponent())
    })
    // 选中下一个

    useKeyPress("downarrow", () => {
        dispatch(selectNextComponent())
    })

    // TODO: 撤销  重做
}




export default useBindCanvasKeyPress;
