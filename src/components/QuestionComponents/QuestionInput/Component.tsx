import {FC} from "react";
import {QuestionInputDefaultProps, QuestionInputPropsType} from "./interface";
import Paragraph from "antd/es/typography/Paragraph";
import Input from "antd/es/input/Input";

const Component: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
    const {title, placeholder} = {...QuestionInputDefaultProps, ...props}
    return (
        <div>
            <Paragraph strong>{title}</Paragraph>

            {/*<div>
                <Input placeholder={placeholder}/>
            </div>*/}

            <Input placeholder={placeholder}/>
        </div>
    );
};

export default Component;
