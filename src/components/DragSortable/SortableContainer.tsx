import {closestCenter, DndContext, DragEndEvent, MouseSensor, useSensor, useSensors} from "@dnd-kit/core";
import {FC} from "react";
import {SortableContext,verticalListSortingStrategy} from "@dnd-kit/sortable";


type PropsType = {
    children: JSX.Element | JSX.Element[],
    items: Array<{ id: string, [key: string]: any }>,
    onDragEnd: (oldIndex: number, newIndex: number) => void
}

export const SortableContainer: FC<PropsType> = (props: PropsType) => {
    const {children, items, onDragEnd} = props;
    const sensors = useSensors(
        useSensor(MouseSensor,{
            activationConstraint: {
                distance: 8,   // 鼠标点击之后移动8px表示要移动组件
            }
        })
    )


    function handleDragEnd(event:DragEndEvent) {
        const {active, over} = event;
        if (over == null) return;
        if (active.id != over.id) {
            const oldIndex = items.findIndex(c => c.fe_id === active.id);
            const newIndex = items.findIndex(c => c.fe_id === over.id);
            onDragEnd(oldIndex, newIndex);
        }
    }

    return (<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {children}
        </SortableContext>
    </DndContext>);
}
