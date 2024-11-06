import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import style from "../../styles/TaskView.module.css";
import { useCalendar, monthArray, dayArray } from "../../helpers/useCalendar";

const DayTasks = ({ date }) => {
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
      <div className={style.taskBodyDay}>
        {openHours.map((hour) => (
          <>
            <div className={style.hourLabel} key={hour}>
              {hour}
            </div>
            <div className={style.hourTasks}></div>
          </>
        ))}
      </div>
    </>
  );
};

const WeekTasks = ({ date }) => {
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

  const [week, setWeek] = useState([]);

  useEffect(() => {
    const getWeek = () => {
      const weekArray = [];

      for (let i = date.getDay(); i > 0; i--) {
        weekArray.push(`${date.getDate() - i} ${dayArray[i]}`);
      }

      for (let i = date.getDay(); i <= 6; i++) {
        weekArray.push(
          `${date.getDate() + (i - date.getDay())} ${dayArray[i]}`
        );
      }

      return weekArray;
    };

    setWeek(getWeek());
  }, []);

  return (
    <>
      <div className={style.taskHeaderWeek}>
        <div></div>
        {week.map((date) => (
          <div key={date} className={style.taskWeekDates}>
            {date}
          </div>
        ))}
      </div>
      <div className={style.taskBodyWeek}>
        {openHours.map((hour) => (
          <>
            <div className={style.hourLabel} key={hour}>
              {hour}
            </div>
            <div className={style.hourTasks}></div>
            <div className={style.hourTasks}></div>
            <div className={style.hourTasks}></div>
            <div className={style.hourTasks}></div>
            <div className={style.hourTasks}></div>
            <div className={style.hourTasks}></div>
            <div className={style.hourTasks}></div>
          </>
        ))}
      </div>
    </>
  );
};

const MonthTasks = ({ year, month }) => {
  const [calendar, setCalendar] = useState(useCalendar(year, month));

  return (
    <>
      <div className={style.taskHeaderMonth}>
        <div className={style.weekdayHeader}>Dom</div>
        <div className={style.weekdayHeader}>Lun</div>
        <div className={style.weekdayHeader}>Mar</div>
        <div className={style.weekdayHeader}>Mie</div>
        <div className={style.weekdayHeader}>Jue</div>
        <div className={style.weekdayHeader}>Vie</div>
        <div className={style.weekdayHeader}>Sab</div>
      </div>
      <div className={style.taskBodyMonth}>
        {calendar.map((week, index) => (
          <div key={index} className={style.week}>
            {week.map((day) => (
              <div key={day.number} className={style.dayGrid}>
                <p
                  className={`${style.dayNumber} ${
                    day.inactive && style.inactiveDay
                  }`}
                >
                  {day.number}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

const TaskView = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("day");

  return (
    <>
      <div className={style.taskContainer}>
        <div className={style.taskHeader}>
          <ButtonGroup aria-label="taskViewButtonGroup">
            <Button
              variant={view === "day" ? "primary" : "secondary"}
              className={style.viewButton}
              onClick={() => {
                setView("day");
              }}
            >
              Diario
            </Button>
            <Button
              variant={view === "week" ? "primary" : "secondary"}
              className={style.viewButton}
              onClick={() => {
                setView("week");
              }}
            >
              Semanal
            </Button>
            <Button
              variant={view === "month" ? "primary" : "secondary"}
              className={style.viewButton}
              onClick={() => {
                setView("month");
              }}
            >
              Mensual
            </Button>
          </ButtonGroup>
        </div>
        <div>
          {view === "day" && <DayTasks date={date} />}
          {view === "week" && <WeekTasks date={date} />}
          {view === "month" && (
            <MonthTasks year={date.getFullYear()} month={date.getMonth()} />
          )}
        </div>
      </div>
    </>
  );
};

export default TaskView;
