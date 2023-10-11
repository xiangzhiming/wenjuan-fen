import {ChangeEvent, FC, useEffect, useState} from "react";
import styles from "./EditHeader.module.scss";
import {Button, Input, message, Space} from "antd";
import {EditOutlined, LeftOutlined, LoadingOutlined} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import Title from "antd/es/typography/Title";
import {EditToolbar} from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import {useDispatch} from "react-redux";
import {changePageTitle} from "../../../store/pageInfoReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {useDebounceEffect, useKeyPress, useRequest} from "ahooks";
import {updateQuestionService} from "../../../services/question";

/**
 * 显示和修改标题
 * @constructor
 */
const TitleElem: FC = () => {
    const {title} = useGetPageInfo();
    const [editState, setEditState] = useState(false);

    const dispatch = useDispatch();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const newTitle = event.target.value.trim()
        if (!newTitle) return;
        dispatch(changePageTitle(newTitle))
    }

    if (editState) {
        return <Input value={title} onChange={handleChange} onPressEnter={() => setEditState(false)}
                      onBlur={() => setEditState(false)}/>
    }

    return (<Space>
        <Title>
            {title}
        </Title>
        <Button icon={<EditOutlined/>} type={"text"} onClick={() => setEditState(true)}/>
    </Space>);
}


/**
 * 保存按钮
 * @constructor
 */
const SaveButton: FC = () => {
    const {id} = useParams();
    const {componentList = []} = useGetComponentInfo();
    const pageInfo = useGetPageInfo();
    const {loading, run: save} = useRequest(async () => {
            if (!id) return;
            await updateQuestionService(id, {componentList, pageInfo});
        },
        {
            manual: true
        });

    /**
     * 自动保存，（不是定期保存，不是定时器），监听我们需要保存的依赖项的变化，一秒钟后如果状态没有继续修改了再保存
     * useDebounceEffect  表示监听到依赖的信息修改完毕，间隔一秒后再触发任务
     */
    useDebounceEffect(() => {
            save();  //  任务
        }, [componentList, pageInfo],   // 依赖项
        {
            wait: 1000,   // 毫秒值   表示一秒以后再触发任务
        });

    useKeyPress(["ctrl.s", "meta.s"], (event) => {
        event.preventDefault();
        if (!loading) save();

    })
    return (<Button disabled={loading} onClick={save} icon={loading ? <LoadingOutlined/> : null}>
        保存
    </Button>)
}

// 发布按钮
const PublishButton: FC = () => {
    const nav = useNavigate();
    const {id} = useParams();
    const {componentList = []} = useGetComponentInfo();
    const pageInfo = useGetPageInfo();
    console.log("componentList", componentList);
    console.log("pageInfo", pageInfo);
    const {loading,run:pub} = useRequest(async () => {
        if (!id) return;
        await updateQuestionService(id, {
                ...pageInfo,
                componentList,
                isPublished: true // 标志着问卷已经被发布
            }
        )
    }, {
        manual: true,
        onSuccess() {
            message.success("发布成功");
            nav('/question/stat/' + id);
        }
    })
    return (<Button onClick={pub} type={"primary"} disabled={loading}>发布</Button>)
}

/**
 * 编辑器头部
 * @constructor
 */
export const EditHeader: FC = () => {
    const nav = useNavigate()
    return (<div className={styles["header-wrappe"]}>
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
                    <SaveButton/>
                    <PublishButton/>
                </Space>
            </div>
        </div>
    </div>)
}
