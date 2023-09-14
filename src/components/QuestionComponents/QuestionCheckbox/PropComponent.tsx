import {FC} from "react";
import {QuestionCheckboxPropsType} from "./interface";
import {Form, Input} from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";

export const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
    const {title, isVertical, list = [], disabled, onChange} = props;
    const [form] = Form.useForm();

    function handleValuesChange() {
        
    }

    return (<Form form={form} layout={"vertical"} initialValues={{title, isVertical, list}} disabled={disabled}
                  onValuesChange={handleValuesChange}>
        <Form.Item label={"标题"} name={"title"} rules={[{required: true, message: "请输入标题...|"}]}>
            <Input/>
        </Form.Item>
        <Form.Item name={"isVertical"} valuePropName={"checked"}>
            <Checkbox>竖向排列</Checkbox>
        </Form.Item>
    </Form>)
}
