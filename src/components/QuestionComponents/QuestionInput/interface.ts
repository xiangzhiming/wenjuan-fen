export type QuestionInputPropsType = {
    title?: string
    placeholder?: string

    onABC?: (newProps: QuestionInputPropsType) => void
}


export const QuestionInputDefaultProps: QuestionInputPropsType = {
    title: "输入框标題",
    placeholder: "请输入..."
}
