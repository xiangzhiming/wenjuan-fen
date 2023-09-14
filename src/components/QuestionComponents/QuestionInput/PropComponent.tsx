import {FC, useEffect} from "react";
import {QuestionInputPropsType} from "./interface";
import {Form, Input} from "antd";
import {QuestionTextareaPropsType} from "../QuestionTextarea";

export function InputAndTextarea(props: QuestionInputPropsType & QuestionTextareaPropsType) {
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

export const PropComponent:FC<QuestionInputPropsType> = (props:QuestionInputPropsType) => {
    return InputAndTextarea(props)
}
