import {FC, useEffect} from "react";
import {QuestionCheckboxDefaultProps, QuestionCheckboxPropsType} from "./interface";
import {Button, Form, Input, Space} from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import {OptionType} from "../QuestionRadio";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {nanoid} from "@reduxjs/toolkit";

export const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
    const {title, isVertical, list = [], disabled, onChange} = {...QuestionCheckboxDefaultProps, ...props};
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({title, isVertical, list, disabled});
    }, [title, isVertical, list, disabled])

    function handleValuesChange() {
        const newValue = form.getFieldsValue() as QuestionCheckboxPropsType;
        if (onChange == null) return;
        if (newValue.list) newValue.list = newValue.list.filter(item => !(item.text === null));
        list.forEach(item => {
            if (item.value) return;
            item.value = nanoid((5))
        })
        onChange(newValue);
    }

    return (<Form form={form} layout={"vertical"} initialValues={{title, isVertical, list}} disabled={disabled}
                  onValuesChange={handleValuesChange}>
        <Form.Item label={"标题"} name={"title"} rules={[{required: true, message: "请输入标题...|"}]}>
            <Input/>
        </Form.Item>
        <Form.Item label={"选项"}>
            <Form.List name="list">
                {(fields, {add, remove}) => (<>
                    {/* 遍历所有的选项（可删除）*/}
                    {fields.map(({name, key}, index) => {
                        return (<Space key={key} align={"baseline"}>
                            {/*当前选项，是否选中*/}
                            <Form.Item name={[name, "checked"]} valuePropName={"checked"}>
                                <Checkbox/>
                            </Form.Item>
                            {/* 当前选项 */}
                            <Form.Item name={[name, "text"]} rules={[
                                {required: true, message: "请输入选项文字"},
                                {
                                    validator: (_, text) => {
                                        const {list = []} = form.getFieldsValue();

                                        let num = 0;
                                        list.forEach((opt: OptionType) => {
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
                            {index > 0 && <MinusCircleOutlined onClick={() => remove(name)}/>}
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
    </Form>)
}
