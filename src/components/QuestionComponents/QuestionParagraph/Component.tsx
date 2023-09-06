import {FC} from "react";
import {QuestionParagraphDefaultProps, QuestionParagraphPropsType} from "./interface";
import Paragraph from "antd/es/typography/Paragraph";

// 段落组件
export const Component: FC = (props: QuestionParagraphPropsType) => {
    const {text = "", isCenter = false} = {...QuestionParagraphDefaultProps, ...props}

    return (<Paragraph style={{textAlign: isCenter ? "center" : "start",marginBottom: "0"}}>
        {text}
    </Paragraph>)
}
