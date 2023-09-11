export type QuestionTextareaPropsType = {
    title?: string
    placeholder?: string

    onChange?: (newProps: QuestionTextareaPropsType) => void
    disabled?: boolean
}


export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
    title: "输入框标題",
    placeholder: "请输入..."
}
