import {FC, useEffect} from "react";
import {QuestionTextareaPropsType} from "./interface";
import {Form, Input} from "antd";

export const PropComponent:FC<QuestionTextareaPropsType> = (props:QuestionTextareaPropsType) => {
    const [form] = Form.useForm();
    const {title,placeholder,onChange,disabled} = props;

    useEffect(() => {
        form.setFieldsValue({title,placeholder});
    },[title,placeholder]);

    function handleValueChange() {
        if (onChange) {
            onChange(form.getFieldsValue());
        }
    }

    return (
        <Form onValuesChange={handleValueChange} layout={"vertical"} initialValues={{title,placeholder}}
              disabled = {disabled} form={form}>
            <Form.Item label="标题" name="title" rules={[{required: true,message: "请输入标题..."}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Placeholder" name="placeholder">
                <Input/>
            </Form.Item>
        </Form>
    )
}
