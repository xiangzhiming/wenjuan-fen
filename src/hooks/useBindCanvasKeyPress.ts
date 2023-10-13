import {useDispatch} from "react-redux";
import {useKeyPress} from "ahooks";
import {ActionCreators as UndoActionCreators} from 'redux-undo';
import {
    copySelectedComponent,
    pasteCopiedComponent,
    removeSelectedComponent, selectNextComponent,
    selectPrevComponent
} from "../store/componentsReducer";


// 判断activeElem 是否合法
function isActiveElementValid() {
    const activeElem = document.activeElement;

    // 没有增加dnd-kit之前可以正常使用
    // if (activeElem === document.body) return true; // 光标没有focus 到 input

    // 增加dnd-kit之后
    if (activeElem == document.body) return true;
    // div[role="button:是一个查询器
    if (activeElem?.matches('div[role="button"]')) return true;  // matches:匹配这个元素是不是符合某一个css查询器,

    return false;
}


function useBindCanvasKeyPress() {
    const dispatch = useDispatch();
    // 删除组件快捷键
    useKeyPress(['backspace', 'delete'], () => {
        if (!isActiveElementValid()) return;
        dispatch(removeSelectedComponent());
    })

    // 复制快捷键
    useKeyPress(['ctrl.c', 'meta.c'], () => {
        if (!isActiveElementValid()) return;
        dispatch(copySelectedComponent());
    })

    // 粘贴快捷键
    useKeyPress(['ctrl.v', 'meta.v'], () => {
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

    // 撤销
    useKeyPress(['ctrl.z','meta.z'], () => {
        dispatch(UndoActionCreators.undo());
    },{
        exactMatch: true, // 严格匹配，必须只要这两个按键才能触发。
    })

    // 重做
    useKeyPress(['ctrl.shift.z','meta.shift.z'], () => {
        dispatch(UndoActionCreators.redo());
    })
}


export default useBindCanvasKeyPress;
