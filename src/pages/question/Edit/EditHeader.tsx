import {ChangeEvent, FC, useState} from "react";
import styles from "./EditHeader.module.scss";
import {Button, Input, Space} from "antd";
import {EditOutlined, LeftOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import Title from "antd/es/typography/Title";
import {EditToolbar} from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import {useDispatch} from "react-redux";
import {changePageTitle} from "../../../store/pageInfoReducer";


const TitleElem:FC = () => {
    const {title} = useGetPageInfo();
    const [editState, setEditState] = useState(false);

    const dispatch = useDispatch();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const newTitle = event.target.value.trim()
        if (!newTitle) return;
        dispatch(changePageTitle(newTitle))
    }

    if (editState) {
        return <Input value = {title} onChange={handleChange} onPressEnter={()=>setEditState(false)}
                      onBlur={()=>setEditState(false)}/>
    }

    return(<Space>
        <Title>
            {title}
        </Title>
        <Button icon={<EditOutlined/>} type={"text"} onClick={()=>setEditState(true)}/>
    </Space>);
}

/**
 * 编辑器头部
 * @constructor
 */
export const EditHeader:FC = () => {
    const nav = useNavigate()
    return(<div className={styles["header-wrappe"]}>
        <div className={styles.header}>
            <div className={styles.left}>
                <Space>
                    <Button type={"link"} icon={<LeftOutlined/>} onClick={() => nav(-1)}>返回</Button>
                    <TitleElem/>
                </Space>
            </div>
            <div className={styles.main}>
                <EditToolbar/>
            </div>
            <div className={styles.right}>
                <Space>
                    <Button>保存</Button>
                    <Button type={"primary"}>发布</Button>
                </Space>
            </div>
        </div>
    </div>)
}
