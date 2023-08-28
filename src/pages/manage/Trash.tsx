import {FC, useState} from "react";
import {useRequest, useTitle} from "ahooks";
import styles from "./common.module.scss"
import {Button, Empty, Space, Table, Tag, Typography, Modal, Spin, message} from "antd";
import {ExclamationCircleFilled} from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";
import {deleteQuestionsService, updateQuestionService} from "../../services/question";
// dataSource:数据源，columns:每列,pagination:是否启用表格自带的分页 rowKey：指定每行数据的key取用源数据哪个字段

const tableColumns = [
    {
        title: '标题',
        dataIndex: 'title'
    },
    {
        title: '是否发布',
        dataIndex: 'isPublished',
        render: (isPublished: boolean) => {
            return isPublished ? <Tag color="success">已发布</Tag> : <Tag color="error">未发布</Tag>
        }
    },
    {
        title: '答卷',
        dataIndex: 'answerCount'
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt'
    }
]

const {Title} = Typography
const {confirm} = Modal

// 回收页
const Trash:FC = () => {
    useTitle("法制调查 - 回收站")
    // 记录选中的id
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    function del() {
        confirm({
            title: "确定删除吗？",
            icon: <ExclamationCircleFilled/>,
            content: "删除以后不可以找回",
            onOk: deleteQuestion
        })
    }

    const {data = {},loading,refresh} = useLoadQuestionListData({isStar: true});
    const {list = [], total = 0} = data;

    // 彻底删除
    const {run:deleteQuestion} = useRequest(
        async () => {
            await deleteQuestionsService(selectedIds);
        },
        {
            debounceWait: 500,
            manual: true,
            onSuccess() {
                message.success("删除成功了");
                refresh();
                setSelectedIds([]);
            }
        }
    )

    // 恢复
    const {run: recover} = useRequest(
        async () => {
            for await (const id of selectedIds) {
                updateQuestionService(id,{isDeleted: false})
            }
        },
        {
            debounceWait: 500,  // 防抖
            manual: true,
            onSuccess() {
                message.success("恢复成功");
                setSelectedIds([]);
                refresh();
            }
        }
    )

    // 可以把JSX片段定义为一个变量
    // disabled:是否禁用按钮
    const TableElem = (
        <div>
            <div>
                <Space style={{marginBottom: "20px"}}>
                    <Button type={"primary"} disabled={selectedIds.length === 0} onClick={recover}>恢复</Button>
                    <Button danger disabled={selectedIds.length === 0} onClick={del}>彻底删除</Button>
                </Space>
            </div>
            <Table dataSource={list} columns={tableColumns}
                   pagination={false} rowKey={(record) => record._id}
                   rowSelection={{
                       type: "checkbox",
                       onChange: (selectedRowKeys) => {
                           setSelectedIds(selectedRowKeys as string[]);
                       }
                   }}/>
        </div>
    )
    return (
        <div>
            {loading && (<div style={{textAlign: "center"}}>
                <Spin/>
            </div>)}
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>回收站</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch/>
                </div>
            </div>

            <div className={styles.content}>
                {!loading && list.length === 0 && <Empty description={"暂时无数据"}/>}
                {list.length > 0 && TableElem }

            </div>
            <div className={styles.footer}>
                <ListPage total={total}/>
            </div>
        </div>
    )
}

export default Trash
