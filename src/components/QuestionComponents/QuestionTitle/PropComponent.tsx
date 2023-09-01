import {FC, useEffect} from "react";
import {QuestionTitlePropsType} from "./interface";
import {Checkbox, Form, Input, Select} from "antd";
import FormItem from "antd/es/form/FormItem";

export const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
    const [form] = Form.useForm();
    const {text, level, isCenter,onABC} = props;
    useEffect(() => {
        form.setFieldsValue({text, level, isCenter});
    },[text,level,isCenter]);

    function handleValueChange() {
        if (onABC) {
            onABC(form.getFieldsValue())
        }
    }

    return (
        <Form onValuesChange={handleValueChange} form={form} layout={"vertical"} initialValues={{text,level,isCenter}}>
            <FormItem label={"标题内容"} name= {"text"} rules={[{required: true, message: "请输入标题内容"}]}>
                <Input/>
            </FormItem>
            <FormItem label={"层级"} name={"level"}>
                <Select options={[
                    {value: 1, text: 1},
                    {value: 2, text: 2},
                    {value: 3, text: 3},
                ]}/>
            </FormItem>
            <FormItem name="isCenter" valuePropName={"checked"}>
                <Checkbox>居中显示</Checkbox>
            </FormItem>
        </Form>
    )
}
