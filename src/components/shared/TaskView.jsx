import { useState } from "react";
import style from "../../styles/TaskView.module.css";

const TaskView = () => {
  const [date, setDate] = useState(new Date());

  const openHours = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  return (
    <>
      <div className={style.taskContainer}>
        <div className={style.taskHeader}>
          <div></div>
          <div>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</div>
        </div>
        <div className={style.taskBody}>
          {openHours.map((hour) => (
            <>
              <div className={style.hourLabel} key={hour}>
                {hour}
              </div>
              <div className={style.hourTasks}></div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskView;
