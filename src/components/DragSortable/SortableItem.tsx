import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'
import {FC} from "react";

type PropsType = {
    id: string
    children: JSX.Element
}
export const SortableItem:FC<PropsType> = ({id, children}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    )
}
