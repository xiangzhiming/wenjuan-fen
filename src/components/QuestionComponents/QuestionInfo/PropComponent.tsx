import {FC, useEffect} from "react";
import {QuestionInfoPropsType} from "./interface";
import {Form} from "antd";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";

export const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
    const {title, desc, disabled, onChange} = props;
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({title, desc})
    },[title,desc])

    function handleValuesChange() {
        if (onChange) {
            onChange(form.getFieldsValue());
        }
    }

    return (
        <Form form={form} layout={"vertical"} initialValues={{title, desc}} disabled={disabled}
              onValuesChange={handleValuesChange}>
            <Form.Item name={"title"} label={"标题"} rules={[{required:true, message: "请输入问卷标题"}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={"desc"} label={"描述"}>
                <TextArea/>
            </Form.Item>

        </Form>)
}
