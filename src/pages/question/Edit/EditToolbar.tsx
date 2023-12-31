import {FC} from "react";
import {Button, Space, Tooltip} from "antd";
import {
    BlockOutlined,
    CopyOutlined,
    DeleteOutlined, DownOutlined,
    EyeInvisibleOutlined,
    LockOutlined, RedoOutlined, UndoOutlined,
    UpOutlined
} from "@ant-design/icons";
import {ActionCreators as UndoActionCreators} from 'redux-undo';
import {useDispatch} from "react-redux";
import {
    changeComponentHidden,
    copySelectedComponent, moveComponent, pasteCopiedComponent,
    removeSelectedComponent,
    toggleComponentLocked
} from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

export const EditToolbar: FC = () => {
    const dispatch = useDispatch();
    const {selectId, componentList, selectedComponent, copiedComponent} = useGetComponentInfo();
    const {isLocked} = selectedComponent || {};
    const length = componentList.length;
    const selectedIndex = componentList.findIndex(c => c.fe_id === selectId);
    const isFirst = selectedIndex <= 0; // 表示排在第一个了，没办法上移
    const isLast = selectedIndex + 1 >= length;  // 表示排在最后一个了，没办法下移了


    // 删除组件
    function handleDelete() {
        dispatch(removeSelectedComponent());
    }

    // 隐藏组件
    function handleHidden() {
        dispatch(changeComponentHidden({fe_id: selectId, isHidden: true}));
    }

    // 锁定组件
    function handleLock() {
        dispatch(toggleComponentLocked({fe_id: selectId}))
    }

    // 复制
    function copy() {
        dispatch(copySelectedComponent());
    }

    // 粘贴
    function paste() {
        dispatch(pasteCopiedComponent());
    }


    // 上移
    function moveUp() {
        if (isFirst) return;
        dispatch(moveComponent({oldIndex: selectedIndex, newIndex: selectedIndex - 1}))
    }

    // 下移
    function moveDown() {
        if (isLast) return;
        dispatch(moveComponent({oldIndex: selectedIndex, newIndex: selectedIndex + 1}))
    }

    // 撤销
    function undo() {
        dispatch(UndoActionCreators.undo())
    }

    // 重做
    function redo() {
        dispatch(UndoActionCreators.redo())
    }

    return (<Space>
        <Tooltip title={"删除"}>
            <Button shape={"circle"} icon={<DeleteOutlined/>} onClick={handleDelete}/>
        </Tooltip>
        <Tooltip title={"隐藏"}>
            <Button shape={"circle"} icon={<EyeInvisibleOutlined/>} onClick={handleHidden}/>
        </Tooltip>
        <Tooltip title={"锁定"}>
            <Button shape={"circle"} icon={<LockOutlined/>} onClick={handleLock}
                    type={isLocked ? "primary" : "default"}/>
        </Tooltip>
        <Tooltip title={"复制"}>
            <Button shape={"circle"} icon={<CopyOutlined/>} onClick={copy}/>
        </Tooltip>
        <Tooltip title={"粘贴"}>
            <Button shape={"circle"} icon={<BlockOutlined/>} onClick={paste}
                    disabled={copiedComponent == null}/>
        </Tooltip>
        <Tooltip title={"上移"}>
            <Button shape={"circle"} icon={<UpOutlined/>} onClick={moveUp}
                    disabled={isFirst}/>
        </Tooltip>
        <Tooltip title={"下移"}>
            <Button shape={"circle"} icon={<DownOutlined/>} onClick={moveDown}
                    disabled={isLast}/>
        </Tooltip>
        <Tooltip title={"撤销"}>
            <Button shape={"circle"} icon={<UndoOutlined/>} onClick={undo}/>
        </Tooltip>
        <Tooltip title={"重做"}>
            <Button shape={"circle"} icon={<RedoOutlined/>} onClick={redo}/>
        </Tooltip>

    </Space>)
}
