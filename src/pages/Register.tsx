import {FC} from "react";
import Title from "antd/es/typography/Title";
import {UserAddOutlined} from "@ant-design/icons";
import {Button, Form, Input, message, Space} from "antd";
import styles from "./Register.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {LOGIN_PATHNAME} from "../router";
import {useRequest} from "ahooks";
import {registerService} from "../services/user";


// 注册页
const Register:FC = () => {
    const nav = useNavigate()
    const {run:register} = useRequest(
        async value => {
            const {username,password,nickname} = value
            return registerService(username, password, nickname);
        },
        {
            manual: true,
            onSuccess() {
                message.success("注册成功");
                nav(LOGIN_PATHNAME)
            }
        }
    )

    const onFinish = (values: any) => {
        register(values);  // 发送ajax请求功能
    };
    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={3}><UserAddOutlined/></Title>
                    <Title level={3}>注册新用户</Title>
                </Space>
            </div>
            <div>
                <Form labelCol={{span: 7}} wrapperCol={{span: 16}} onFinish={onFinish}>
                    <Form.Item label={"昵称"} name={"nickname"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={"用户名"} name={"username"} rules={[
                        {required: true,message: "请输入用户名"},
                        {required: true,message: "字符长度在5-20之间", max: 20, min: 5},
                        {pattern: /^\w+$/, message: "只能是字母数字下划线"},
                    ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={"密码"} name={"password"} rules={[
                        {required: true,message: "请输入密码"}
                    ]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item label={"确认密码"} name={"confirm"}
                               dependencies={["password"]} rules={[
                        {required: true, message: "请输入密码"},
                        ({getFieldValue}) => ({
                            validator(_,value){
                                if (!value || getFieldValue("password") == value){
                                    return Promise.resolve()
                                } else {
                                    return Promise.reject(new Error(("两次密码不一致")))
                                }
                            }
                        })

                    ]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 7, span: 20}}>
                        <Space>
                            <Button htmlType={"submit"} type={"primary"}>
                                注册
                            </Button>
                            <Link to={LOGIN_PATHNAME}>已有账户，请登录</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Register
