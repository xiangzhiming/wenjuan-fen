import {FC, useEffect} from "react";
import {QuestionInputPropsType} from "./interface";
import {Form, Input} from "antd";

export const PropComponent:FC<QuestionInputPropsType> = (props:QuestionInputPropsType) => {
    const [form] = Form.useForm();
    const {title,placeholder,onABC} = props;

    useEffect(() => {
        form.setFieldsValue({title,placeholder});
    },[title,placeholder]);

    function handleValueChange() {
        if (onABC) {
            onABC(form.getFieldsValue());
        }
    }

    return (
        <Form onValuesChange={handleValueChange} layout={"vertical"} initialValues={{title,placeholder}} form={form}>
            <Form.Item label="标题" name="title" rules={[{required: true,message: "请输入标题..."}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Placeholder" name="placeholder">
                <Input/>
            </Form.Item>
        </Form>
    )
}
