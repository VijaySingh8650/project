import React from "react";
import TaskItem from "./task-item";
import styles from "../styles/task-list.module.css";
import { Droppable } from "react-beautiful-dnd";

const TaskList = ({ tasks, name }) => {
  return (
    <Droppable droppableId={name}>
      {(provided, snapshot) => {
        return (
          <div
            className={styles.taskContainer}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h1 className={styles.taskHeader}>{name}</h1>
            {tasks?.map((el, index) => (
              <TaskItem task={el} key={el?.id} index={index} />
            ))}

            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default React.memo(TaskList);
