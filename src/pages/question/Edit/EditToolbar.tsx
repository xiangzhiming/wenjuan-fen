import {FC} from "react";
import {Button, Space, Tooltip} from "antd";
import {CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {
    changeComponentHidden,
    copySelectedComponent,
    removeSelectedComponent,
    toggleComponentLocked
} from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

export const EditToolbar: FC = () => {
    const dispatch = useDispatch();
    const {selectId,selectedComponent} = useGetComponentInfo();
    const {isLocked} = selectedComponent || {};
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
            <Button shape={"circle"} icon={<LockOutlined/>} onClick={handleLock}
                    type={isLocked ? "primary" : "default"}/>
        </Tooltip>
    </Space>)
}
