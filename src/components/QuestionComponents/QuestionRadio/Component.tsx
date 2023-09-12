import {FC} from "react";
import {Radio, Space} from 'antd';
import {QuestionRadioDefaultProps, QuestionRadioPopsType} from "./interface";
import Paragraph from "antd/es/typography/Paragraph";

export const Component:FC<QuestionRadioPopsType> = (props:QuestionRadioPopsType) => {
    const {title,options = [],value,isVertical} = {...QuestionRadioDefaultProps,...props}
    return (<div>
        <Paragraph strong>{title}</Paragraph>
        <Radio.Group value={value}>
            <Space direction={isVertical ? "vertical" : "horizontal"}>
                {options.map(opt => {
                    const {value, text} = opt;
                    return <Radio key={value} value={value}>{text}</Radio>
                })}
            </Space>
        </Radio.Group>
    </div>)
}
