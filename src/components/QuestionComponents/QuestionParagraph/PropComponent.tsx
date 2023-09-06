import {FC, useEffect} from "react";
import {QuestionParagraphPropsType} from "./interface";
import {Form} from "antd";
import TextArea from "antd/es/input/TextArea";
import Checkbox from "antd/es/checkbox/Checkbox";

export const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
    const [form] = Form.useForm();
    const {text = "", isCenter, disabled, onChange} = props;
    useEffect(() => {
        form.setFieldsValue({text,isCenter})
    },[text,isCenter])

    function handleValuesChange() {
        if (onChange) {
            onChange(form.getFieldsValue());
        }
    }

    return (<Form layout={"vertical"} initialValues={{text, isCenter}} onValuesChange={handleValuesChange}
                  disabled={disabled} form={form}>
        <Form.Item label={"段落内容"} name={"text"} rules={[{required: true,message: "请输入段落内容"}]}>
            <TextArea/>
        </Form.Item>
        <Form.Item name={"isCenter"} valuePropName={"checked"}>
            <Checkbox>居中显示</Checkbox>
        </Form.Item>
    </Form>)
}
