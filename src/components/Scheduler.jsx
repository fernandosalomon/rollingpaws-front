import { useEffect, useState } from "react";
import style from "../styles/Scheduler.module.css";
import { getCalendar, numberToMonth } from "../helpers/DateFunctions";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const SchedulerCell = ({ children, label, fadeDate }) => {
  return (
    <div className={style.schedulerViewCell}>
      <div
        className={`${style.schedulerViewCellLabel} ${
          fadeDate && style.schedulerViewCellLabelFaded
        }`}
      >
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
};

const Scheduler = () => {
  const [today, setToday] = useState(new Date());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [calendar, setCalendar] = useState([]);
  const [view, setView] = useState("monthly");

  useEffect(() => {
    setCalendar(getCalendar(month, year));
    console.log(month);
  }, [month]);

  return (
    <div className={style.container}>
      <div className={style.schedulerHeader}>
        <div className="d-flex gap-4 align-items-center py-4">
          <button
            className={style.schedulerNavButton}
            onClick={() => {
              setMonth(today.getMonth());
              setYear(today.getFullYear());
            }}
          >
            Hoy
          </button>
          <div>
            <button
              className={style.schedulerNavArrows}
              onClick={() => {
                if (month - 1 < 0) {
                  setMonth(11);
                  setYear(year - 1);
                } else {
                  setMonth(month - 1);
                }
              }}
            >
              &lt;
            </button>
            <button
              className={style.schedulerNavArrows}
              onClick={() => {
                if (month + 1 > 11) {
                  setMonth(0);
                  setYear(year + 1);
                } else {
                  setMonth(month + 1);
                }
              }}
            >
              &gt;
            </button>
          </div>
          <p
            className={style.schedulerNavLabel}
          >{`${numberToMonth[month]} ${year}`}</p>
        </div>
        <div>
          <ButtonGroup className="h-100 d-flex align-items-center">
            <Button
              className={`${style.schedulerViewButton} ${
                view === "daily" && style.schedulerViewButtonActive
              }`}
              onClick={() => setView("daily")}
            >
              Diario
            </Button>
            <Button
              className={`${style.schedulerViewButton} ${
                view === "weekly" && style.schedulerViewButtonActive
              }`}
              onClick={() => setView("weekly")}
            >
              Semanal
            </Button>
            <Button
              className={`${style.schedulerViewButton} ${
                view === "monthly" && style.schedulerViewButtonActive
              }`}
              onClick={() => setView("monthly")}
            >
              Mensual
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className={style.schedulerViewContainer}>
        <div className={style.schedulerView}>
          <div className={style.schedulerViewHeaderHorizontal}>
            <div className={style.schedulerViewHeaderCells}>
              <div className={style.schedulerViewHeaderCell}>Dom</div>
              <div className={style.schedulerViewHeaderCell}>Lun</div>
              <div className={style.schedulerViewHeaderCell}>Mar</div>
              <div className={style.schedulerViewHeaderCell}>Mie</div>
              <div className={style.schedulerViewHeaderCell}>Jue</div>
              <div className={style.schedulerViewHeaderCell}>Vie</div>
              <div className={style.schedulerViewHeaderCell}>Sab</div>
            </div>
          </div>
          <div className={style.schedulerViewContent}>
            {calendar.map((week) => (
              <div key={week} className={style.schedulerViewCellsContainer}>
                {week.map((day) => (
                  <SchedulerCell
                    key={day.number}
                    label={day.number}
                    fadeDate={day.inactive}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
