import {FC} from "react";
import {Outlet, useLocation, useNavigate,} from "react-router-dom"   //  改组建类似于vue中的插槽
import styles from "./ManageLayout.module.scss"
import {Button, Divider, message, Space} from "antd";
import {BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined} from "@ant-design/icons";
import {createQuestionService} from "../services/question";
import {useRequest} from "ahooks";
// Space 包裹按钮后可以让按钮有好看的间隙 direction="vertical" 属性设置间隙是横排的还是竖排的间隙
// Divider 分割线
// useLocation()  获取当前路由的path路径。  startsWith：目标字符串与源字符串是否相等，返回boolean类型

// 公共组件
const ManageLayout:FC = () => {
    let nav = useNavigate();
    let {pathname} = useLocation();
    /*
    const [loading, setLoading] = useState(false);
    async function handleCreateClick() {
        setLoading(true);
        const data = await createQuestionService();
        const {id} = data || {};
        if (id) {
            nav(`/question/edit/${id}`);
            message.success('创建成功');
        }
        setLoading(false);
    }*/

    const {loading,run:handleCreateClick} = useRequest(createQuestionService,{
        manual: true,
        onSuccess(result){
            nav(`/question/edit/${result.id}`);
            message.success(`创建成功`);
        }
    })


    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Space direction="vertical">
                    <Button type={"primary"} size={"large"} icon={<PlusOutlined/>} onClick={handleCreateClick}
                            disabled={loading}>
                        新建问卷
                    </Button>
                    <Divider style={{borderTop: "transparent"}}/>
                    <Button type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
                            size="large" icon={<BarsOutlined/>} onClick={() => nav("/manage/list")}>
                        我的问卷
                    </Button>
                    <Button type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
                            size="large" icon={<StarOutlined/>} onClick={() => nav("/manage/star")}>
                        星标问卷
                    </Button>
                    <Button type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
                            icon={<DeleteOutlined/>} onClick={() => nav("/manage/trash")}>
                        回收站
                    </Button>
                </Space>
            </div>
            <div className={styles.right}>
                <Outlet/>
            </div>
        </div>
    );
}

export default ManageLayout
