import {FC, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import styles from "./Login.module.scss";
import {Button, Checkbox, Form, Input, Space} from "antd";
import Title from "antd/es/typography/Title";
import {UserAddOutlined} from "@ant-design/icons";
import {MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME} from "../router";
import {useRequest} from "ahooks";
import {loginService} from "../services/user";
import {setToken} from "../utils/user-token";
// initialValues: 初始化表单中的Item的值
// 登录页
const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";
function remenberUser(username: string, password: string) {
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(PASSWORD_KEY, password);
}
function deleteUserFromStorage() {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(PASSWORD_KEY);

}
function getUserInfoFromStorage() {
    return {
        username: localStorage.getItem(USERNAME_KEY),
        password: localStorage.getItem(PASSWORD_KEY)
    }
}
const Login:FC = () => {
    const nav = useNavigate();
    const [form] = Form.useForm();
    useEffect(() => {
        const {username, password} = getUserInfoFromStorage();
        form.setFieldsValue({username, password});
    })

    // 登录
    const {run: login} = useRequest(
        async (username,password) => {
            return await loginService(username, password);
        },
        {
            manual: true,
            debounceWait: 500,
            onSuccess(result ) {
                const {token = ''} = result;
                setToken(token);
                nav(MANAGE_INDEX_PATHNAME);  // 登陆成功过，跳转到首页
            }
        }
    )

    const onFinish = (values: any) => {
        const {username,password} = values
        login(username, password);
        if (values.remember) {
            remenberUser(username, password);
        } else {
            deleteUserFromStorage();
        }
    };
    // let nav = useNavigate();
    // onClick={() => nav(-1)}  直接执行返回的的nav函数   nav()函数的参数-1，表示路由返回到上一级
    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={3}><UserAddOutlined/></Title>
                    <Title level={3}>用户登录</Title>
                </Space>
            </div>
            <div>
                <Form labelCol={{span: 7}} wrapperCol={{span: 16}} onFinish={onFinish} initialValues={{remember: true}}
                form={form}>
                    <Form.Item label={"用户名"} name={"username"} rules={[{required: true,message: "请输入用户名"},
                        {type: 'string',min: 5,max: 20, message:'字符长度在5-20之间'},
                        {pattern:/^\w+$/, message: "只能是字母数字下划线"}
                    ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={"密码"} name={"password"} rules={[{required: true,message: '请输入密码'}]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item name={"remember"} valuePropName={"checked"} wrapperCol={{offset: 7,span: 16}}>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 7,span: 16}}>
                        <Button type={"primary"} htmlType={"submit"}>登录</Button>
                        <Link to={REGISTER_PATHNAME}>注册新用户</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
