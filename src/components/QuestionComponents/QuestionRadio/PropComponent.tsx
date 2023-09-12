import {FC, useEffect} from "react";
import {QuestionRadioPopsType} from "./interface";
import {Form, Select} from "antd";
import Input from "antd/es/input/Input";
import Checkbox from "antd/es/checkbox/Checkbox";

export const PropComponent: FC<QuestionRadioPopsType> = (props: QuestionRadioPopsType) => {
    const {title, isVertical, value, options = [], onChange, disabled} = props;
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({title, isVertical, value, options})
    }, [title, value, options, isVertical])

    function handleValuesChange() {
        if (onChange) {

        }
    }

    return (<div>
        <Form form={form} layout={"vertical"} initialValues={{title, options, value, isVertical}}
              onValuesChange={handleValuesChange}
              disabled={disabled}>
            <Form.Item label={"标题"} name={"title"} rules={[{required: true, message: "请输入标题..."}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={"isVertical"} valuePropName={"checked"}>
                <Checkbox>竖向排列</Checkbox>
            </Form.Item>
            <Form.Item label={"默认选中"} name={"value"}>
                <Select value={value} options={options?.map(({text, value}) =>
                    ({value, label: text || ""}))}>
                </Select>
            </Form.Item>
        </Form>
    </div>)
}
