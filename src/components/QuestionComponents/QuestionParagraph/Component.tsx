import {FC} from "react";
import {QuestionParagraphDefaultProps, QuestionParagraphPropsType} from "./interface";
import Paragraph from "antd/es/typography/Paragraph";

/**
 * 段落组件
 * @param props  组件属性
 * @constructor
 */
export const Component: FC = (props: QuestionParagraphPropsType) => {
    const {text = "", isCenter = false} = {...QuestionParagraphDefaultProps, ...props}
    const textArray = text.split('\n');  //  将段落内容根据换行符拆分成数组
    return (<Paragraph style={{textAlign: isCenter ? "center" : "start",marginBottom: "0"}}>
        {textArray.map((item:string,index:number) => (  // 遍历段落内容数组
            <span key={index}>
                {index > 0 && <br/>}  {/*第一个元素不用换行，所以index大于0才添加换行*/}
                {item}
            </span>
        ))}
    </Paragraph>)
}
