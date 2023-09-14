import {FC} from "react";
import {QuestionCheckboxDefaultProps, QuestionCheckboxPropsType} from "./interface";
import Paragraph from "antd/es/typography/Paragraph";
import {Checkbox, Space} from "antd";

export const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
    const {title, isVertical, list = []} = {...QuestionCheckboxDefaultProps, ...props};
    console.log("title", title);
    console.log("isVertical",isVertical);
    console.log("list", list);
    return (<div>
        <Paragraph strong>{title}</Paragraph>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
            {list.map(opt => {
                const {value, text, checked} = opt;
                return <Checkbox key={value} value={value} checked={checked}>{text}</Checkbox>
            })}
        </Space>
    </div>)
}
