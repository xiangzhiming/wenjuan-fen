export type OptionType = {
    value: string,
    text: string
}

export type QuestionRadioPopsType = {
    title?: string,
    isVertical?: boolean,
    options?: OptionType[]
    value?: string

    onChange?: (newProps: QuestionRadioPopsType) => void;
    disabled?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPopsType = {
    title: "单选标题",
    isVertical: false,
    options: [
        {value: "item1", text: "选项1"},
        {value: "item2", text: "选项2"},
        {value: "item3", text: "选项3"}
    ],
    value: ""
}
