import {FC} from "react";
import {QuestionInfoDefaultProps, QuestionInfoPropsType} from "./interface";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

export const Component: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
    const {title = "", desc = ""} = {...QuestionInfoDefaultProps,...props};
    const titleList = title.split("\n");
    const descTextList = desc.split("\n");
    return (<div style={{textAlign: "center"}}>
        <Title style={{fontSize: "24px"}}>
            {titleList.map((item, index) => (
                <span key={index}>
                    {index > 0 && <br/>}
                    {item}
                </span>
            ))}
        </Title>
        <Paragraph>
            {descTextList.map((item, index) => {
                return (<span key={index}>
                    {index > 0 && <br/>}
                    {item}
                </span>)
            })}
        </Paragraph>
    </div>)
}
