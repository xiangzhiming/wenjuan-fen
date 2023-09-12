import {FC, useEffect} from "react";
import {OptionType, QuestionRadioPopsType} from "./interface";
import {Select, Form, Input, Space, Button} from 'antd';
import Checkbox from "antd/es/checkbox/Checkbox";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

export const PropComponent: FC<QuestionRadioPopsType> = (props: QuestionRadioPopsType) => {
    const {title, isVertical, value, options, onChange, disabled} = props;
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
            <Form.Item label={"选项"}>
                <Form.List name={"options"}>
                    {(fields, {add, remove}) => (<>
                        {/* 遍历所有的选项（可删除）*/}
                        {fields.map(({name, key}, index) => {
                            return (<Space key={key} align={"baseline"}>
                                {/* 当前选项 */}
                                <Form.Item name={[name, "text"]} rules={[
                                    {required: true, message: "请输入选项文字"},
                                    {
                                        validator: (_,text) => {
                                            const {options = []} = form.getFieldsValue();

                                            let num = 0;
                                            options.forEach( (opt: OptionType)  => {
                                                if (opt.text === text) num++;  // 记录text相同的个数，预期只有1个，自己
                                            })
                                            if (num === 1) return Promise.resolve();
                                            return Promise.reject(new Error("和其他选项重复了"));
                                        }
                                    }
                                ]}>
                                    <Input placeholder={"输入选项文字..."}/>
                                </Form.Item>
                                {/*当前选项删除按钮*/}
                                {index > 1 && <MinusCircleOutlined onClick={() => remove(name)}/>}
                            </Space>)
                        })}
                        {/*添加选项按钮*/}
                        <Form.Item>
                            <Button type={"link"} onClick={() => add({text: "", value: ""})}
                            icon={<PlusOutlined/>} block>
                                添加选项
                            </Button>
                        </Form.Item>
                    </>)}
                </Form.List>
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
