import {FC, useState} from "react";
import styles from "./QuestionCard.module.scss"
import {Button, Divider, Popconfirm, Space, Tag, Modal, message} from "antd";
import {
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    ExceptionOutlined,
    LineChartOutlined,
    StarOutlined
} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import { useRequest } from "ahooks";
import {duplicateQuestionService, updateQuestionService} from "../services/question";


type PropsType = {
    _id: string
    title: string
    isStar: boolean
    answerCount: number
    createAt: string
    isPublished: boolean
}
const QuestionCard:FC<PropsType> = (props) => {
    let nav = useNavigate();
    const {_id,title,createAt,answerCount,isPublished,isStar} = props;
    const {confirm} = Modal;
/*    function duplicate() {
        message.info("复制成功")
    }*/

    const {loading: duplicateLoading,run: duplicate} = useRequest(
        async () => {
            const data = await duplicateQuestionService(_id);
            // 因为在onSuccess中需要使用到本次响应的id，所以要将结果返回。
            return data;
        },
        {
            manual: true,
            onSuccess(data){
                message.success("复制成功");
                nav(`/question/edit/${data.id}`)
            }
        }
    )

    const [isDeletedState, setIsDeletedState] = useState(false);
    const {loading: deleteLoading, run: deleteQuestion} = useRequest(
        async () => updateQuestionService(_id,{isDeleted: true}),
        {
            manual: true,
            onSuccess() {
                message.success("删除成功");
                setIsDeletedState(true);
            }
        })

    function del() {
        confirm({
            title: "确定要删除该数据吗？",
            icon: <ExceptionOutlined/>,
            onOk: deleteQuestion
        })
    }
    const [isStarState,setIsStarState] = useState(isStar)
    const {loading: changeStarLoading, run: changeStar} = useRequest(
        async () => {
            await updateQuestionService(_id,{isStar:!isStarState})
        },
        {
            manual: true,
            onSuccess() {
                setIsStarState(!isStarState);
                if(isStarState){
                    message.success("已取消");
                }else{
                    message.success("已标星");
                }

            }
        }
    )

    if (isDeletedState) return null;
    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.left}>
                    <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/{${_id}`}>
                        <Space>
                            {isStarState && <StarOutlined style={{color: "red"}}/> }
                            {title}
                        </Space>
                    </Link>
                </div>
                <div className={styles.right}>
                    <Space>
                        {isPublished ? <Tag color="success">已发布</Tag> : <Tag color="error">未发布</Tag>}
                        <span>答卷:{answerCount}</span>
                        <span>{createAt}</span>
                    </Space>
                </div>
            </div>
            <Divider style={{margin: "12px"}}/>
            <div className={styles["button-container"]}>
                <div className={styles.left}>
                    <Space>
                        <Button icon={<EditOutlined/>} type={"text"} size={"small"}
                                onClick={() => nav(`/question/edit/${_id}`)}>
                            编辑问卷
                        </Button>
                        <Button  icon={<LineChartOutlined/>} type={"text"} size={"small"} disabled={!isPublished}
                                onClick={() => nav(`/question/stat/${_id}`)}>
                            问卷统计
                        </Button>
                    </Space>
                </div>
                <div className={styles.right}>
                    <Space>
                        <Button type={"text"} icon={<StarOutlined/>} size={"small"} onClick={changeStar}
                                disabled = {changeStarLoading}>
                            {isStarState ? "取消标星" : "标星"}
                        </Button>
                        <Popconfirm title={"确定复制该问卷？"} okText={"确定，请复制它"} cancelText={"不不不，不复制"}
                            onConfirm={duplicate} description={duplicateLoading}>
                            <Button type={"text"} icon={<CopyOutlined/>} size={"small"}>
                                复制
                            </Button>
                        </Popconfirm>

                        <Button type={"text"} icon={<DeleteOutlined/>} size={"small"} onClick={del} disabled={deleteLoading}>
                            删除
                        </Button>
                    </Space>
                </div>
            </div>
        </div>)
}
export default QuestionCard;
