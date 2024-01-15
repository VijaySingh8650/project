import React, { useState } from "react";
import TaskForm from "./components/task-form";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./components/task-list";
import styles from "./styles/app.module.css";
import { DragDropContext} from "react-beautiful-dnd";

const tasksName = ["Added", "Started", "Completed"];

const App = () => {
  const uniqueId = uuidv4();
  const [text, setText] = useState("");
  const [checked, setChecked] = useState("Low");
  const [addedTasks, setAddedTasks] = useState([]);
  const [startedTasks, setStartedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCheck = (e) => {
    e.target.checked && setChecked(e.target.value);
  };

  const addTask = () => {
    let taskDetails = {
      task: text,
      id: uniqueId,
      date: new Date().toLocaleString(),
      priority: checked,
    };

    setAddedTasks([...addedTasks, taskDetails]);
    setChecked("Low");
    setText("");
  };

  //change indices
  const changeIndexOfItems = (
    currentIndex,
    newIndex,
    currentPlace,
    newPlace
  ) => {
    let currentPlaceArr =
      (currentPlace === "Added" && [...addedTasks]) ||
      (currentPlace === "Started" && [...startedTasks]) ||
      (currentPlace === "Completed" && [...completedTasks]);
    let newPlaceArr =
      (newPlace === "Added" && [...addedTasks]) ||
      (newPlace === "Started" && [...startedTasks]) ||
      (newPlace === "Completed" && [...completedTasks]);
    let removedItem = currentPlaceArr?.splice(currentIndex, 1);
    
    if (newPlace) {
      newPlaceArr.splice(newIndex, 0, removedItem?.[0]);
      (newPlace === "Added" && setAddedTasks([...newPlaceArr])) ||
        (newPlace === "Started" && setStartedTasks([...newPlaceArr])) ||
        (newPlace === "Completed" && setCompletedTasks([...newPlaceArr]));
    } else {
      currentPlaceArr.splice(newIndex, 0, removedItem?.[0]);
    }

    (currentPlace === "Added" && setAddedTasks([...currentPlaceArr])) ||
      (currentPlace === "Started" &&
        setStartedTasks([...currentPlaceArr])) ||
      (currentPlace === "Completed" &&
        setCompletedTasks([...currentPlaceArr]));
  };

  //drag function
  const onDragEnd = (result) => {
   
    if (result?.destination === null) {
      return;
    } else if (
      result?.destination?.droppableId === result?.source?.droppableId
    ) {
      changeIndexOfItems(
        result?.source?.index,
        result?.destination?.index,
        result?.source?.droppableId
      );
    } else if (
      result?.destination?.droppableId !== result?.source?.droppableId
    ) {
      changeIndexOfItems(
        result?.source?.index,
        result?.destination?.index,
        result?.source?.droppableId,
        result?.destination?.droppableId
      );
    }
  };

  return (
    <div>
      {/* Task Form */}
      <TaskForm
        text={text}
        handleChange={handleChange}
        addTask={addTask}
        checked={checked}
        handleCheck={handleCheck}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.containerParent}>
          {tasksName?.map((item) => {
            return (
              <TaskList
                key={item}
                tasks={
                  (item === "Added" && addedTasks) ||
                  (item === "Started" && startedTasks) ||
                  (item === "Completed" && completedTasks)
                }
                name={item}
                onDragEnd={onDragEnd}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
