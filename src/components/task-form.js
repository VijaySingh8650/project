import React from 'react';
import styles from "../styles/task-form.module.css";
const priorityArr = ["Low", "Medium", "High"];

const TaskForm = ({text, handleChange, addTask, handleCheck, checked}) => {

    
  return (
    <>
      <div className={styles.container}>

        <input className={styles.field} type="text" placeholder='Write tasks here...' value={text} onChange={handleChange}/>
        <button className={styles.btn} onClick={()=> text && addTask()}>Add task</button>

      </div>
      <div className={styles.priority}>
        <p>Priority</p>
        {
          priorityArr?.map((el)=>{
            return  <div key={el}>
                <input id={el} key={el} type="checkbox" value={el} checked={checked===el}  onChange={handleCheck}/>
                <label htmlFor={el}>
                  {el}
                </label>
            </div>
          })
        }

      </div>
    </>
  )
}

export default TaskForm;
