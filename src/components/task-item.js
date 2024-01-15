import React from 'react';
import styles from "../styles/task-item.module.css";
import {Draggable } from "react-beautiful-dnd";

const TaskItem = ({task, index}) => {
  return (
    <Draggable draggableId={task?.id} index={index}>
        {
            (provided) => (

                    <div
                      className={styles.textDiv}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                    &bull; {task?.task}  
                    <p>{`- ${task?.priority}`}</p>
                    </div>
            )
        }


    </Draggable>
  )
}

export default TaskItem
