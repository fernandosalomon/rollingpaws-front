import { useEffect, useState } from "react";
import style from "../styles/Scheduler.module.css";
import { getCalendar, numberToMonth } from "../helpers/DateFunctions";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";

const SchedulerCell = ({ children, label, fadeDate, year, month, day }) => {
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
  const [week, setWeek] = useState(0);
  const [year, setYear] = useState(today.getFullYear());
  const [day, setDay] = useState(today.getDate());
  const [calendar, setCalendar] = useState([]);
  const [view, setView] = useState("monthly");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCalendarData = (month, year) => {
      const data = getCalendar(month, year);
      setIsLoading(false);
      return data;
    };
    setCalendar(getCalendarData(month, year));
  }, [month]);

  return (
    <>
      {!isLoading ? (
        <>
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
                      if (view === "monthly") {
                        if (month - 1 < 0) {
                          setMonth(11);
                          setYear(year - 1);
                        } else {
                          setMonth(month - 1);
                        }
                      }
                      if (view === "weekly") {
                        if (week - 1 < 0) {
                          if (month - 1 < 0) {
                            setYear(year - 1);
                            setMonth(11);
                            setIsLoading(true);
                            setWeek(getCalendar(11, year - 1).length - 1);
                          } else {
                            setMonth(month - 1);
                            setIsLoading(true);
                            setWeek(getCalendar(month - 1, year).length - 1);
                          }
                        } else {
                          setWeek(week - 1);
                        }
                      }
                    }}
                  >
                    &lt;
                  </button>
                  <button
                    className={style.schedulerNavArrows}
                    onClick={() => {
                      if (view === "monthly") {
                        if (month + 1 > 11) {
                          setMonth(0);
                          setIsLoading(true);
                          setYear(year + 1);
                        } else {
                          setMonth(month + 1);
                        }
                      }
                      if (view === "weekly") {
                        if (week + 1 >= calendar.length) {
                          if (month + 1 > 11) {
                            setMonth(0);
                            setIsLoading(true);
                            setYear(year + 1);
                            setWeek(0);
                          } else {
                            setMonth(month + 1);
                            setIsLoading(true);
                            setWeek(0);
                          }
                        } else {
                          setWeek(week + 1);
                        }
                      }
                    }}
                  >
                    &gt;
                  </button>
                </div>
                <p className={style.schedulerNavLabel}>
                  {view === "monthly" && `${numberToMonth[month]} ${year}`}
                  {view === "weekly" &&
                    `${calendar[week][0].number} de ${
                      numberToMonth[
                        calendar[week][0].month === -1
                          ? 11
                          : calendar[week][0].month
                      ]
                    } - ${calendar[week].slice(-1)[0].number} de ${
                      numberToMonth[
                        calendar[week].slice(-1)[0].month === 12
                          ? 0
                          : calendar[week].slice(-1)[0].month
                      ]
                    }`}
                  {view === "daily" && `${day} ${numberToMonth[month]}`}
                </p>
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
                {(view === "monthly" || view === "weekly") && (
                  <>
                    <div className={style.schedulerViewHeaderHorizontal}>
                      <div
                        className={`${
                          view === "monthly"
                            ? style.schedulerViewHeaderCellsMonthly
                            : view === "weekly"
                            ? style.schedulerViewHeaderCellsWeekly
                            : ""
                        }`}
                      >
                        {view === "monthly" && (
                          <>
                            <div className={style.schedulerViewHeaderCell}>
                              Dom
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Lun
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Mar
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Mie
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Jue
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Vie
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Sab
                            </div>
                          </>
                        )}
                        {view === "weekly" && (
                          <>
                            <div
                              className={style.schedulerViewHeaderCell}
                            ></div>
                            <div className={style.schedulerViewHeaderCell}>
                              Dom
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Lun
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Mar
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Mie
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Jue
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Vie
                            </div>
                            <div className={style.schedulerViewHeaderCell}>
                              Sab
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className={style.schedulerViewContent}>
                  {view === "monthly" &&
                    calendar.map((week) => (
                      <div
                        key={week}
                        className={style.schedulerViewCellsContainer}
                      >
                        {week.map((day) => (
                          <SchedulerCell
                            key={day.number}
                            label={day.number}
                            fadeDate={day.inactive}
                            year={year}
                            month={month}
                            day={day.number}
                          />
                        ))}
                      </div>
                    ))}
                  {view === "weekly" && (
                    <div className={style.schedulerViewCellsContainerWeekly}>
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <>
                          <div
                            className={`${style.schedulerViewCellWeekly} ${style.schedulerViewCellWeeklyHour}`}
                          >{`${hour}:00`}</div>
                          {Array.from({ length: 7 }, (_, i) => i + 1).map(
                            (day) => (
                              <SchedulerCell
                                key={new Date(year, month, day, hour)}
                                year={year}
                                month={month}
                                day={day}
                                className={style.schedulerViewCellWeekly}
                              />
                            )
                          )}
                        </>
                      ))}
                    </div>
                  )}
                  {view === "daily" && (
                    <div className={style.schedulerViewCellsContainerDaily}>
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <>
                          <div
                            className={`${style.schedulerViewCellWeekly} ${style.schedulerViewCellWeeklyHour}`}
                          >{`${hour}:00`}</div>

                          <SchedulerCell
                            key={new Date(year, month, day, hour)}
                            year={year}
                            month={month}
                            day={day}
                            className={style.schedulerViewCellWeekly}
                          />
                        </>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={style.spinnerContainer}>
          <Spinner
            animation="border"
            style={{ width: "120px", height: "120px" }}
          />
        </div>
      )}
    </>
  );
};

export default Scheduler;
