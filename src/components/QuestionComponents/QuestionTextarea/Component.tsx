import {FC} from "react";
import {QuestionTextareaDefaultProps, QuestionTextareaPropsType} from "./interface";
import Paragraph from "antd/es/typography/Paragraph";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";

/**
 *  用户输入组件
 * @param props   组件属性
 * @constructor
 */
const QuestionTextarea: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
    const {title, placeholder} = {...QuestionTextareaDefaultProps, ...props}
    return (
        <div>
            <Paragraph strong>{title}</Paragraph>
            <TextArea placeholder={placeholder}/>
        </div>
    );
};

export default QuestionTextarea;
